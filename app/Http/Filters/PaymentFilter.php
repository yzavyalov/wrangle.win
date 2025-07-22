<?php

namespace App\Http\Filters;

use Illuminate\Database\Eloquent\Builder;

class PaymentFilter extends AbstractFilter
{
    public const ID = 'id';
    public const METHOD_ID = 'method_id';
    public const TYPE = 'type';
    public const CATEGORY = 'category';
    public const FTD = 'ftd';
    public const FTD_LIMITS = 'ftd_limits';
    public const STD = 'std';
    public const STD_LIMITS = 'std_limits';
    public const NUMBER_DEPOSITS = 'number_deposits';
    public const VALUE_DEPOSITS = 'value_deposits';
    public const NUMBER_WITHDRAW = 'number_withdraw';
    public const VALUE_WITHDRAW='value_withdraw';
    public const REGISTRATION_DAYS = 'registration_days';
    public const CHECK_FTD_LIMIT = 'check_ftd_limit';
    public const CHECK_STD_LIMIT = 'check_std_limit';


    protected function getCallbacks(): array
    {
        return [
            self::ID => [$this, 'id'],
            self::METHOD_ID => [$this, 'method_id'],
            self::TYPE => [$this, 'type'],
            self::CATEGORY => [$this, 'category'],
            self::FTD => [$this, 'ftd'],
            self::FTD_LIMITS => [$this, 'ftd_limits'],
            self::STD => [$this, 'std'],
            self::STD_LIMITS => [$this, 'std_limits'],
            self::NUMBER_DEPOSITS => [$this, 'number_deposits'],
            self::VALUE_DEPOSITS => [$this, 'value_deposits'],
            self::NUMBER_WITHDRAW => [$this, 'number_withdraw'],
            self::VALUE_WITHDRAW => [$this, 'value_withdraw'],
            self::REGISTRATION_DAYS => [$this, 'registration_days'],
            self::CHECK_FTD_LIMIT => [$this, 'check_ftd_limit'],
            self::CHECK_STD_LIMIT => [$this, 'check_std_limit'],
        ];
    }

    public function id(Builder $builder, $value): void
    {
        $builder->where('id', $value);
    }

    public function method_id(Builder $builder, int $value): void
    {
        $builder->whereHas('methods',function ($query) use ($value){
            $query->where('payment_methods.id',$value);
        });
    }

    public function type(Builder $builder, $value): void
    {
        $builder->where('type', $value);
    }

    public function category(Builder $builder, $value): void
    {
        $builder->where('category', $value);
    }


    public function ftd(Builder $builder, $value): void
    {
        $builder->whereHas('methods', function ($query) use ($value)
        {
            $query->whereNotNull('payments_payments_methods_table.FTD');

            if ($value !== null) {
                $query->where('payments_payments_methods_table.FTD', $value);
            }
        });
    }


    public function ftd_limits(Builder $builder, $value): void
    {
        $builder->whereHas('methods', function ($query) use ($value) {
            $query->where(function ($q) use ($value) {
                $q->where('payments_payments_methods_table.FTD_limits', '>=', $value)
                    ->orWhereNull('payments_payments_methods_table.FTD_limits');
            });
        });
    }


    public function std(Builder $builder, $value):void
    {
        $builder->whereHas('methods', function ($query) use ($value) {
            $query->whereNotNull('payments_payments_methods_table.STD');

            if ($value !== null) {
                $query->where('payments_payments_methods_table.STD', $value);
            }
        });
    }


    public function std_limits(Builder $builder, $value): void
    {
        $builder->whereHas('methods', function ($query) use ($value) {
            $query->where(function ($q) use ($value) {
                $q->where('payments_payments_methods_table.STD_limits', '>=', $value)
                    ->orWhereNull('payments_payments_methods_table.STD_limits');
            });
        });
    }

    public function number_deposits(Builder $builder, $value): void
    {
        $builder->where(function (Builder $query) use ($value) {
            $query->whereHas('conditions', function (Builder $conditionQuery) use ($value) {
                $conditionQuery->where(function (Builder $subQuery) use ($value) {
                    $subQuery->where('number_deposits', '<=', $value)
                        ->orWhereNull('number_deposits');
                });
            })
                ->orWhereDoesntHave('conditions');
        });
    }


    public function value_deposits(Builder $builder, $value): void
    {
        $builder->where(function (Builder $query) use ($value) {
            $query->whereHas('conditions', function (Builder $subQuery) use ($value) {
                $subQuery->where(function (Builder $conditionQuery) use ($value) {
                    $conditionQuery->where('value_deposits', '<=', $value)
                        ->orWhereNull('value_deposits');
                });
            })->orWhereDoesntHave('conditions');
        });
    }

    public function number_withdraw(Builder $builder, $value): void
    {
        $builder->where(function (Builder $query) use ($value) {
                $query->whereHas('conditions', function (Builder $subQuery) use ($value) {
                    $subQuery->where(function (Builder $conditionQuery) use ($value) {
                        $conditionQuery->where('number_withdraw', '<=', $value)
                            ->orWhereNull('number_withdraw');
                    });
                })->orWhereDoesntHave('conditions');
            });
    }

    public function value_withdraw(Builder $builder, $value): void
    {
        $builder->where(function (Builder $query) use ($value) {
                $query->whereHas('conditions', function (Builder $subQuery) use ($value) {
                    $subQuery->where(function (Builder $conditionQuery) use ($value) {
                        $conditionQuery->where('value_withdraw', '<=', $value)
                            ->orWhereNull('value_withdraw');
                    });
                })->orWhereDoesntHave('conditions');
            });
    }

    public function registration_days(Builder $builder, $value): void
    {
        $builder->where(function (Builder $q) use ($value) {
                $q->whereHas('conditions', function (Builder $subQuery) use ($value) {
                    $subQuery->where(function (Builder $conditionQuery) use ($value) {
                        $conditionQuery->where('registration_days', '<=', $value)
                            ->orWhereNull('registration_days');
                    });
                })->orWhereDoesntHave('conditions');
            });
    }

//    public function check_ftd_limit(Builder $builder, $value = true): void
//    {
//        $builder->whereHas('methods', function ($query) {
//            $query->where(function ($q) {
//                $q->whereRaw('
//                (
//                    SELECT COALESCE(SUM(deposits.sum), 0)
//                    FROM deposits
//                    WHERE deposits.payment_id = payments.id
//                ) < `payments_payments_methods_table`.`FTD_limits`
//            ')
//                    ->orWhereNull('payments_payments_methods_table.FTD_limits');
//            });
//        });
//    }

    public function check_ftd_limit(Builder $builder, $value = true): void
    {
        $builder
            ->join('payments_payments_methods_table as ppm', 'payments.id', '=', 'ppm.payment_id')
            ->leftJoin('deposits', 'payments.id', '=', 'deposits.payment_id')
            ->select('payments.*')
            ->groupBy('payments.id', 'ppm.FTD_limits')
            ->havingRaw('COALESCE(SUM(deposits.sum), 0) < ppm.FTD_limits OR ppm.FTD_limits IS NULL');
    }



//    public function check_std_limit(Builder $builder, $value = true): void
//    {
//        $builder->whereHas('methods', function ($query) {
//            $query->where(function ($q) {
//                $q->whereRaw('
//                (
//                    SELECT COALESCE(SUM(deposits.sum), 0)
//                    FROM deposits
//                    WHERE deposits.payment_id = payments.id
//                ) < `payments_payments_methods_table`.`STD_limits`
//            ')
//                    ->orWhereNull('payments_payments_methods_table.STD_limits');
//            });
//        });
//    }

    public function check_std_limit(Builder $builder, $value = true): void
    {
        $builder
            ->join('payments_payments_methods_table as ppm', 'payments.id', '=', 'ppm.payment_id')
            ->leftJoin('deposits', 'payments.id', '=', 'deposits.payment_id')
            ->select('payments.*')
            ->groupBy('payments.id', 'ppm.STD_limits')
            ->havingRaw('COALESCE(SUM(deposits.sum), 0) < ppm.STD_limits OR ppm.STD_limits IS NULL');
    }



}
