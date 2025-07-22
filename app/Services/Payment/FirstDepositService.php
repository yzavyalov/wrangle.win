<?php

namespace App\Services\Payment;

use Illuminate\Support\Facades\Auth;

class FirstDepositService
{
    public function firstOrNot()
    {
        $user = Auth::user();

        return $user->deposits->isEmpty();
    }

    public function checkFirstDeposit()
    {
        if ($this->firstOrNot())
            return 'delayem foto';
    }
}
