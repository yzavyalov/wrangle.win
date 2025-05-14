<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Services\OutsidePaymentService;
use Illuminate\Http\Request;

class DepositController extends Controller
{
    public function __construct(OutsidePaymentService $outsidePaymentService)
    {
        $this->outsidePaymentService = $outsidePaymentService;
    }

    public function cryptoList()
    {
        return $this->outsidePaymentService->cryptoProcessingService->currencyList();
    }

    public function cryptoInvoiceCreate()
    {
        return $this->outsidePaymentService->cryptoProcessingService->createInvoice('USDTT',25);
    }


}
