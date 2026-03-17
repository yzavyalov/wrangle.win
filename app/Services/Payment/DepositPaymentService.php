<?php

namespace App\Services\Payment;

use App\Services\CryptoProcessingService;
use App\Services\DepositService;
use App\Services\Payment\Acquiring\WintecaExcahngeService;
use App\Services\Payment\Acquiring\WintecaService;
use App\Services\Payment\Crypto\AlphaPoExcechangeService;
use App\Services\Payment\Crypto\CryptoZayaService;
use App\Services\PaymentAmountService;
use Illuminate\Support\Facades\Log;


class DepositPaymentService
{
    public function __construct(CryptoProcessingService $cryptoProcessingService,
                                DepositService $depositService,
                                WintecaService $wintecaService,
                                WintecaExcahngeService $excahngeService,
                                PaymentAnswerService $paymentAnswerService,
                                CryptoZayaService $cryptoZayaService,
    )
    {
        $this->cryptoProcessingService = $cryptoProcessingService;

        $this->depositService = $depositService;

        $this->wintecaService = $wintecaService;

        $this->excahngeService = $excahngeService;

        $this->paymentAnswerService = $paymentAnswerService;

        $this->cryptoZayaService = $cryptoZayaService;

        $this->baseCurrency = env('CURRENT_CURRENCY');
    }
    public function createWintecaDeposit($amount,$currency,$payment_id, $payment_method_id, $transactionId)
    {
        $deposit = $this->depositService->createDeposit($amount,$currency,$payment_id, $payment_method_id);

        $exchangeSum = $this->excahngeService->exchangePayIn($amount);

        $newAmount = PaymentAmountService::amountPayInWithoutComission($payment_id,$exchangeSum['sum']);

        $invoice = $this->wintecaService->createWintecaPaymentInvoice($newAmount, $exchangeSum['currency'], $deposit->id);

        $this->wintecaService->paymentLogsService->createLog($deposit,json_encode($invoice));

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



    public function createCryptoZayaDeposit($amount,$currency,$payment_id, $payment_method_id, $transactionId)
    {
        $deposit = $this->depositService->createDeposit($amount, $currency, $payment_id, $payment_method_id, $transactionId);

        $currencyOfMethod = PaymentMethodService::currencyOfPaymentMethodId($payment_method_id);

        $checkAddress = $this->cryptoProcessingService->checkUserDepositAddress($payment_method_id, $currencyOfMethod);

        $address = '';

        $amountInPaymentMethod = $this->cryptoZayaService->exchangeAmout($amount,$currencyOfMethod);

        $lastAmount = round(
            CommissionService::getCommission($payment_id, $amountInPaymentMethod),
            4
        );

        $deposit->last_amount = $lastAmount;
        $deposit->save();

        if ($checkAddress)
            $address = $checkAddress;
        else
        {
            $response = $this->cryptoZayaService->createCryptoZayaDeposit($lastAmount,$currencyOfMethod,$deposit->id,$deposit->user_id);

            if ($response)
                $address = $response['address'];

            $this->cryptoProcessingService->saveUserWallet($address, $payment_method_id, $currencyOfMethod);
        }

        return $this->paymentAnswerService->CryptoZayaPayInQRAnswer($address,$lastAmount,$currencyOfMethod);
    }

}
