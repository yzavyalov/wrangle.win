<?php

namespace App\Services\Payment;

use App\Contracts\PayoutInterface;
use App\Models\Payment;

class CryptoWithdrawHandler implements PayoutInterface
{
    public function handle(Payment $payment, array $data): mixed
    {
        dd('crypto');
    }
}
