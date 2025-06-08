<?php

namespace App\Services\Payment;

use App\Http\Enums\PaymentCategoryEnum;
use App\Http\Enums\PaymentTypeEnum;
use App\Http\Filters\PaymentMethodFilter;
use App\Models\PaymentMethod;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use mysql_xdevapi\Collection;

class CascadeService
{
    public function checkUserPaymentsIn($type = null,)
    {
        $data = $this->usersData();

        $data['type'] = $type;
        $data['category'] = PaymentCategoryEnum::IN;
        $data['ftd'] = null;
        $data['ftd_limits'] = null;
        $data['std'] = null;
        $data['std_limits'] = null;
    }
    public function selectPayments(array $data, $category)
    {
        $filter = app()->make(PaymentMethodFilter::class, ['queryParams' => array_filter($data)]);

        $methods= PaymentMethod::filter($filter)
            ->where('category',$category)
            ->get();

        return $methods;
    }

    protected function usersData()
    {
        $user = Auth::user();

        $data = [];

        $data['number_deposits'] = $user->debitTransactions->count() ?? null;
        $data['value_deposits'] = $user->debitTransactions->sum('sum') ?? null;
        $data['number_withdraw'] = $user->payouts->count() ?? null;
        $data['value_withdraw'] = $user->payouts->sum('sum') ?? null;
        $data['registration_days'] = now()->diffInDays(Carbon::make($user->created_at));

        return $data;
    }


    protected function checkTrust()
    {
        $dataUser = $this->usersData();

        $dataRequest = [];

        $dataRequest['ftd'] = 1;

        $dataRequest['check_ftd_limit'] = true;

        if ($dataUser['number_deposits'] > 3 )
        {
            $dataRequest['std'] = 1;

            $dataRequest['check_std_limit'] = true;
        }

        $data = array_merge($dataUser, $dataRequest);

        return $data;
    }

    public function methods()
    {
        $data = $this->checkTrust();

        $methods = $this->selectPayments($data,PaymentCategoryEnum::IN);

        return $methods;
    }

    public function showMethod($id)
    {
        $data = $this->checkTrust();

        $data['id'] = $id;

        $method = $this->selectPayments($data,PaymentCategoryEnum::IN);

        return $method;
    }
}
