<?php

namespace App\Services;

use App\Http\Enums\DepositStatusEnum;
use App\Http\Enums\TransactionOperationEnum;
use App\Http\Enums\TransactionStatusEnum;
use App\Models\Deposit;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class DepositService
{
    public function __construct(TransactionService $transactionService)
    {
        $this->transactionService = $transactionService;
    }

    public function createDeposit($amount, $currency, $payment_id, $payment_method_id,$transactionId, $userId = null)
    {
        $deposit = new Deposit();

        $deposit->user_id = $userId ?? Auth::id();

        $deposit->transaction_id = $transactionId;

        $deposit->payment_id = $payment_id;

        $deposit->payment_method_id = $payment_method_id;

        $deposit->sum = $amount;

        $deposit->currency =$currency;

        $deposit->status = DepositStatusEnum::CREATED->value;

        $deposit->save();

        return $deposit;
    }



    public function checkDepositStatus(User $user, $amount, $currency, $payment_id)
    {
        $lastdeposit = $user->deposits()->orderByDesc('id')->first();

        if ($lastdeposit->status === DepositStatusEnum::PAYED || $lastdeposit->status === DepositStatusEnum::CANCELED)
            return (new DepositService)->createDeposit($amount, $currency, $payment_id);
        else
            return $lastdeposit;
    }

    public function changeStatus(Deposit $deposit, $newStatus)
    {
        $oldStatus = $deposit->status;

        if ($oldStatus !== $newStatus)
        {
            $deposit->status = $newStatus;

            $deposit->save();

            if ($newStatus === DepositStatusEnum::PAYED->value)
            {
                $user = $deposit->user;

                $remaining = $this->transactionService->calculationBalance($deposit->sum, TransactionOperationEnum::DEBET->value, $user->id);

                $deposit->transaction->update(['status' => TransactionStatusEnum::PROCESSED->value, 'remaining' => $remaining]);

                $this->transactionService->balanceService->updateBalance($remaining, $user);
            }
            else
            {
                if ($oldStatus === DepositStatusEnum::PAYED->value)
                {
                    $user = $deposit->user();

                    $deposit->transaction()->update(['status' => TransactionStatusEnum::PROCESSED->value]);

                    $remaining = $this->transactionService->calculationBalance($deposit->sum, TransactionOperationEnum::CREDIT->value, $user->id);

                    $this->transactionService->balanceService->updateBalance($remaining, $user);
                }
            }
        }
    }
}
