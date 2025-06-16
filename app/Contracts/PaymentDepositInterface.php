<?php

namespace App\Contracts;

use App\Models\Payment;

interface PaymentDepositInterface
{
    public function handle(Payment $payment, array $data): mixed;

}
