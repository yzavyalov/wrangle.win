<?php

namespace App\Services\Payment;

use App\Contracts\PaymentDepositInterface;
use App\Models\Payment;
use App\Services\OutsidePaymentService;

class AcquiringHandler implements PaymentDepositInterface
{
    public function __construct(OutsidePaymentService $outsidePaymentService)
    {
        $this->outsidePaymentService=$outsidePaymentService;
    }

    public function handle(Payment $payment, array $data): mixed
    {
        $url = $this->outsidePaymentService->wintecaService->paymentInvoice($data['currency'],$data['amount']);

        return $url;
    }
}
