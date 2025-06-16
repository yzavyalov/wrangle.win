<?php

namespace App\Services\Payment\Acquiring;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class WintecaService
{

    public function __construct()
    {
        $this->baseUrl = config('services.winteca.base_url');
        $this->publicKey = config('services.winteca.public_key');
        $this->authorization = 'Basic ' . base64_encode(
                config('services.winteca.api_key') . ':' . config('services.winteca.api_secret')
            );
    }
    public function callWintecaApi(array $params, string $endpoint)
    {
        $base_url = 'api.winteca.com';

        $public_Key = env('WINTECA_PUBLIC_KEY');

        $url = $base_url.$endpoint;

        $body = json_encode($params);

        // Генерируем подпись
        $signature = hash_hmac('sha512', $body, env('CRYPTOPROCESSING_SECRET_KEY'));

        // Отправляем POST-запрос
        $response = Http::withHeaders([
            'X-Processing-Key' => env('CRYPTOPROCESSING_PUBLIC_KEY'),
            'X-Processing-Signature' => $signature,
            'Content-Type' => 'application/json',
        ])->post($endpoint, $params);
    }


    public function generateHppUrl(string $currency, float $amount, string $description): string
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

        return response()->json(['payment_url' => $url]);
    }
}
