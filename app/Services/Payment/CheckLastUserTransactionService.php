<?php

namespace App\Services\Payment;

use App\Http\Enums\TransactionStatusEnum;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class CheckLastUserTransactionService
{
    public function checkLastUserTransaction(User $user,$amount)
    {
        $lastTransaction = $user->lastTransaction;

        if (
            $lastTransaction &&
            $lastTransaction->status === TransactionStatusEnum::CREATED->value &&
            number_format($lastTransaction->sum, 8, '.', '') === number_format($amount, 8, '.', '')
        )
            return $lastTransaction;
        else
            return false;
    }
}
