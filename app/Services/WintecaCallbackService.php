<?php

namespace App\Services;

use App\Http\Enums\DepositStatusEnum;
use App\Http\Enums\TransactionMethodEnum;
use App\Http\Enums\TransactionStatusEnum;
use App\Models\Deposit;
use App\Models\Winteca_transaction;
use Illuminate\Support\Facades\Response;

class WintecaCallbackService
{
    public function __construct(WintecaTransactionService $wintransactionService,
                                TransactionService $transactionService)
    {
        $this->wintransactionService = $wintransactionService;

        $this->transactionService = $transactionService;
    }
    public function wintecaCallBack($data)
    {
        if ($data['data']['type'] === 'payment-invoices')
            return $this->payIn($data);
        else
            return $this->payOut($data);
    }


    protected function selectStatusFromWintecaPayIn(string $wintecaStatus): string
    {
        $statusMap = [
            'created' => DepositStatusEnum::CREATED,
            'expired' => DepositStatusEnum::CANCELED,
            'process_pending' => DepositStatusEnum::CREATED,
            'processed' => DepositStatusEnum::PAYED,
            'process_failed' => DepositStatusEnum::CANCELED,
            'refund_pending' => DepositStatusEnum::CANCELED,
            'partially_refunded' => DepositStatusEnum::CANCELED,
            'refunded' => DepositStatusEnum::CANCELED,
            'refund_failed' => DepositStatusEnum::PAYED,
            'charged_back' => DepositStatusEnum::CANCELED,
            'partially_charged_back' => DepositStatusEnum::CANCELED,
        ];

        return $statusMap[$wintecaStatus] ?? DepositStatusEnum::CREATED;
    }

    protected function payIn($data)
    {
        $reference_id = $data['data']['attributes']['reference_id'];

        $deposit = Deposit::query()->find($reference_id);

        if (!$deposit)
        {
            return Response::json(['error' => 'We did not find such a transaction in our database.'], 404);
        }


        $wintecaStatus = $data['data']['attributes']['status'];

        $amount = $data['data']['attributes']['deposit'];

        $deposit->status = $this->selectStatusFromWintecaPayIn($wintecaStatus);

        $deposit->sum = $amount;

        $deposit->save();

        $this->wintransactionService->updateWintecaTransaction($data);

        if ($deposit->status === DepositStatusEnum::PAYED->value)
            $this->transactionService->debit($deposit->user_id, $deposit->sum, 'Top up with a bank card', $method = TransactionMethodEnum::CARD);

        return response()->json(['success' => 'Ok'],200);
    }


    protected function selectStatusFromWintecaPayOut(string $wintecaStatus): string
    {
        $statusMap = [
            'created' => DepositStatusEnum::CREATED->value,
            'terminated' => DepositStatusEnum::CANCELED->value,
            'expired' => DepositStatusEnum::CANCELED->value,
            'process_pending' => DepositStatusEnum::CREATED->value,
            'processed' => DepositStatusEnum::PAYED->value,
            'partially_processed' => DepositStatusEnum::PAYED->value,
            'canceled' => DepositStatusEnum::CANCELED->value,
            'partially_canceled' => DepositStatusEnum::PAYED->value,
            'process_failed' => DepositStatusEnum::CANCELED->value,
        ];

        return $statusMap[$wintecaStatus] ?? DepositStatusEnum::CREATED->value;
    }


    protected function payOut($data)
    {
        $wintecaTransaction = Winteca_transaction::query()->where('id_winteca',$data['data']['id'])->first();

        if (!$wintecaTransaction)
            return Response::json(['error' => 'We did not find such a transaction in our database.'], 404);

        $wintecaTransaction = $this->wintransactionService->updateWintecaTransaction($data);

        $payout = $wintecaTransaction->transactionable;

        $payout->status = $this->selectStatusFromWintecaPayOut($data['data']['attributes']['status']);

        $payout->sum = $data['data']['attributes']['service_amount'];

        $payout->save();

        if ($payout->status === DepositStatusEnum::CANCELED->value)
            $this->transactionService->debit($payout->user_id,$payout->sum,'Your money could not be withdrawn. Bank refusal.',TransactionMethodEnum::CARD);

        return response()->json(['success' => 'Ok'],200);
    }
}
