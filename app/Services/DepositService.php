<?php

namespace App\Services;

use App\Http\Enums\DepositStatusEnum;
use App\Models\Deposit;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class DepositService
{
    public function createDeposit($amount, $currency, $payment_id)
    {
        $deposit = new Deposit();

        $deposit->user_id = Auth::id();

        $deposit->payment_id = $payment_id;

        $deposit->sum = $amount;

        $deposit->currency =$currency;

        $deposit->status = DepositStatusEnum::CREATED;

        $deposit->save();

        return $deposit;
    }



    public static function checkDepositStatus(User $user, $amount, $currency, $payment_id)
    {
        $lastdeposit = $user->deposits()->orderByDesc('id')->first();

        if ($lastdeposit->status === DepositStatusEnum::PAYED || $lastdeposit->status === DepositStatusEnum::CANCELED)
            return (new DepositService)->createDeposit($amount, $currency, $payment_id);
        else
            return $lastdeposit;
    }

    public static function changeStatus(Deposit $deposit, $newStatus)
    {
        if ($deposit->status !== $newStatus)
        {
            $deposit->status = $newStatus;

            $deposit->save();
        }
    }
}
