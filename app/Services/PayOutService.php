<?php

namespace App\Services;

use App\Http\Enums\DepositStatusEnum;
use App\Http\Enums\TransactionMethodEnum;
use App\Http\Enums\TransactionOperationEnum;
use App\Http\Enums\TransactionStatusEnum;
use App\Models\Payout;
use App\Models\Transaction;
use App\Services\Payment\Acquiring\WintecaExcahngeService;
use App\Services\Payment\Acquiring\WintecaService;
use App\Services\Payment\CommissionService;
use App\Services\Payment\Crypto\CryptoZayaAnswerService;
use App\Services\Payment\Crypto\CryptoZayaService;
use App\Services\Payment\PaymentMethodService;
use App\Services\Payment\PaymentPayOutAnswerService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class PayOutService
{
    public $base_currency;
    public function __construct(WintecaService $wintecaService,
                                TransactionService $transactionService,
                                WintecaExcahngeService $excahngeService,
                                CryptoProcessingService $cryptoProcessingService,
                                PaymentPayOutAnswerService $paymentPayOutAnswerService,
                                DepositService $depositService,
                                CryptoZayaService $cryptoZayaService,
    )
    {
        $this->wintecaService = $wintecaService;

        $this->transactionService = $transactionService;

        $this->excahngeService = $excahngeService;

        $this->cryptoProcessingService = $cryptoProcessingService;

        $this->paymentPayOutAnswerService = $paymentPayOutAnswerService;

        $this->depositService = $depositService;

        $this->cryptoZayaService = $cryptoZayaService;

        $this->base_currency = env('CURRENT_CURRENCY');
    }


    public function createPayOut($payment_id, $paymentMethodId, $amount, $currency, $user)
    {
        $payout = new Payout();

        $payout->user_id = $user->id;
        $payout->payment_id = $payment_id;
        $payout->payment_method_id = $paymentMethodId;
        $payout->sum = $amount;
        $payout->currency = $currency;
        $payout->status = DepositStatusEnum::CREATED->value;
        $payout->save();

        $transaction = Transaction::create([
            'user_id' => $user->id,
            'operation' => TransactionOperationEnum::CREDIT->value,
            'status' => TransactionStatusEnum::CREATED->value,
            'method' => TransactionMethodEnum::CRYPTO->value,
            'sum' => $amount,
            'remaining' => $this->transactionService->calculationBalance(
                $amount,
                TransactionOperationEnum::CREDIT->value,
                $user->id
            ),
            'comment' => 'Withdraw',
        ]);

        $payout->transaction()->associate($transaction);
        $payout->save();

        return $payout;
    }

    public function createWintecaPayOut($amount, $currency, $cardNumber, $paymentId, $paymentMethodId)
    {
        $exchangeSum = $this->excahngeService->exchangePayOut($amount);

        $newAmount = PaymentAmountService::amountPayOutWithoutComission($paymentId,$exchangeSum);

        $user = Auth::user();

        $payout = $this->createPayOut($paymentId,$paymentMethodId,$amount,$currency,$user);

        $invoice = $this->wintecaService->CreatePayOutInvoice($payout,$newAmount,$currency, $cardNumber);

        $this->wintecaService->paymentLogsService->createLog($payout,json_encode($invoice));

        if (isset($invoice['response']))
        {
            $payout->transactionable()->create([
                'id_winteca' => $invoice['response']['data']['id'],
                'status' => $invoice['response']['data']['attributes']['status'],
                'resolution' => $invoice['response']['data']['attributes']['resolution'],
                'amount' => $invoice['response']['data']['attributes']['amount'],
                'payment_amount' => $invoice['response']['data']['attributes']['payout_amount'],
                'deposit' => $invoice['response']['data']['attributes']['writeoff'],
                'currency' => $invoice['response']['data']['attributes']['currency'],
                'reference_id' => $invoice['response']['data']['attributes']['reference_id'],
                'fee' => $invoice['response']['data']['attributes']['fee'],
            ]);

            return $this->paymentPayOutAnswerService->wintecaSuccsess($invoice['response']);
        }
        else
        {
            $payout->status = DepositStatusEnum::CANCELED->value;

            $payout->save();

            $paymentMethodId = PaymentMethodService::paymentMethodId($paymentId,$currency);

            $this->depositService->createDeposit($amount,$currency,$paymentId,$transactionId,$paymentMethodId);

            $this->transactionService->debit($user->id, $amount, 'Cancellation of the payment system for withdrawing money to a bank card', $method = TransactionMethodEnum::CARD);

            return $this->paymentPayOutAnswerService->wintecaError($invoice);
        }
    }


    public function createCryptoZayaWithdraw($amount,$currency,$cardNumber,$paymentId, $paymentMethodId)
    {
        $user = Auth::user();

        $payout = $this->createPayOut($paymentId, $paymentMethodId, $amount, $this->base_currency, $user);

        $transaction = $payout->transaction;

        $sumWithoutCommission = CommissionService::getWithoutCoimmission($paymentId, $amount);

        $exchangeSum = $this->cryptoZayaService->exchangeBackAmount($sumWithoutCommission,$currency);

        if (isset($sumWithoutCommission) && !empty($sumWithoutCommission))
        {
            $response = $this->cryptoZayaService->createCryptoZayaWithdraw($cardNumber,$amount,config('cryptozaya.base_currency'),$currency,$transaction->id, $user);
Log::info('response',[$response]);
            if ($response)
            {
                Log::info('withdraw success');
                $payout->status = DepositStatusEnum::PAYED->value;
                $payout->save();

                $transaction->status = TransactionStatusEnum::PROCESSED->value;
                $transaction->save();

                $this->transactionService->balanceService->updateBalance($transaction->remaining, $user);

                return CryptoZayaAnswerService::getAnswer($exchangeSum, $currency, $cardNumber);
            }
            else
            {
                $payout->status = DepositStatusEnum::CANCELED->value;
                $payout->save();

                $transaction->status = TransactionStatusEnum::CANCELED->value;
                $transaction->save();

                Log::info('withdraw failed');
                return PaymentPayOutAnswerService::withdrawFailed();
            }

            return $response;
        }
        else
            return null;
    }


}
