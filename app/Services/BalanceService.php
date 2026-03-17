<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class BalanceService
{
    const MIN_BALANCE_WITHDRAW = 50;
    const MIN_BALANCE_BIT = 0;
    public static function createBalance()
    {
        Auth::user()->balance()->create(['balance' => 0]);
    }

    public function updateBalance(float $remaining, User $user = null)
    {
        $user = $user ?? Auth::user();

        if (!$user) {
            return;
        }

        $user->balance()->updateOrCreate(
            ['user_id' => $user->id],
            ['balance' => $remaining]
        );
    }


    public static function checkSumWithDraw($sum)
    {
        if (!isset(Auth::user()->balance))
        {
            BalanceService::createBalance();
        }

        $balance = Auth::user()->balance->balance;

        if ($balance - self::MIN_BALANCE_WITHDRAW > $sum)
            return true;
        else
            return  false;
    }

    public static function checkSumBit($sum)
    {
        if (!isset(Auth::user()->balance))
        {
            BalanceService::createBalance();
        }

        $balance = Auth::user()->balance->balance;

        if ($balance - self::MIN_BALANCE_BIT > $sum)
            return true;
        else
            return  false;
    }


}
