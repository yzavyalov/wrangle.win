<?php

namespace App\Services\Payment;

use App\Models\PaymentsTrustCondition;

class PaymentFilterService
{
    public function paymentFilterData($userData, $paymentMethodId, $ftd = false)
    {
        $data = $userData;

        $data['method_id'] = $paymentMethodId;
        $data['number_deposits'] = $userData['number_deposits'] ?? null;
        $data['value_deposits'] = $userData['value_deposits'] ?? null;
        $data['number_withdraw'] = $userData['number_withdraw'] ?? null;
        $data['value_withdraw'] = $userData['value_withdraw'] ?? null;
        $data['registration_days'] = $userData['registration_days'] ?? null;
        $data['ftd'] = $ftd;
        $data['std'] = true;

        return $data;
    }


}
