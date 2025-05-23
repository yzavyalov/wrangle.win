<?php

namespace App\Services;

use App\Models\Deposit;
use App\Models\Payment;
use App\Models\Payment_log;

class PaymentLogsService
{
    public function createLog($deposit, string $response)
    {
        $log = $deposit->paymentLogs()->create(['payment_id' => $deposit->payment_id, 'response'=>$response]);

        return $log;
    }
}
