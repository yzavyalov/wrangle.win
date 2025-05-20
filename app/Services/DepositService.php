<?php

namespace App\Services;

use App\Http\Enums\DepositStatusEnum;
use App\Models\Deposit;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class DepositService
{
    public function createDeposit($amount, $currency)
    {
        $deposit = new Deposit();

        $deposit->user_id = Auth::id();

        $deposit->payment_id = Payment::query()->where('name','AlphaPo')->first()->id;

        $deposit->sum = $amount;

        $deposit->currency =$currency;

        $deposit->status = DepositStatusEnum::CREATED;

        $deposit->save();

        return $deposit;
    }



    public static function checkDepositStatus(User $user, $amount, $currency)
    {
        $lastdeposit = $user->deposits()->orderByDesc('id')->first();

        if ($lastdeposit->status === DepositStatusEnum::PAYED || $lastdeposit->status === DepositStatusEnum::CANCELED)
            return (new DepositService)->createDeposit($amount, $currency);
        else
            return $lastdeposit;
    }
}
