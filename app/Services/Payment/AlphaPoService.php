<?php

namespace App\Services\Payment;

use App\Http\Enums\DepositStatusEnum;
use App\Http\Enums\TransactionMethodEnum;
use App\Models\Deposit;
use App\Models\Payment;
use App\Models\User;
use App\Services\CryptoProcessingService;
use App\Services\DepositService;
use App\Services\PaymentLogsService;
use App\Services\PayOutService;
use App\Services\TransactionService;
use Illuminate\Support\Facades\Log;
use function Composer\Autoload\includeFile;

class AlphaPoService
{
    public function __construct(TransactionService $transactionService,
                                PaymentLogsService $paymentLogsService,
                                CryptoProcessingService $cryptoProcessingService,)
    {
        $this->transactionService = $transactionService;

        $this->paymentLogsService = $paymentLogsService;

        $this->cryptoProcessingService = $cryptoProcessingService;
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

                $payment_id = Payment::query()->where('name','AlphaPo')->first()->id;

                $deposit = DepositService::checkDepositStatus($user,$amount, $currency,$payment_id);

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


    public function getCallBackWithdrawal(array $response)
    {
        try {
            $userId = $response['foreign_id'] ?? null;
            $amount = $response['currency_received']['amount'] ?? null;
            $currency = $response['currency_received']['currency'] ?? null;

            $amount = $this->exchange($currency, env('CURRENT_CURRENCY'), $amount);

            if($userId && $amount)
            {
                $user = User::query()->findOrFail($userId);

                $payment_id = Payment::query()->where('name','AlphaPo')->first()->id;

                $payout = PayOutService::checkPayoutStatus($user,$amount,env('CURRENT_CURRENCY'),$payment_id);

                if ($payout) {
                    $payout->status = DepositStatusEnum::PAYED;
                    $payout->save();
                    $this->paymentLogsService->createLog($payout, json_encode($response));
                } else {
                    Log::error("Выплата не найдена для пользователя", [
                        'user_id' => $userId,
                        'amount' => $amount,
                        'response' => $response ?? null,
                    ]);
                }
            }
        }
        catch (\Exception $e) {
            Log::error('Ошибка в getCallBackDeposit', [
                'message' => $e->getMessage(),
                'response' => $response,
            ]);
        }
    }


    public function exchange(string $fromCurrency, $toCurrency, float $amount)
    {

        $list = $this->cryptoProcessingService->pare();
dd($list);
        $ammount = $this->convertCurrency($list,$fromCurrency,$toCurrency,$amount);

        if ($ammount !== null)
        {
            return round($ammount, 2);
        }
        else
            return null;
    }


    /**
     * Конвертирует сумму из одной валюты в другую на основе массива курсов.
     *
     * @param array $data — массив курсов
     * @param string $fromCurrency — валюта прихода (например, 'ETH')
     * @param string $toCurrency — базовая валюта для конвертации (например, 'USD')
     * @param float $amount — сумма для конвертации
     * @return float|null — сконвертированная сумма или null, если пара не найдена
     */
    public function convertCurrency(array $data, string $fromCurrency, string $toCurrency, float $amount): ?float
    {
        if (!isset($data['data']['data']) || !is_array($data['data']['data'])) {
            return null; // нет нужных данных
        }

        foreach ($data['data']['data'] as $item) {
            if (
                isset($item['currency_from']['currency'], $item['currency_to']['currency']) &&
                $item['currency_from']['currency'] === $fromCurrency &&
                $item['currency_to']['currency'] === $toCurrency
            ) {
                $rateFrom = (float) $item['rate_from'];
                $rateTo = (float) $item['rate_to'];

                if ($rateFrom == 0) {
                    return null; // защита от деления на 0
                }

                // Конвертация суммы
                return round($amount * ($rateTo / $rateFrom), 2); // округление до 2 знаков
            }
        }

        return null; // пара не найдена
    }



}
