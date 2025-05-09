<?php

namespace App\Services;

class OutsidePaymentService
{
    public function __construct(CryptoProcessingService $cryptoProcessingService)
    {
        $this->cryptoProcessingService = $cryptoProcessingService;
    }
}
