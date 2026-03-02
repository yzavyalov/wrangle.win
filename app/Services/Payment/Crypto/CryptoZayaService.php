<?php

namespace App\Services\Payment\Crypto;

use App\Services\CryptoProcessingService;
use App\Services\PaymentLogsService;
use App\Services\TransactionService;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

class CryptoZayaService
{
    public function __construct(TransactionService $transactionService,
                                PaymentLogsService $paymentLogsService,
                                CryptoProcessingService $cryptoProcessingService,)
    {
        $this->transactionService = $transactionService;

        $this->paymentLogsService = $paymentLogsService;

        $this->cryptoProcessingService = $cryptoProcessingService;

        $this->base_url = config('cryptozaya.cryptozaya_url');

        $this->api_key = config('cryptozaya.cryptozaya_api_key');
    }


    public function createCryptoZayaDeposit($amount,$currency, $transaction_id, $user_id)
    {
        $endpoint = '/api/deposit';

        $currency = $this->checkCurrency($currency);

        $response = $this->postRequest($endpoint,['amount'=>$amount,'currency'=>$currency,'user_id'=> (string)$user_id,'transaction_id'=> (string)$transaction_id]);

        return $response;
    }


    public function createCryptoZayaWithdraw()
    {
        dd('CryptoZaya');
    }



    protected function postRequest(string $endpoint, array $data): ?array
    {
        $url = rtrim($this->base_url, '/') . '/' . ltrim($endpoint, '/');

        try {
            $response = Http::withToken($this->api_key)
                ->acceptJson()
                ->asJson()
                ->timeout(15)
                ->post($url, $data);

            // 4xx/5xx -> исключение
            $response->throw();

            // Если сервер вернул не JSON — json() даст null
            $body = $response->json();

            if (!is_array($body)) {
                Log::warning('CryptoZaya: response is not JSON array', [
                    'url'         => $url,
                    'payload'     => $data,
                    'status'      => $response->status(),
                    'contentType' => $response->header('Content-Type'),
                    'raw_body'    => $response->body(),
                ]);

                return null;
            }

            return $body;

        } catch (RequestException $e) {
            // Это 4xx/5xx
            Log::error('CryptoZaya HTTP error', [
                'url'       => $url,
                'payload'   => $data,
                'status'    => $e->response?->status(),
                'resp_body' => $e->response?->body(),
            ]);

            return null;

        } catch (\Throwable $e) {
            Log::error('CryptoZaya unexpected error', [
                'url'     => $url,
                'payload' => $data,
                'message' => $e->getMessage(),
                'trace'   => $e->getTraceAsString(),
            ]);

            return null;
        }
    }


    protected function getRequest(string $endpoint, array $data = []): ?array
    {
        $url = rtrim($this->base_url, '/') . '/' . ltrim($endpoint, '/');

        try {
            $response = Http::withToken($this->api_key)
                ->acceptJson()
                ->timeout(15)
                ->get($url, $data)
                ->throw(); // 4xx/5xx -> исключение

            $body = $response->json();

            Log::info('CryptoZaya GET response', [
                'url'    => $url,
                'query'  => $data,
                'status' => $response->status(),
                'body'   => $body,
            ]);

            return is_array($body) ? $body : null;

        } catch (RequestException $e) {
            Log::error('CryptoZaya GET HTTP error', [
                'url'       => $url,
                'query'     => $data,
                'status'    => $e->response?->status(),
                'resp_body' => $e->response?->body(),
            ]);

            return null;

        } catch (\Throwable $e) {
            Log::error('CryptoZaya GET unexpected error', [
                'url'     => $url,
                'query'   => $data,
                'message' => $e->getMessage(),
            ]);

            return null;
        }
    }


    protected function checkCurrency($currency)
    {
        switch ($currency) {
            case 'USDTT'; return 'USDT (trc20)';
            case 'USDCT'; return 'USDC (trc20)';
            case 'TRX'; return 'TRX';
            default: return $currency;
        }
    }


    public function exchangeAmout($amount, $currency)
    {
        $endpoint = '/api/exchange-rate';

        $data = ['from' => env('CURRENT_CURRENCY'), 'to' => $this->checkCurrency($currency)];

        $rateRaw = $this->postRequest($endpoint, $data);
Log::info(trim($rateRaw->body()));
        if ($rateRaw === null || !is_numeric($rateRaw)) {
            $rate = 1.0;
        } else {
            $rate = (float)$rateRaw;
        }

        return $rate * (float)$amount;
    }
}
