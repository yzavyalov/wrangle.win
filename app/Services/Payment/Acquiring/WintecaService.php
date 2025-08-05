<?php

namespace App\Services\Payment\Acquiring;

use App\Models\Payment;
use App\Services\PaymentAmountService;
use App\Services\PaymentLogsService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WintecaService
{
    protected string $myUrl;
    protected string $baseUrl;
    protected string $publicKey;
    protected string $privatKey;
    protected string $authorization;

    protected string $authorization_www_pay_out;
    protected string $publicKey_www_pay_out;
    protected string $privatKey_www_pay_out;


    public function __construct(PaymentLogsService $paymentLogsService)
    {
        $this->paymentLogsService = $paymentLogsService;

        $this->baseUrl = config('services.winteca.base_url');

        $this->privatKey = config('services.winteca.privat_key');

        $this->publicKey = config('services.winteca.public_key');

        $this->authorization = 'Basic ' . base64_encode(
                config('services.winteca.api_account') . ':' . config('services.winteca.api_key')
            );

        $this->privatKey_www_pay_out = config('services.winteca.privat_key_www_pay_out');

        $this->publicKey_www_pay_out = config('services.winteca.public_key_www_pay_out');

        $this->authorization_www_pay_out = 'Basic ' . base64_encode(
                config('services.winteca.api_account_www_pay_out') . ':' . config('services.winteca.api_key_www_pay_out')
            );

        $this->myUrl = env('APP_URL');
    }



    public function callWintecaApiPrivatPost(array $params, string $endpoint)
    {
        try {
            $url = "{$this->baseUrl}/{$endpoint}";

            $payload = [
                'data' => [
                    'type' => 'payment-invoice',
                    'attributes' => $params,
                ],
            ];

            $response = Http::withHeaders([
                'Accept' => '*/*',
                'Authorization' => $this->authorization,
                'Content-Type' => 'application/json',
            ])->post($url, $payload);

            // Проверка на HTTP-ошибку
            if (!$response->successful()) {
                return false;
            }

            $json = $response->json();

            // Проверка на наличие ошибки в теле (например, {"errors": [...]})
            if (isset($json['errors'])) {
                return false;
            }

            return $json;
        } catch (\Throwable $e) {
            // Логируем ошибку при необходимости
             Log::error("Winteca API error: " . $e->getMessage());
            return false;
        }
    }



    public function createWintecaPaymentInvoice($amount,$currency,$reference_id)
    {
        $endpoint = 'payment-invoices';

        $user = Auth::user();

        $params = [
            'reference_id' => (string)$reference_id,
            'service' => 'payment_card_usd_hpp',
            'currency' => $currency,
            'amount' => number_format((float)$amount, 2, '.', ''),
            'test_mode' => true,
            'customer' => [
                'reference_id' => (string)$user->id,
                'email' => $user->email,
                'metadata' => ['key' => WintecaTokenService::createToken()],
            ],
            'return_url' => $this->myUrl.'/api/profile',
            'return_urls' => [
                'success' => $this->myUrl.'/api/winteca/payin/success',
                'fail' => $this->myUrl.'/api/winteca/payin/fail',
                'pending' => $this->myUrl.'/api/winteca/payin/pending',
            ],
            'callback_url' => $this->myUrl.'/api/winteca/callback',
        ];
dd($params);
        $response = $this->callWintecaApiPrivatPost($params,$endpoint);

        return $response;
    }


    protected function callWintecaApiPrivatPostPayOut(array $params, string $endpoint)
    {
        try {
            $url = "{$this->baseUrl}/{$endpoint}";

            $payload = [
                'data' => [
                    'type' => 'payout-invoice',
                    'attributes' => $params,
                ],
            ];

            $response = Http::withHeaders([
                'Accept' => '*/*',
                'Authorization' => $this->authorization_www_pay_out,
                'Content-Type' => 'application/json',
            ])->post($url, $payload);

            // Проверка на HTTP-ошибку
            if (!$response->successful()) {
                return [
                    'error' => "HTTP error {$response->status()}: " . $response->body()
                ];
            }

            $json = $response->json();

            // Проверка на ошибки в теле ответа
            if (isset($json['errors'])) {
                return [
                    'error' => json_encode($json['errors'], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT)
                ];
            }

            return [
                'response' => $json
            ];
        } catch (\Throwable $e) {
            Log::error("Winteca API exception: " . $e->getMessage());

            return [
                'error' => "Exception: " . $e->getMessage()
            ];
        }
    }


    public function CreatePayOutInvoice($payout,$amount,$currency,$cardNumber)
    {
        $endpoint = 'payout-invoices';

        $params = [
            'reference_id' => (string)$payout->id,
            'service' => 'payment_card_eur',
            'currency' => 'EUR',
            'amount' => $amount,
            'callback_url' => $this->myUrl.'/winteca/callback',
            'description' => 'Withdrawal from the balance of the Wrangle.win service',
            'test_mode' => true,
            'fields' => [
                'card_number' => (string)$cardNumber,
            ]
        ];

        return $this->callWintecaApiPrivatPostPayOut($params,$endpoint);
    }


}
