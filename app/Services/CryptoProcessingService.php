<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class CryptoProcessingService
{
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

        // Обрабатываем ответ
        if ($response->successful()) {
            return $response->json();
        } else {
            throw new \Exception("AlphaPo API error: " . $response->body());
        }
    }





    public function deposit()
    {
        $params = [
            'currency' => 'BTC',
            'foreign_id' => '123456',
        ];


        $publicKey = 'your_public_key_here';
        $secretKey = 'your_secret_key_here';
        $endpoint = 'https://api.alphapo.com/v1/your-endpoint';

        try {
            $result = $this->callAlphaPoApi($params, $publicKey, $secretKey, $endpoint);
            dd($result);
        } catch (\Exception $e) {
            dd($e->getMessage());
        }
    }

    public function currencyList()
    {
        $url = 'https://app.sandbox.cryptoprocessing.com/api/v2/currencies/list';

        $params = ['visible' => true ];

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
}
