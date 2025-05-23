<?php

namespace App\Services;

use App\Http\Enums\TransactionMethodEnum;
use App\Http\Enums\TransactionOperationEnum;
use App\Http\Enums\TransactionStatusEnum;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class TransactionService
{
    public function __construct(BalanceService $balanceService)
    {
        $this->balanceService = $balanceService;
    }
    public function allTransactions()
    {
        return Transaction::all();
    }


    public function calculationBalance($sum, $operation, $userId = null)
    {
        if (isset($userId))
            $user = User::query()->find($userId);
        else
            $user = Auth::user();

        $lastUserTransaction = $user->lastTransaction;

        if ($lastUserTransaction)
            $oldBalance = $lastUserTransaction->remaining;
        else
            $oldBalance = 0;

        if ($operation == TransactionOperationEnum::DEBET)
            return $oldBalance+$sum;
        elseif ($operation == TransactionOperationEnum::CREDIT)
        {
            if ($oldBalance >= $sum)
                return $oldBalance-$sum;
            else
                return 0;
        }
        else
            return $oldBalance;
    }

    public function debit($userID, $sum, $comment = 'test', $method = TransactionMethodEnum::TEST): Transaction
    {
        $transaction = new Transaction();

        $transaction->user_id = $userID;

        $transaction->operation = TransactionOperationEnum::DEBET;

        $transaction->status = TransactionStatusEnum::CREATED;

        $transaction->method = $method;

        $transaction->sum = $sum;

        $transaction->remaining = $this->calculationBalance($sum,TransactionOperationEnum::DEBET,$userID);

        $transaction->comment = $comment;

        $transaction->save();

        $user = User::query()->find($userID);

        $this->balanceService->updateBalance($transaction->remaining,$user);

        return $transaction;
    }


    public function creditBit($sum, $comment = 'test')
    {
        $transaction = new Transaction();

        $transaction->user_id = Auth::id();

        $transaction->operation = TransactionOperationEnum::CREDIT;

        $transaction->status = TransactionStatusEnum::PROCESSED;

        $transaction->method = TransactionMethodEnum::BIT;

        $transaction->sum = $sum;

        $transaction->remaining = $this->calculationBalance($sum,TransactionOperationEnum::CREDIT);

        $transaction->comment = $comment;

        $transaction->save();

        $this->balanceService->updateBalance($transaction->remaining);

        return $transaction;
    }


    public function creditWithdraw($userId,$sum,$comment = 'Withdraw')
    {
        $transaction = new Transaction();

        $transaction->user_id = $userId;

        $transaction->operation = TransactionOperationEnum::CREDIT;

        $transaction->status = TransactionStatusEnum::CREATED;

        $transaction->method = TransactionMethodEnum::CRYPTO;

        $transaction->sum = $sum;

        $transaction->remaining = $this->calculationBalance($sum,TransactionOperationEnum::CREDIT);

        $transaction->comment = $comment;

        $transaction->save();

        $this->balanceService->updateBalance($transaction->remaining);

        return $transaction;
    }



}
