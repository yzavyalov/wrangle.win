<?php

namespace App\Services\Payment;

use App\Contracts\PaymentDepositInterface;
use App\Http\Resources\WintecaPayInResource;
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
        $response = $this->outsidePaymentService->wintecaService->createWintecaPaymentInvoice($data['currency'],$data['amount'],$data['reference_id']);

        return [
            'hpp_url' => $response['data']['attributes']['hpp_url'] ?? null,
            'deposit' => $response['data']['attributes']['deposit'] ?? null,
            'fee' => $response['data']['attributes']['fee'] ?? null,
            'status' => $response['data']['attributes']['status'] ?? null,
        ];
    }
}
