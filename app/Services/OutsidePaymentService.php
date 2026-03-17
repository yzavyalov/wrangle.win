<?php

namespace App\Services;

use App\Http\Enums\PaymentCategoryEnum;
use App\Http\Enums\TransactionStatusEnum;
use App\Services\Payment\CascadeService;
use App\Services\Payment\DepositPaymentService;
use App\Services\Payment\PaymentMethodService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class OutsidePaymentService
{
    public function __construct(
                                CascadeService $cascadeService,
                                PayOutService $payOutService,
                                TransactionService $transactionService,
                                DepositPaymentService $depositPaymentService,
                                )
    {
        $this->cascadeService = $cascadeService;

        $this->payOutService = $payOutService;

        $this->transactionService = $transactionService;

        $this->depositPaymentService = $depositPaymentService;
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

            $transaction = $this->transactionService->debit(Auth::id(),$amount,'Deposit', TransactionService::selectTransactionMethod($payment->id));

            $deposit = $this->depositPaymentService->$function($amount,$currency,$payment->id,$paymentMethodId,$transaction->id);

            if ($deposit)
            {
                return $deposit;
            }
        }

        return false;
    }


    public function createPayOutCascade($amount,$currency,$cardNumber,$paymentMethodId)
    {
        $userData = $this->cascadeService->usersData();

        $data = $this->cascadeService->paymnetFilterService->paymentFilterData($userData,$paymentMethodId);

        $payments = $this->cascadeService->selectPayments($data,PaymentCategoryEnum::OUT->value);

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

            $payOut = $this->payOutService->$function($amount,$currency,$cardNumber,$payment->id, $paymentMethodId);

            if ($payOut)
            {
                return $payOut;
            }
        }

        return false;
    }



}
