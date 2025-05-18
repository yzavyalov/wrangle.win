<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Enums\PaymentCategoryEnum;
use App\Http\Requests\SelectPaymentRequest;
use App\Http\Resources\PaymentResource;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymnetsController extends Controller
{
    public function allInPayments()
    {
        $payments = Payment::query()->where('category',PaymentCategoryEnum::IN)->get();

        return PaymentResource::collection($payments);
    }

    public function allOutPayments()
    {
        $payments = Payment::query()->where('category',PaymentCategoryEnum::OUT)->get();

        return PaymentResource::collection($payments);
    }


    public function showIn(SelectPaymentRequest $request,$id)
    {
        $data = $request->validated();

        $payment = Payment::query()->findOrFail($id);

        $paymnet = PaymentResource::make($payment);

        $answer = [
            'currency' => $data['currency'],
            'amount' => $data['amount'],
            'payment' => $paymnet,
        ];

        return $answer;
    }
}
