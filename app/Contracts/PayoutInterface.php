<?php

namespace App\Contracts;

use App\Models\Payment;

interface PayoutInterface
{
    public function handle(Payment $payment, array $data): mixed;
}
