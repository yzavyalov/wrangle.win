<?php

namespace App\Services\Payment;

use App\Services\CryptoProcessingService;
use App\Services\DepositService;
use App\Services\Payment\Acquiring\WintecaExcahngeService;
use App\Services\Payment\Acquiring\WintecaService;
use App\Services\Payment\Crypto\AlphaPoExcechangeService;
use App\Services\PaymentAmountService;

class DepositPaymentService
{
    public function __construct(CryptoProcessingService $cryptoProcessingService,
                                DepositService $depositService,
                                WintecaService $wintecaService,
                                WintecaExcahngeService $excahngeService,
                                AlphaPoExcechangeService $alphaPoExcechangeService,
                                PaymentAnswerService $paymentAnswerService,
    )
    {
        $this->cryptoProcessingService = $cryptoProcessingService;

        $this->depositService = $depositService;

        $this->alphaPoExcechangeService = $alphaPoExcechangeService;

        $this->wintecaService = $wintecaService;

        $this->excahngeService = $excahngeService;

        $this->paymentAnswerService = $paymentAnswerService;

        $this->baseCurrency = env('CURRENT_CURRENCY');
    }
    public function createWintecaDeposit($amount,$currency,$payment_id)
    {
        $deposit = $this->depositService->createDeposit($amount,$currency,$payment_id);

        $exchangeSum = $this->excahngeService->exchangePayIn($amount);

        $newAmount = PaymentAmountService::amountPayInWithoutComission($payment_id,$exchangeSum);

        $invoice = $this->wintecaService->createWintecaPaymentInvoice($newAmount, 'USD', $deposit->id);

        $this->wintecaService->paymentLogsService->createLog($deposit,json_encode($invoice));
dd($invoice);
        if ($invoice)
        {
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
        }

        $invoice = $this->paymentAnswerService->wintecaPayInAnswer($invoice);

        return $invoice;
    }


    public function createAlphaPoDeposit($amount,$currency,$payment_id)
    {
        $exchangeSum = $this->alphaPoExcechangeService->exchangeCrypto($amount,$currency);

        if (!$exchangeSum)
            return $this->paymentAnswerService->AlphaPoPayInNotCurrencyAnswer();
        else
            $deposit = $this->depositService->createDeposit($exchangeSum, $this->baseCurrency, $payment_id);

        $responce = $this->cryptoProcessingService->createDeposit($deposit,$currency);

        return $this->paymentAnswerService->AlphaPoPayInAnswer($responce, $amount, $currency);
    }

}
