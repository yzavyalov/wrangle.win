<?php

namespace App\Http\Controllers\AdminPanel;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaymentRequest;
use App\Models\Payment;
use App\Services\PaymentService;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function __construct(PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }

    public function index()
    {
        $payments = Payment::all();

        return view('admin-panel.payments.allpaymentstable',compact('payments'));
    }


    public function create()
    {
        return view('admin-panel.payments.payment-create-form');
    }

    public function store(PaymentRequest $request)
    {
        $payment = $this->paymentService->createPayment($request);

        return redirect()->route('all-payments');
    }

    public function showEditForm($id)
    {
        $payment = Payment::query()->find($id);

        return view('admin-panel.payments.payment-edit-form',compact('payment'));
    }

    public function updatePaymnet(PaymentRequest $request, $id)
    {
        $payment = Payment::query()->find($id);

        $this->paymentService->updatePayment($payment, $request);

        return redirect()->route('all-payments');
    }

    public function delPaymnet($id)
    {
        $this->paymentService->delBet($id);

        return redirect()->route('all-payments');
    }
}
