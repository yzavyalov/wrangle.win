<?php

namespace App\Http\Controllers\AdminPanel;

use App\Http\Controllers\Controller;
use App\Http\Requests\ConditionsRequest;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentTrustConditionsController extends Controller
{
    public function create($id)
    {
        $payment = Payment::query()->find($id);

        return view('admin-panel.payments.payment-trust-conditions-form', compact('payment'));
    }


    public function save(ConditionsRequest $request)
    {
        $data = $request->validated();

        $payment = Payment::query()->find($data['payment_id']);

        $payment->conditions()->create($data);

        return redirect()->route('form-payment-conditions',$data['payment_id']);
    }


    public function edit($id)
    {
        $payment = Payment::query()->find($id);

        return view('admin-panel.payments.payment-trust-conditions-edit-form', compact('payment'));
    }


    public function update(ConditionsRequest $request)
    {
        $data = $request->validated();

        $payment = Payment::query()->find($data['payment_id']);

        $payment->conditions()->update($data);

        return redirect()->route('payment-show',$data['payment_id']);
    }
}
