<?php

namespace App\Services;

use App\Models\Payment;
use App\Models\Payout;
use App\Models\Transaction;
use App\Services\Payment\Acquiring\WintecaExcahngeService;
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
                                TransactionService $transactionService,
                                WintecaExcahngeService $excahngeService,
                                )
    {
        $this->cryptoProcessingService = $cryptoProcessingService;

        $this->depositService = $depositService;

        $this->payOutService = $payOutService;

        $this->alphaPoService = $alphaPoService;

        $this->wintecaService = $wintecaService;

        $this->transactionService = $transactionService;

        $this->excahngeService = $excahngeService;
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


    public function createWintecaDeposit($amount,$currency,$payment_id)
    {
        $deposit = $this->depositService->createDeposit($amount,$currency,$payment_id);

        $exchangeSum = $this->excahngeService->exchangePayIn($amount);

        $newAmount = PaymentAmountService::amountPayInWithoutComission($payment_id,$exchangeSum);

        $invoice = $this->wintecaService->createWintecaPaymentInvoice($newAmount, 'USD', $deposit->id);

        $this->wintecaService->paymentLogsService->createLog($deposit,json_encode($invoice));

        $deposit->transactionable()->create([
            'id_winteca' => $invoice['data']['id'],
            'status' => $invoice['data']['attributes']['status'],
            'resolution' => $invoice['data']['attributes']['resolution'],
            'amount' => $invoice['data']['attributes']['amount'],
            'payment_amount' => $invoice['data']['attributes']['payment_amount'],
            'deposit' => $invoice['data']['attributes']['deposit'],
            'currency' => $invoice['data']['attributes']['currency'],
            'reference_id' => $invoice['data']['attributes']['reference_id'],
            'fee' => $invoice['data']['attributes']['fee'],
        ]);

        return $invoice;
    }


    public function payoutWintecaCreate(Payment $payment, array $data)
    {
        $amount = $data['amount'];

        $exchangeSum = $this->excahngeService->exchangePayOut($amount);

        $newAmount = PaymentAmountService::amountPayOutWithoutComission($payment->id,$exchangeSum);

        $currency = $data['currency'];

        $cardNumber = $data['card_number'];

        $payout = $this->payOutService->createPayOut($payment->id, $amount, $currency, Auth::id());

        $invoice = $this->wintecaService->CreatePayOutInvoice($payout,$newAmount,$currency, $cardNumber);

        $this->wintecaService->paymentLogsService->createLog($payout,json_encode($invoice));

        $payout->transactionable()->create([
            'id_winteca' => $invoice['data']['id'],
            'status' => $invoice['data']['attributes']['status'],
            'resolution' => $invoice['data']['attributes']['resolution'],
            'amount' => $invoice['data']['attributes']['amount'],
            'payment_amount' => $invoice['data']['attributes']['payout_amount'],
            'deposit' => $invoice['data']['attributes']['writeoff'],
            'currency' => $invoice['data']['attributes']['currency'],
            'reference_id' => $invoice['data']['attributes']['reference_id'],
            'fee' => $invoice['data']['attributes']['fee'],
        ]);

       return $invoice;
    }


}
