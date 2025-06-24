<?php

namespace App\Services;

use App\Models\Winteca_transaction;

class WintecaTransactionService
{
    public function updateWintecaTransaction($data)
    {
//        dd($data);
        $wintecaTransaction = Winteca_transaction::query()->where('id_winteca',$data['data']['id'])->first();

        $wintecaTransaction->status = $data['data']['attributes']['status'];
        $wintecaTransaction->resolution = $data['data']['attributes']['resolution'];
        $wintecaTransaction->amount = $data['data']['attributes']['amount'];
        $wintecaTransaction->payment_amount = $data['data']['attributes']['payment_amount'] ?? $data['data']['attributes']['payout_amount'];
        $wintecaTransaction->deposit = $data['data']['attributes']['deposit'] ?? $data['data']['attributes']['service_amount'];
        $wintecaTransaction->currency = $data['data']['attributes']['currency'];
        $wintecaTransaction->fee = $data['data']['attributes']['fee'];

        $wintecaTransaction->save();

        return $wintecaTransaction;
    }

}
