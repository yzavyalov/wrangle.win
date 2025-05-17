<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Services\OutsidePaymentService;

class PayOutController extends Controller
{
    public function __construct(OutsidePaymentService $outsidePaymentService)
    {
        $this->outsidePaymentService = $outsidePaymentService;
    }

    public function payoutCrypto()
    {
        return $this->outsidePaymentService->cryptoProcessingService->payOut();
    }
}
