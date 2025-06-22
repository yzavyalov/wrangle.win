<?php

namespace App\Services;

use App\Models\Payment;

class PaymentAmountService
{
    public static function amountWithoutComission($paymentId, $sum)
    {
        $payment = Payment::query()->find($paymentId);

        $newSum = $sum-$payment->fix_fee-($sum*$payment->commission/100);

        return $newSum;
    }
}
