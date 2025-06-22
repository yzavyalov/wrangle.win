<?php

namespace App\Services\Payment\Acquiring;

use Illuminate\Support\Facades\Http;

class WintecaExcahngeService
{
    protected string $baseCurrency;

    protected string $baseUrl;
    protected string $authorization;
    protected string $authorization_www_pay_out;

    public function __construct()
    {
        $this->baseCurrency = env('CURRENT_CURRENCY');

        $this->baseUrl = config('services.winteca.base_url');

        $this->authorization = 'Basic ' . base64_encode(
                config('services.winteca.api_account') . ':' . config('services.winteca.api_key')
            );

        $this->authorization_www_pay_out = 'Basic ' . base64_encode(
                config('services.winteca.api_account_www_pay_out') . ':' . config('services.winteca.api_key_www_pay_out')
            );
    }
    public function exchangePayIn($sum)
    {
        $paymentCurrency = 'USD';

        $endpoint = '/payment-exchange-rates/'.$this->baseCurrency.'/'.$paymentCurrency;

        $url = $this->baseUrl.$endpoint;

        $response = Http::withHeaders(['Accept' => '*/*',
            'Authorization' => $this->authorization,
            'Content-Type' => 'application/json'])->get($url)->json();

        $rate = $response['data'][$this->baseCurrency][$paymentCurrency];

        return $sum*$rate;
    }

    public function exchangePayOut($sum)
    {
        $paymentCurrency = 'EUR';

        $endpoint = '/payout-exchange-rates/'.$this->baseCurrency.'/'.$paymentCurrency;

        $url = $this->baseUrl.$endpoint;

        $response = Http::withHeaders(['Accept' => '*/*',
            'Authorization' => $this->authorization_www_pay_out,
            'Content-Type' => 'application/json'])->get($url)->json();

        if(!empty($response['data']))
        {
            $rate = $response['data'][$this->baseCurrency][$paymentCurrency];

            return $sum*$rate;
        }
        else
        {
            return $sum;
        }

    }
}
