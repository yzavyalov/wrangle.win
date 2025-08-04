<?php

namespace App\Services\Payment\Crypto;

use App\Services\Payment\AlphaPoService;

class AlphaPoExcechangeService
{
    public function __construct(AlphaPoService $alphaPoService)
    {
        $this->baseCurrency = env('CURRENT_CURRENCY');

        $this->alphaPoService = $alphaPoService;
    }

    public function exchangeCrypto($amount, $currency)
    {
        $exchange = $this->alphaPoService->exchange($currency,$this->baseCurrency,$amount);
dd($exchange);
        return $exchange;
    }

}
