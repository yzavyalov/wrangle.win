<?php

namespace App\Services\Payment\Acquiring;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use function PHPUnit\Framework\stringContains;

class WintecaService
{
    protected string $myUrl;
    protected string $baseUrl;
    protected string $publicKey;
    protected string $privatKey;
    protected string $authorization;

    public function __construct()
    {
        $this->baseUrl = config('services.winteca.base_url');

        $this->privatKey = config('services.winteca.privat_key');

        $this->publicKey = config('services.winteca.public_key');

        $this->authorization = 'Basic ' . base64_encode(
                config('services.winteca.api_account') . ':' . config('services.winteca.api_key')
            );

        $this->myUrl = env('APP_URL');
    }

    protected function callWintecaApiPrivatPost(array $params, string $endpoint)
    {
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
        ])->post($url, $payload); // Laravel сам преобразует $params в JSON

        if (!$response->successful()) {
            throw new \Exception("Winteca API error: " . $response->body());
        }

        return $response->json(); // Возвращаем результат как массив
    }


    protected function callWintecaApiPrivat(array $params, string $endpoint)
    {
        $url = "{$this->baseUrl}/hpp/{$endpoint}";

        $response = Http::withHeaders([
            'Accept' => '*/*',
            'Authorization' => $this->authorization,
            'Content-Type' => 'application/json',
        ])->post($url, $params);

        if (!$response->successful()) {
            throw new \Exception("Winteca API error: " . $response->body());
        }

        return $response->json();
    }


    public function generateHppUrl(float $amount, string $currency, string $description): string
    {
        $user = Auth::user();

        $params = http_build_query([
            'public_key' => $this->publicKey,
            'currency' => $currency,
            'amount' => $amount,
            'description' => $description ?? null,
            'customer[reference_id]' => $user->id,
            'customer[email]' => $user->email ?? null,
        ]);

        $url = "{$this->baseUrl}/hpp/?{$params}";

        return $url;
    }

    public function wintecaPayoutPrerequest($currency, $amount)
    {
//        $endpoint = 'payout-prerequest';
        $endpoint = 'payout';

        $params = [];

        $params['currency'] = $currency;

        $params['amount'] = $amount;

        return $this->callWintecaApi($params,$endpoint);
    }


    public function createWintecaPaymentInvoice($currency, $amount, $reference_id, $description = null)
    {
        $endpoint = 'payment-invoices';

        $user = Auth::user();

        $params = [
            'reference_id' => (string)$reference_id,
            'service' => 'payment_card_usd_hpp',
            'currency' => $currency,
            'amount' => $amount,
            'test_mode' => true,
            'customer' => [
                'reference_id' => (string)$user->id,
                'email' => $user->email,
            ],
            'return_url' => $this->myUrl,
            'callback_url' => $this->myUrl.'/winteca/callback',
        ];

        $response = $this->callWintecaApiPrivatPost($params,$endpoint);

        return $response;
    }


}
