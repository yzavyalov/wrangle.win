<?php

namespace App\Services;

use App\Models\Payment;

class PaymentAmountService
{
    public static function amountPayInWithoutComission($paymentId, $sum)
    {
        $payment = Payment::query()->find($paymentId);

        $newSum = $sum+$payment->fix_fee+($sum*$payment->commission/100);

        return $newSum;
    }

    public static function amountPayOutWithoutComission($paymentId, $sum)
    {
        $payment = Payment::query()->find($paymentId);

        $newSum = $sum-$payment->fix_fee-($sum*$payment->commission/100);

        return $newSum;
    }
}
