<?php

namespace App\Services\Payment;

use App\Models\Payment;

class CommissionService
{
    public static function getCommission($paymentId, $sum)
    {
        $payment = Payment::query()->find($paymentId);

        return $sum + ($sum * $payment->commission/100) + $payment->fix_fee;
    }

    public static function getWithoutCoimmission($paymentId, $sum)
    {
        $payment = Payment::query()->find($paymentId);

        return $sum - ($sum * $payment->commission/100) - $payment->fix_fee;
    }
}
