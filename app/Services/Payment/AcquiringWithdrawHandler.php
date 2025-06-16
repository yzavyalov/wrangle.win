<?php

namespace App\Services\Payment;

use App\Contracts\PayoutInterface;
use App\Models\Payment;
use App\Services\OutsidePaymentService;

class AcquiringWithdrawHandler implements PayoutInterface
{
    public function __construct(OutsidePaymentService $outsidePaymentService)
    {
        $this->outsidePaymentService=$outsidePaymentService;
    }
    public function handle(Payment $payment, array $data): mixed
    {
        $payout = $this->outsidePaymentService->payoutCreate($payment,$data);
    }
}
