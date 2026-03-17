<?php

namespace App\Services\Payment;

use App\Services\TransactionService;

class WithdrawService
{
    public function __construct(TransactionService $transactionService)
    {
        $this->transactionService = $transactionService;
    }


}
