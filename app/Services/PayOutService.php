<?php

namespace App\Services;

use App\Http\Enums\DepositStatusEnum;
use App\Models\Payout;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class PayOutService
{

    public function createPayOut($payment_id, $amount, $currency, $userId)
    {
        $payout = new Payout();

        $payout->user_id = $userId;

        $payout->payment_id = $payment_id;

        $payout->sum = $amount;

        $payout->currency =$currency;

        $payout->status = DepositStatusEnum::CREATED;

        $payout->save();

        return $payout;
    }


    public function deletePayout(Payout $payout)
    {
        $payout->delete();
    }

    public static function checkPayoutStatus(User $user, $amount, $currency, $payment_id)
    {
        $lastPayout = $user->payouts()->orderByDesc('id')->first();

        if (!isset($lastPayout) || $lastPayout->status === DepositStatusEnum::PAYED || $lastPayout->status === DepositStatusEnum::CANCELED)
        {
            return (new PayOutService())->createPayOut($payment_id,$amount, $currency, $user->id);
        }
        else
            return $lastPayout;
    }
}
