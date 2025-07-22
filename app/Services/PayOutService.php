<?php

namespace App\Services;

use App\Http\Enums\DepositStatusEnum;
use App\Models\Payment;
use App\Models\Payout;
use App\Models\User;
use App\Services\Payment\Acquiring\WintecaExcahngeService;
use App\Services\Payment\Acquiring\WintecaService;
use Illuminate\Support\Facades\Auth;

class PayOutService
{
    public function __construct(WintecaService $wintecaService,
                                TransactionService $transactionService,
                                WintecaExcahngeService $excahngeService,
    )
    {
        $this->wintecaService = $wintecaService;

        $this->transactionService = $transactionService;

        $this->excahngeService = $excahngeService;
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


    public function deletePayout(Payout $payout)
    {
        $payout->delete();
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


    public function payoutWintecaCreate($amount, $currency, $cardNumber, $paymentId)
    {
        $exchangeSum = $this->excahngeService->exchangePayOut($amount);

        $newAmount = PaymentAmountService::amountPayOutWithoutComission($paymentId,$exchangeSum);

        $payout = $this->createPayOut($paymentId, $amount, $currency, Auth::id());

        $invoice = $this->wintecaService->CreatePayOutInvoice($payout,$newAmount,$currency, $cardNumber);
dd($invoice);
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
