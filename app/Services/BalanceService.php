<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;

class BalanceService
{
    public static function createBalance()
    {
        Auth::user()->balance()->create(['balance' => 0]);
    }

    public function updateBalance($remaining)
    {
        if (Auth::user()->balance())
            Auth::user()->balance()->update(['balance' => $remaining]);
        else
            Auth::user()->balance()->create(['balance' => $remaining]);
    }

    public static function checkSum($sum)
    {
        $balance = Auth::user()->balance->balance;

        if ($balance >= $sum)
            return true;
        else
            return  false;
    }
}
