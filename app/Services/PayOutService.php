<?php

namespace App\Services;

use App\Http\Enums\DepositStatusEnum;
use App\Models\Payout;
use App\Models\User;
use App\Services\Payment\Acquiring\WintecaExcahngeService;
use App\Services\Payment\Acquiring\WintecaService;
use App\Services\Payment\AlphaPoService;
use App\Services\Payment\PaymentPayOutAnswerService;
use Illuminate\Support\Facades\Auth;

class PayOutService
{
    public $base_currency;
    public function __construct(WintecaService $wintecaService,
                                TransactionService $transactionService,
                                WintecaExcahngeService $excahngeService,
                                AlphaPoService $alphaPoService,
                                CryptoProcessingService $cryptoProcessingService,
                                PaymentPayOutAnswerService $paymentPayOutAnswerService,
                                DepositService $depositService,
    )
    {
        $this->wintecaService = $wintecaService;

        $this->transactionService = $transactionService;

        $this->excahngeService = $excahngeService;

        $this->alphaPoService = $alphaPoService;

        $this->cryptoProcessingService = $cryptoProcessingService;

        $this->paymentPayOutAnswerService = $paymentPayOutAnswerService;

        $this->depositService = $depositService;

        $this->base_currency = env('CURRENT_CURRENCY');
    }

    public function createPayOut($payment_id, $amount, $currency, $userId)
    {
        $payout = new Payout();

        $payout->user_id = $userId;

        $payout->payment_id = $payment_id;

        $payout->sum = $amount;

        $payout->currency =$currency;

        $payout->status = DepositStatusEnum::CREATED;

        $payout->save();

        $this->transactionService->creditWithdraw($userId,$amount,'Withdrow');

        return $payout;
    }


    public static function checkPayoutStatus(User $user, $amount, $currency, $payment_id)
    {
        $lastPayout = $user->payouts()->orderByDesc('id')->first();

        if (!isset($lastPayout) || $lastPayout->status === DepositStatusEnum::PAYED || $lastPayout->status === DepositStatusEnum::CANCELED)
        {
            return (new PayOutService())->createPayOut($payment_id,$amount, $currency, $user->id);
        }
        else
            return $lastPayout;
    }


    public function createWintecaPayOut($amount, $currency, $cardNumber, $paymentId)
    {
        $exchangeSum = $this->excahngeService->exchangePayOut($amount);

        $newAmount = PaymentAmountService::amountPayOutWithoutComission($paymentId,$exchangeSum);

        $payout = $this->createPayOut($paymentId, $amount, $currency, Auth::id());

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

            return $this->paymentPayOutAnswerService->wintecaSuccsess($invoice);
        }
        else
        {
            dd('312312312');
            $payout->status = DepositStatusEnum::CANCELED;

            $payout->save();

            $deposit = $this->depositService->createDeposit($amount,$currency,$paymentId);

            return $this->paymentPayOutAnswerService->wintecaError($invoice);
        }
    }


    public function createAlphaPoPayOut($amount,$currency,$cardNumber,$paymentId)
    {
        $payout = $this->createPayOut($paymentId, $amount, $this->base_currency, Auth::id());

        $sum = $this->alphaPoService->exchange($this->base_currency, $currency, $amount);

        if (isset($sum))
        {
            $response = $this->cryptoProcessingService->payOut($sum,$currency,$cardNumber);

            $this->alphaPoService->paymentLogsService->createLog($payout, json_encode($response));

            if (isset($response['success']) && $response['success'] === false) {
                return $this->AlphaPoPayoutBack($payout);
            }

            return $response;
        }
        else
            return $this->AlphaPoPayoutBack($payout);
    }


    protected function AlphaPoPayoutBack(Payout $payout)
    {
        $payout->delete();

        return false;
    }

}
