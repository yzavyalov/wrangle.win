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


    public function calculationBalance(float $sum, $operation, $userId = null): float
    {
        $user = isset($userId)
            ? User::query()->find($userId)
            : Auth::user();

        if (!$user) {
            return 0;
        }

        $lastUserTransaction = $user->lastTransaction;
        $oldBalance = $lastUserTransaction ? $lastUserTransaction->remaining : 0;

        return match ($operation) {
            TransactionOperationEnum::DEBET => $oldBalance + $sum,
            TransactionOperationEnum::CREDIT => ($oldBalance >= $sum) ? $oldBalance - $sum : 0,
            default => $oldBalance,
        };
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
