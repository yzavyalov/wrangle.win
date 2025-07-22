<?php

namespace App\Services\Payment;

use App\Models\PaymentsTrustCondition;

class PaymentFilterService
{
    public function paymentFilterData($userData, $paymentMethodId, $ftd = false)
    {
        $data = $userData;

        $data['method_id'] = $paymentMethodId;
        $data['number_deposits'] = $userData['number_deposits'];
        $data['value_deposits'] = $userData['value_deposits'];
        $data['number_withdraw'] = $userData['number_withdraw'];
        $data['value_withdraw'] = $userData['value_withdraw'];
        $data['registration_days'] = $userData['registration_days'];
        $data['ftd'] = $ftd;
        $data['std'] = true;

        return $data;
    }


}
