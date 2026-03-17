<?php

namespace App\Services\Payment;

use App\Http\Enums\PaymentCategoryEnum;
use App\Http\Enums\TransactionStatusEnum;
use App\Http\Filters\PaymentFilter;
use App\Http\Filters\PaymentMethodFilter;
use App\Models\Payment;
use App\Models\PaymentMethod;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use mysql_xdevapi\Collection;

class CascadeService
{
    public function __construct(PaymentFilterService $filterService)
    {
        $this->paymnetFilterService = $filterService;
    }

    public function selectMethods(array $data, $category)
    {
        $filter = app()->make(PaymentMethodFilter::class, ['queryParams' => array_filter($data)]);

        $methods= PaymentMethod::filter($filter)
            ->where('category',$category)
            ->get();

        return $methods;
    }


    public function selectPayments(array $data, $category)
    {
        $filter = app()->make(PaymentFilter::class, ['queryParams' => array_filter($data)]);

        $payments= Payment::filter($filter)
            ->where('category',$category)
            ->get();

        return $payments;
    }

    public function usersData()
    {
        $user = Auth::user();

        $numberDeposits = $user->debitTransactions()->where('status',TransactionStatusEnum::PROCESSED->value)->count();

        $valueDeposits = $user->debitTransactions()->where('status',TransactionStatusEnum::PROCESSED->value)->sum('sum');

        $numberWithdraw = $user->payouts()->where('status',TransactionStatusEnum::PROCESSED->value)->count();

        $valueWithdraw = $user->payouts()->where('status',TransactionStatusEnum::PROCESSED->value)->sum('sum');

        return [
            'number_deposits' => $numberDeposits,
            'value_deposits' => $valueDeposits,
            'number_withdraw' => $numberWithdraw,
            'value_withdraw' => $valueWithdraw,
            'registration_days' => now()->diffInDays($user->created_at),
        ];
    }

    public function cascade(Collection $payments)
    {
        dd($payments);
    }

//    protected function checkTrust()
//    {
//        $dataUser = $this->usersData();
//
//        $dataRequest = [];
//
//        $dataRequest['ftd'] = 1;
//
//        $dataRequest['check_ftd_limit'] = true;
//
//        if ($dataUser['number_deposits'] > 3 )
//        {
//            $dataRequest['std'] = 1;
//
//            $dataRequest['check_std_limit'] = true;
//        }
//
//        $data = array_merge($dataUser, $dataRequest);
//
//        return $data;
//    }

    protected function checkTrust()
    {
        $dataUser = $this->usersData();

        $dataRequest = [];
        $dataRequest['ftd'] = 1;

        if ($dataUser['number_deposits'] > 3) {
            $dataRequest['std'] = 1;
        }

        return array_merge($dataUser, $dataRequest);
    }

    public function methods()
    {
        $data = $this->checkTrust();

        $methods = $this->selectMethods($data, PaymentCategoryEnum::IN->value);

        return $methods;
    }

    public function showMethod($id)
    {
        $data = $this->checkTrust();

        $data['id'] = $id;

        $method = $this->selectMethods($data,PaymentCategoryEnum::IN->value);

        return $method;
    }

    public function payoutsMethods()
    {
        $methods = PaymentMethod::query()->where('category',PaymentCategoryEnum::OUT->value)
                                ->whereHas('payments')->get();

        return $methods;
    }

    public function payoutShowMethod($id)
    {
        $method = PaymentMethod::query()->findOrFail($id);

        if ($method->category === PaymentCategoryEnum::OUT->value)
            return $method;
        else
            return false;
    }
}
