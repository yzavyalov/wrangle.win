<?php

namespace App\Services;

class OutsidePaymentService
{
    public function __construct(CryptoProcessingService $cryptoProcessingService, DepositService $depositService)
    {
        $this->cryptoProcessingService = $cryptoProcessingService;

        $this->depositService = $depositService;
    }


    public function createAlphaPoDeposit($amount,$currency)
    {
        $deposit = $this->depositService->createDeposit($amount, $currency);

        return $this->cryptoProcessingService->createDeposit($deposit,$currency);
    }
}
