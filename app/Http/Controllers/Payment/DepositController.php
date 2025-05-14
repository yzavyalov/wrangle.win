<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Http\Requests\AmountRequest;
use App\Http\Resources\AlphaPoResource;
use App\Services\OutsidePaymentService;
use Illuminate\Http\Request;

class DepositController extends Controller
{
    public function __construct(OutsidePaymentService $outsidePaymentService)
    {
        $this->outsidePaymentService = $outsidePaymentService;
    }

    public function cryptoInvoiceCreate()
    {
        return $this->outsidePaymentService->cryptoProcessingService->createInvoice('USDTT',25);
    }


    public function alphaPoDeposit(AmountRequest $request)
    {
        $currency = $request->only('currency');

        return AlphaPoResource::collection($this->outsidePaymentService->cryptoProcessingService->createDeposit($currency['currency']));
    }

    public function alphaNewDepositAdres(AmountRequest $request)
    {
        $currency = $request->only('currency');

        return AlphaPoResource::make($this->outsidePaymentService->cryptoProcessingService->newAdres($currency['currency']));
    }


}
