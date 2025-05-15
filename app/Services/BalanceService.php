<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class BalanceService
{
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


    public static function checkSum($sum)
    {
        if (!isset(Auth::user()->balance))
        {
            BalanceService::createBalance();
        }

        $balance = Auth::user()->balance->balance;

        if ($balance >= $sum)
            return true;
        else
            return  false;
    }
}
