<?php

namespace App\Services\Payment;

use Illuminate\Support\Facades\Auth;

class FirstDepositService
{
    public function isFirstDeposit(): bool
    {
        $user = Auth::user();

        // Используем exists(), чтобы не грузить всю коллекцию
        return !$user->deposits()->exists();
    }
}
