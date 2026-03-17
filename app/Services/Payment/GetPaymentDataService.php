<?php

namespace App\Services\Payment;

use App\Http\Enums\PaymentCategoryEnum;
use App\Models\PaymentMethod;

class GetPaymentDataService
{
    public static function getPaymentMethodFromCurrency($currency)
    {
        $paymentMethod = PaymentMethod::query()->where(['currency' => $currency, 'category' => PaymentCategoryEnum::IN->value])->first();

        $payment = $paymentMethod->payments()->first();

        return ['payment' => $payment, 'paymentMethod' => $paymentMethod];
    }
}
