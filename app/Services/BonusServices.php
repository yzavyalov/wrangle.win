<?php

namespace App\Services;

use App\Http\Enums\BonusModelEnum;
use App\Http\Enums\BonusTypeEnum;
use App\Http\Enums\TransactionMethodEnum;
use App\Models\Bonus;
use Illuminate\Support\Facades\Auth;

class BonusServices
{
    public function __construct(TransactionService $transactionService)
    {
        $this->transactionService = $transactionService;
    }

    public function addBonus(Bonus $bonus)
    {
        if (BonusTypeEnum::from($bonus->type) === BonusTypeEnum::DISPOSABLE)
            return $this->checkModelBonus($bonus->amount_type, $bonus->amount);
        else
            return $this->periodik();
    }


    protected function checkModelBonus($amount_type, $amount)
    {
        if (BonusModelEnum::from($amount_type) === BonusModelEnum::MONEY)
            return $this->moneyBonus($amount);
        else
            return $this->percentBonus();
    }


    protected function moneyBonus($amount)
    {
        $user = Auth::user();

        return $this->transactionService->debit($user->id,$amount,'You received a bonus when registering', TransactionMethodEnum::BONUS);
    }


    protected function percentBonus()
    {
        return 2;
    }


    protected function periodik()
    {
        return 3;
    }
}
