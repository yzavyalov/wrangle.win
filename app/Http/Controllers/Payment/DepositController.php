<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Http\Enums\DepositStatusEnum;
use App\Http\Requests\AmountRequest;
use App\Http\Resources\AlphaPoResource;
use App\Models\Deposit;
use App\Models\Payment;
use App\Services\DepositService;
use App\Services\OutsidePaymentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        $data = $request->validated();

        $wallets = $this->outsidePaymentService->createAlphaPoDeposit($data['amount'],$data['currency']);

        return AlphaPoResource::collection($wallets);
    }

    public function alphaNewDepositAdres(AmountRequest $request)
    {
        $currency = $request->only('currency');

        return AlphaPoResource::make($this->outsidePaymentService->cryptoProcessingService->newAdres($currency['currency']));
    }


}
