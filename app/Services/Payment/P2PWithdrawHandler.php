<?php

namespace App\Services\Payment;

use App\Contracts\PayoutInterface;
use App\Models\Payment;

class P2PWithdrawHandler implements PayoutInterface
{
    public function handle(Payment $payment, array $data): mixed
    {
        dd('p2p');
    }
}
