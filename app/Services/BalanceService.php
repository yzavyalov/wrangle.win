<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

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
        $user = $user ?? Auth::user(); // Получаем пользователя внутри метода

        if (!$user) {
            return;
        }

        if ($user->balance)
            $user->balance->update(['balance' => $remaining]);
        else
            $user->balance()->create(['balance' => $remaining]);
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
