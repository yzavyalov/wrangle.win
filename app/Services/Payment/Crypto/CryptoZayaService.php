<?php

namespace App\Services\Payment\Crypto;
use App\Models\Deposit;
use App\Services\CryptoProcessingService;
use App\Services\DepositService;
use App\Services\Payment\GetPaymentDataService;
use App\Services\PaymentLogsService;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class CryptoZayaService
{
    public function __construct(
                                PaymentLogsService $paymentLogsService,
                                CryptoProcessingService $cryptoProcessingService,
                                DepositService $depositService,
                                CryptoZayaDepositWithoutRequestService $cryptoZayaDepositWithoutRequestService,
                                )
    {
        $this->paymentLogsService = $paymentLogsService;

        $this->cryptoProcessingService = $cryptoProcessingService;

        $this->depositService = $depositService;

        $this->cryptoZayaDepositWithoutRequestService = $cryptoZayaDepositWithoutRequestService;

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


    public function createCryptoZayaWithdraw($address,$amount,$currency, $currencyTo,$transaction_id, $user)
    {
        $endpoint = '/api/withdraw';

        $data = [
            'address' => $address,
            'amount' => $amount,
            'currency' => $currency,
            'currency_to' => $currencyTo,
            'user_id' => $user->id,
            'transaction_id' => (string) $transaction_id
        ];

        return $this->postRequest($endpoint,$data);
    }



    protected function postRequest(string $endpoint, array $data)
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

            return $response->json();

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

        if ($rateRaw === null || !is_numeric($rateRaw)) {
            $rate = 1.0;
        } else {
            $rate = (float)$rateRaw;
        }

        return $rate * (float)$amount;
    }

    public function exchangeBackAmount($amount, $currency)
    {
        $endpoint = '/api/exchange-rate';

        $data = ['from' =>  config('cryptozaya.base_currency'), 'to' => $this->checkCurrency($currency)];

        $rateRaw = $this->postRequest($endpoint, $data);

        if ($rateRaw === null || !is_numeric($rateRaw)) {
            $rate = 1.0;
        } else {
            $rate = (float)$rateRaw;
        }

        return $rate * (float)$amount;
    }


    public function takeCallback($callback)
    {
        Log::info('CryptoZaya takeCallback', ['callback' => $callback]);
        $merchantTransactionId = $callback['merchant_system_transaction_id'] ?? null;
        $status = $callback['status'];
        $statusID = $callback['status_id'];
        $amount = $callback['amount'];
        $currency = $callback['currency'];
        $userId = $callback['merchant_system_user_id'] ?? null;
        $transactionType = $callback['type'];
        $transactionTypeId = $callback['type_id'];
        $address = $callback['wallet_to'];

        if ($transactionTypeId === 1)
        {
            if ($merchantTransactionId && $statusID === 2)
            {
                $depositDB = Deposit::query()->where('id',$merchantTransactionId)->first();

                if ( $depositDB)
                {
                    $dbAmount = number_format((float)$depositDB->last_amount, 8, '.', '');
                }
                else
                {
                    $dbAmount = 0;
                }

                $cbAmount = number_format((float)$amount, 8, '.', '');

                if ($depositDB && $dbAmount === $cbAmount && $depositDB->status !== $statusID)
                {
                    Log::info('CryptoZaya takeCallback', ['amount' => $amount]);
                    $this->depositService->changeStatus($depositDB, $statusID);

                    return 1;
                }
                else
                {
                    Log::error('CryptoZaya takeCallback null1');
                    return null;
                }
            }
            elseif ($statusID === 4)
            {
                $amountInBaseCurrency = $this->exchangeBackAmount($amount,$currency);

                $payments = GetPaymentDataService::getPaymentMethodFromCurrency($currency);

                $deposit = $this->cryptoZayaDepositWithoutRequestService
                    ->createCryptoZayaDepositWithoutRequest($address,$amountInBaseCurrency,$payments['payment']->id,$payments['paymentMethod']->id);

                $deposit->last_amount = $amount;

                $deposit->save();

                return 1;
            }
            else
            {
                return null;
            }

        }
        else
        {
            return null;
        }


    }
}
