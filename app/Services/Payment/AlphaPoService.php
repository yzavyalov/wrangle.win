<?php

namespace App\Services\Payment;

use App\Http\Enums\DepositStatusEnum;
use App\Http\Enums\TransactionMethodEnum;
use App\Models\Deposit;
use App\Models\User;
use App\Services\DepositService;
use App\Services\PaymentLogsService;
use App\Services\TransactionService;
use Illuminate\Support\Facades\Log;

class AlphaPoService
{
    public function __construct(TransactionService $transactionService, PaymentLogsService $paymentLogsService)
    {
        $this->transactionService = $transactionService;

        $this->paymentLogsService = $paymentLogsService;
    }
    public function getCallBackDeposit(array $response)
    {
        try {
            $userId = $response['crypto_address']['foreign_id'] ?? null;
            $amount = $response['currency_received']['amount_minus_fee'] ?? null;
            $currency = $response['crypto_address']['currency'] ?? null;

            if($userId & $amount)
            {
                $user = User::query()->findOrFail($userId);

                $deposit = DepositService::checkDepositStatus($user,$amount, $currency);

                if ($deposit){
                    $deposit->status = DepositStatusEnum::PAYED;
                    $deposit->save();
                    $this->paymentLogsService->createLog($deposit, json_encode($response));
                }
                else{
                    Log::error("Депозит не найден для пользователя", [
                        'user_id' => $userId,
                        'amount' => $amount,
                        'response' => $response ?? null,
                    ]);
                }

                $this->transactionService->debit(
                    $userId,
                    $amount,
                    'replenishment of the account with cryptocurrency',
                    TransactionMethodEnum::CRYPTO
                );
            }
            else
            {
                Log::error('Некорректные данные в колбэке AlphaPo', [
                    'user_id' => $userId,
                    'amount' => $amount,
                    'response' => $response ?? null,
                ]);
            }


        } catch (\Exception $e) {
            Log::error('Ошибка в getCallBackDeposit', [
                'message' => $e->getMessage(),
                'response' => $response,
            ]);
        }
    }

}
