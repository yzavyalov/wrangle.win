<?php

namespace App\Services;

use App\Http\Enums\PaymentCategoryEnum;
use App\Models\Payment;
use App\Models\Payout;
use App\Models\Transaction;
use App\Services\Payment\AlphaPoService;
use App\Services\Payment\CascadeService;
use App\Services\Payment\DepositPaymentService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class OutsidePaymentService
{
    public function __construct(CryptoProcessingService $cryptoProcessingService,
                                DepositService $depositService,
                                PayOutService $payOutService,
                                AlphaPoService $alphaPoService,
                                TransactionService $transactionService,
                                CascadeService $cascadeService,
                                DepositPaymentService $depositPaymentService,
                                )
    {
        $this->cryptoProcessingService = $cryptoProcessingService;

        $this->depositService = $depositService;

        $this->payOutService = $payOutService;

        $this->alphaPoService = $alphaPoService;

        $this->transactionService = $transactionService;

        $this->cascadeService = $cascadeService;

        $this->depositPaymentService = $depositPaymentService;
    }


    public function createAlphaPoDeposit($amount,$currency,$payment_id)
    {
        $deposit = $this->depositService->createDeposit($amount, $currency, $payment_id);

        return $this->cryptoProcessingService->createDeposit($deposit,$currency);
    }


    public function createAlphaPoPayOut($amount, $currency, $address, $tag)
    {
        $payment_id = Payment::query()->where('name','AlphaPo')->first()->id;
        //создаем транзакцию со списание с баланса
        $payout = $this->payOutService->createPayOut($payment_id, $amount, env('CURRENT_CURRENCY'), Auth::id());

        $transaction = $this->payOutService->transactionService->creditWithdraw(Auth::id(),$amount,'PayoutId='.$payout->id);
//обмен валюты
        $sum = $this->alphaPoService->exchange(env('CURRENT_CURRENCY'), $currency, $amount);

        if (isset($sum))
        {
            $response = $this->cryptoProcessingService->payOut($sum,$currency,$address,$tag);

            $this->alphaPoService->paymentLogsService->createLog($payout, json_encode($response));

            if (isset($response['success']) && $response['success'] === false) {
                $this->AlphaPoPayoutBack($payout, $transaction);
            }

            return $response;
        }
        else
            return $this->AlphaPoPayoutBack($payout, $transaction);
    }

    protected function AlphaPoPayoutBack(Payout $payout, Transaction $transaction)
    {
        $transaction->delete();
        $payout->delete();

        return response()->json([
            'status' => 'false',
            'message' => 'We are unable to exchange for this currency.',
        ], 500);
    }


    public function createPayInCascade($amount,$currency,$paymentMethodId)
    {
        $userData = $this->cascadeService->usersData();

        $data = $this->cascadeService->paymnetFilterService->paymentFilterData($userData,$paymentMethodId);

        $payments = $this->cascadeService->selectPayments($data,PaymentCategoryEnum::IN);

        if ($payments->isEmpty())
        {
            $userData = [];

            $data = $this->cascadeService->paymnetFilterService->paymentFilterData($userData,$paymentMethodId,true);

            $payments = $this->cascadeService->selectPayments($data,PaymentCategoryEnum::IN);

            if ($payments->isEmpty())
                return false;
        }

        foreach ($payments as $payment)
        {
            $function = $payment->function;

            if (!method_exists($this->depositPaymentService, $function)) {
                Log::error("Метод {$function} не существует в " . DepositPaymentService::class);
                continue;
            }

            $deposit = $this->depositPaymentService->$function($amount,$currency,$payment->id);

            if ($deposit)
            {
                return $deposit;
            }
        }

        return false;
    }


    public function createPauOutCascade($amount,$currency,$cardNumber,$paymentMethodId)
    {
        $userData = $this->cascadeService->usersData();

        $data = $this->cascadeService->paymnetFilterService->paymentFilterData($userData,$paymentMethodId);

        $payments = $this->cascadeService->selectPayments($data,PaymentCategoryEnum::OUT);

        if ($payments->isEmpty())
        {
            $userData = [];

            $data = $this->cascadeService->paymnetFilterService->paymentFilterData($userData,$paymentMethodId,true);

            $payments = $this->cascadeService->selectPayments($data,PaymentCategoryEnum::OUT);

            if ($payments->isEmpty())
                return false;
        }

        foreach ($payments as $payment)
        {
            $function = $payment->function;

            if (!method_exists($this->payOutService, $function)) {
                Log::error("Метод {$function} не существует в " . PayOutService::class);
                continue;
            }

            $payOut = $this->payOutService->$function($amount,$currency,$cardNumber,$payment->id);

            if ($payOut)
            {
                return $payOut;
            }
        }

        return false;
    }



}
