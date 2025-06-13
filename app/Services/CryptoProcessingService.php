<?php

namespace App\Services;

use App\Models\Deposit;
use App\Models\Payment_log;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class CryptoProcessingService
{
    public function __construct(PaymentLogsService $paymentLogsService)
    {
        $this->paymentLogsService = $paymentLogsService;
    }
//    public function callAlphaPoApi(array $params, string $endpoint)
//    {
//        // Подготавливаем тело запроса
//        $body = json_encode($params);
//
//        // Генерируем подпись
//        $signature = hash_hmac('sha512', $body, env('CRYPTOPROCESSING_SECRET_KEY'));
//
//        // Отправляем POST-запрос
//        $response = Http::withHeaders([
//            'X-Processing-Key' => env('CRYPTOPROCESSING_PUBLIC_KEY'),
//            'X-Processing-Signature' => $signature,
//            'Content-Type' => 'application/json',
//        ])->post($endpoint, $params);
//
//        // Обрабатываем ответ
//        if ($response->successful()) {
//            return $response->json();
//        } else {
//            return $response->json([
//                'status' => 'false',
//                'message' => "AlphaPo API error: " . $response->body(),
//            ], 500);
////            throw new \Exception("AlphaPo API error: " . $response->body());
//        }
//    }

    public function callAlphaPoApi(array $params, string $endpoint)
    {
        // Подготавливаем тело запроса
        $body = json_encode($params);

        // Генерируем подпись
        $signature = hash_hmac('sha512', $body, env('CRYPTOPROCESSING_SECRET_KEY'));

        // Отправляем POST-запрос
        $response = Http::withHeaders([
            'X-Processing-Key' => env('CRYPTOPROCESSING_PUBLIC_KEY'),
            'X-Processing-Signature' => $signature,
            'Content-Type' => 'application/json',
        ])->post($endpoint, $params);

        // Возвращаем структурированный результат
        if ($response->successful()) {
            return [
                'success' => true,
                'code' => $response->status(),
                'data' => $response->json(),
            ];
        } else {
            return [
                'success' => false,
                'code' => $response->status(),
                'message' => "AlphaPo API error: " . $response->body(),
            ];
        }
    }



    public function currencyList()
    {
        $url = 'https://app.sandbox.cryptoprocessing.com/api/v2/currencies/list';

        $params = ['visible' => true ];

        return $this->callAlphaPoApi($params,$url);
    }


    public function pare()
    {
        $url = 'https://app.sandbox.cryptoprocessing.com/api/v2/currencies/pairs';

        $params = [];

        return $this->callAlphaPoApi($params,$url);
    }


    public function createInvoice($sender_currency,$sum)
    {
        $url = 'https://app.sandbox.cryptoprocessing.com/api/v2/invoices/create';

        $user = Auth::user();

        $params = [
            'timer' => true,
            'title'=>'Deposit to Wrangle.win',
            'currency' =>$sender_currency,
            'sender_currency' => $sender_currency,
            'amount' => str($sum),
            'foreign_id' => str($user->id),
            'url_success' => 'https://wrangle.win/1',
            'url_failed' => 'https://wrangle.win/2',
            'email_user' => str($user->email),
        ];

        return $this->callAlphaPoApi($params, $url);
    }


    public function createDeposit(Deposit $deposit, $currency)
    {
        $url = 'https://app.sandbox.cryptoprocessing.com/api/v2/addresses/take';

        $user = Auth::user();

        if ($user->cryptoWallets()->where('currency',$currency)->exists())
        {
            $wallets = $user->cryptoWallets()->where('currency',$currency)->get();
        }
        else
        {
            $params = [
                'foreign_id' => str($user->id),
                'currency' =>$currency,
                'convert_to' => 'EUR',
            ];

            $response = $this->callAlphaPoApi($params, $url);

            $this->paymentLogsService->createLog($deposit, json_encode($response));

            if (!is_array($response) || !array_key_exists('data', $response) || is_null($response['data'])) {
                throw new \Exception('Ошибка получения данных из AlphaPo API');
            }

            $wallets = $this->saveWallets($response['data']['data'], $user);
        }

        return $wallets;
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
        return collect([$wallet]);
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
            'currency' => env('CURRENT_CURRENCY'),
            'convert_to' => $currency,
            'address' => $address,
            'tag' => $tag,
//            'amount_to' => ,
        ];

        return $this->callAlphaPoApi($params, $url);
    }
}
