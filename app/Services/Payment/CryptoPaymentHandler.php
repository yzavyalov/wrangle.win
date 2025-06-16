<?php

namespace App\Services\Payment;

use App\Contracts\PaymentDepositInterface;
use App\Http\Resources\AlphaPoResource;
use App\Models\Payment;
use App\Services\OutsidePaymentService;

class CryptoPaymentHandler implements PaymentDepositInterface
{
    public function __construct(OutsidePaymentService $outsidePaymentService)
    {
        $this->outsidePaymentService = $outsidePaymentService;
    }
    public function handle(Payment $payment, array $data): mixed
    {
        $wallets = $this->outsidePaymentService->createAlphaPoDeposit($data['amount'],$data['currency'], $payment->id);

        return AlphaPoResource::collection($wallets);
    }
}
