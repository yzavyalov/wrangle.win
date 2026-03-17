<?php

namespace App\Services\Payment\Crypto;

use App\Http\Enums\DepositStatusEnum;
use App\Http\Enums\TransactionMethodEnum;
use App\Http\Enums\TransactionStatusEnum;
use App\Models\CryptoWallet;
use App\Services\DepositService;
use App\Services\Payment\CheckLastUserTransactionService;
use App\Services\Payment\CommissionService;
use App\Services\TransactionService;
use Illuminate\Support\Facades\Log;

class CryptoZayaDepositWithoutRequestService
{
    public function __construct(TransactionService $transactionService,
                                DepositService $depositService,
                                CheckLastUserTransactionService $checkLastUserTransactionService,
                                )
    {
        $this->transactionService = $transactionService;

        $this->depositService = $depositService;

        $this->checkLastUserTransactionService = $checkLastUserTransactionService;

        $this->base_currency = env('CURRENT_CURRENCY');
    }


    public function createCryptoZayaDepositWithoutRequest($address,$amount,$payment_id, $payment_method_id)
    {
        $user = $this->searchUser($address);

        if ($user)
        {
            $amountWithoutCoimmission = round(CommissionService::getWithoutCoimmission($payment_id, $amount),0);
            //проверим последнюю транзакцию
            $lastTransaction = $this->checkLastUserTransactionService->checkLastUserTransaction($user, $amountWithoutCoimmission);

            if (!$lastTransaction)
            {
                Log::info('create transaction');
                $transaction = $this->transactionService->debit($user->id, $amountWithoutCoimmission, 'Payment to your crypto wallet', TransactionMethodEnum::CRYPTO->value);

                $transaction->update(['status' => TransactionStatusEnum::PROCESSED->value]);

                $transaction->save();

                $deposit = $this->depositService->createDeposit($amountWithoutCoimmission, $this->base_currency, $payment_id, $payment_method_id, $transaction->id, $user->id);
            }
            else
            {
                Log::info('update transaction');
                $transaction = $lastTransaction;

                $transaction->update(['status' => TransactionStatusEnum::PROCESSED->value]);

                $transaction->save();

                $deposit = $transaction->deposit;
            }

            $this->depositService->changeStatus($deposit, DepositStatusEnum::PAYED->value);

            return $deposit;
        }
        else
        {
          return false;
        }
    }

    protected function searchUser($address)
    {
        return CryptoWallet::where('address', $address)->first()?->user;
    }
}
