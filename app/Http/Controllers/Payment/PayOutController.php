<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Http\Requests\AlphaPoPayOutRequest;
use App\Services\OutsidePaymentService;
use Illuminate\Http\Request;

class PayOutController extends Controller
{
    public function __construct(OutsidePaymentService $outsidePaymentService)
    {
        $this->outsidePaymentService = $outsidePaymentService;
    }

    public function payoutCrypto(AlphaPoPayOutRequest $request)
    {
        return $this->outsidePaymentService->cryptoProcessingService->payOut($request->validated());
    }
}
