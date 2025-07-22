<?php

namespace App\Services\Payment;

use App\Contracts\PaymentDepositInterface;
use App\Http\Resources\WintecaPayInResource;
use App\Models\Payment;
use App\Models\PaymentMethod;
use App\Services\OutsidePaymentService;

class AcquiringHandler implements PaymentDepositInterface
{
    public function __construct(OutsidePaymentService $outsidePaymentService)
    {
        $this->outsidePaymentService=$outsidePaymentService;
    }

    public function handle(PaymentMethod $paymentMethod, array $data): mixed
    {
        $response = $this->outsidePaymentService->createPayInCascade($data['amount'],$data['currency'],$paymentMethod->id);

        return [
            'hpp_url' => $response['data']['attributes']['hpp_url'] ?? null,
            'deposit' => $response['data']['attributes']['deposit'] ?? null,
            'status' => $response['data']['attributes']['status'] ?? null,
        ];
    }
}
