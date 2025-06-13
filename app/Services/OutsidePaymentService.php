<?php

namespace App\Services;

use App\Models\Payment;
use App\Models\Payout;
use App\Models\Transaction;
use App\Services\Payment\Acquiring\WintecaService;
use App\Services\Payment\AlphaPoService;
use Illuminate\Support\Facades\Auth;

class OutsidePaymentService
{
    public function __construct(CryptoProcessingService $cryptoProcessingService,
                                DepositService $depositService,
                                PayOutService $payOutService,
                                AlphaPoService $alphaPoService,
                                WintecaService $wintecaService,
                                )
    {
        $this->cryptoProcessingService = $cryptoProcessingService;

        $this->depositService = $depositService;

        $this->payOutService = $payOutService;

        $this->alphaPoService = $alphaPoService;

        $this->wintecaService = $wintecaService;
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

    public function payoutCreate(Payment $payment, array $data)
    {
        $sum = $data['amount'];

        $currency = $data['currency'];

        $payout = $this->payOutService->createPayOut($payment->id, $sum, $currency, Auth::id());



    }

    protected function selectPayment(Payment $payment, $sum, $currency)
    {
        switch ($payment->id)
        {
            //изменить на реальные ид из БД
            case 1:
                break;
            case 2
            $this->alphaPoService->cryptoProcessingService->

        }

    }
}
