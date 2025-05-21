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
        $data = $request->validated();

        $amount = $data['amount'];

        $currency = $data['convert_to'];

        $address = $data['address'];

        $tag = $data['tag'] ?? null;

        return $this->outsidePaymentService->cryptoProcessingService->payOut($amount,$currency,$address,$tag);
    }
}
