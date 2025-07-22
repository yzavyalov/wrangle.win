<?php

namespace App\Contracts;

use App\Models\PaymentMethod;

interface PaymentDepositInterface
{
    public function handle(PaymentMethod $paymentMethod, array $data): mixed;

}
