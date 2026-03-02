<?php

namespace App\Services;

use App\Models\Deposit;
use App\Models\Payment_log;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class CryptoProcessingService
{
    public $base_currency;
    public function __construct(PaymentLogsService $paymentLogsService)
    {
        $this->paymentLogsService = $paymentLogsService;

        $this->base_currency = env('CURRENT_CURRENCY');
    }

    public function createDeposit(Deposit $deposit, $currency)
    {
        try {
            $url = 'https://app.sandbox.cryptoprocessing.com/api/v2/addresses/take';

            $user = Auth::user();

            if ($user->cryptoWallets()->where('currency', $currency)->exists())
            {
                $wallets = $user->cryptoWallets()->where('currency', $currency)->first();
            }
            else
            {
                $params = [
                    'foreign_id' => str($user->id),
                    'currency' => $currency,
                    'convert_to' => 'EUR',
                ];

                $response = $this->callAlphaPoApi($params, $url);

                $this->paymentLogsService->createLog($deposit, json_encode($response));

                if (!is_array($response) || !array_key_exists('data', $response) || is_null($response['data'])) {
                    return ['error' => 'Ошибка получения данных из AlphaPo API'];
                }

                $wallets = $this->saveWallets($response['data']['data'], $user);
            }

            return ['data' => $wallets];
        } catch (\Throwable $e) {
            return ['error' => $e->getMessage()];
        }
    }


    public function checkUserDepositAddress($paymentId, $currency)
    {
        $user = Auth::user();

        $oldWallet = $user->cryptoWallets()
            ->where([
                'payment_methods_id' => $paymentId,
                'currency'   => $currency,
            ])
            ->where('created_at', '>=', now()->subMonths(3))
            ->first();

        return $oldWallet->address ?? null;
    }

    public function newAdres($currency)
    {
        $url = 'https://app.sandbox.cryptoprocessing.com/api/v2/addresses/take';

        $user = Auth::user();

        $params = [
            'foreign_id' => str($user->id),
            'currency' =>$currency,
            'convert_to' => 'EUR',
        ];

        $response = $this->callAlphaPoApi($params, $url);

        if (!is_array($response) || !array_key_exists('data', $response) || is_null($response['data'])) {
            throw new \Exception('Ошибка получения данных из AlphaPo API');
        }


        if ($user->cryptoWallets()->where('currency',$currency)->exists())
        {
            $wallet = $user->cryptoWallets()->updateOrCreate(
                ['currency' => $currency],
                $response['data']
            );
        }

        return $wallet;
    }


    protected function saveWallets(array $data, User $user)
    {
        $wallet = $user->cryptoWallets()->create($data);
        return $wallet;
    }


    public function rates($currencyFrom = null, $currencyTo = null)
    {
        $url = 'https://app.sandbox.cryptoprocessing.com/api/v2/currencies/rates';

        $params = [
            'currency_from' => $currencyFrom,
            'currency_to' =>$currencyTo,
        ];

        return $this->callAlphaPoApi($params, $url);
    }

    public function payOut($amount,$currency,$address,$tag=null)
    {
        $url = 'https://app.sandbox.cryptoprocessing.com/api/v2/withdrawal/crypto';

        $params = [
            'foreign_id' =>  Auth::id(),
            'amount' => $amount,
            'currency' => $this->base_currency,
            'convert_to' => $currency,
            'address' => $address,
            'tag' => $tag,
//            'amount_to' => ,
        ];

        return $this->callAlphaPoApi($params, $url);
    }
}
