<?php

namespace App\Http\Filters;

use Illuminate\Database\Eloquent\Builder;

class PaymentMethodFilter extends AbstractFilter
{
    public const ID = 'id';
    public const TYPE = 'type';
    public const CATEGORY = 'category';
    public const TITLE = 'title';
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
            self::TYPE => [$this, 'type'],
            self::CATEGORY => [$this, 'category'],
            self::TITLE => [$this, 'title'],
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

    public function id(Builder $builder, $value)
    {
        $builder->where('id', $value);
    }

    public function type(Builder $builder, $value)
    {
        $builder->where('type', $value);
    }

    public function category(Builder $builder, $value)
    {
        $builder->where('category', $value);
    }


    public function ftd(Builder $builder, $value)
    {
        $builder->whereHas('payments', function ($query) use ($value)
        {
            $query->whereNotNull('payments_payments_methods_table.FTD');

            if ($value !== null) {
                $query->where('payments_payments_methods_table.FTD', $value);
            }
        });
    }


    public function ftd_limits(Builder $builder, $value)
    {
        $builder->whereHas('payments', function ($query) use ($value) {
            $query->where(function ($q) use ($value) {
                $q->where('payments_payments_methods_table.FTD_limits', '>=', $value)
                    ->orWhereNull('payments_payments_methods_table.FTD_limits');
            });
        });
    }


    public function std(Builder $builder, $value)
    {
        $builder->whereHas('payments', function ($query) use ($value) {
            $query->whereNotNull('payments_payments_methods_table.STD');

            if ($value !== null) {
                $query->where('payments_payments_methods_table.STD', $value);
            }
        });
    }


    public function std_limits(Builder $builder, $value)
    {
        $builder->whereHas('payments', function ($query) use ($value) {
            $query->where(function ($q) use ($value) {
                $q->where('payments_payments_methods_table.STD_limits', '>=', $value)
                    ->orWhereNull('payments_payments_methods_table.STD_limits');
            });
        });
    }

    public function number_deposits(Builder $builder, $value)
    {
        $builder->whereHas('payments', function ($query) use ($value) {
            $query->where(function ($q) use ($value) {
                // 1. Payments с conditions, подходящими под условие
                $q->whereHas('conditions', function ($subQuery) use ($value) {
                    $subQuery->where(function ($conditionQuery) use ($value) {
                        $conditionQuery->where('number_deposits', '<=', $value)
                            ->orWhereNull('number_deposits');
                    });
                });

                // 2. ЛИБО payments вообще без conditions
                $q->orWhereDoesntHave('conditions');
            });
        });
    }


    public function value_deposits(Builder $builder, $value)
    {
        $builder->whereHas('payments', function ($query) use ($value) {

            $query->where(function ($q) use ($value) {
                // 1. Payments с conditions, подходящими под условие
                $q->whereHas('conditions', function ($subQuery) use ($value) {
                    $subQuery->where(function ($conditionQuery) use ($value) {
                        $conditionQuery->where('value_deposits', '<=', $value)
                            ->orWhereNull('value_deposits');
                    });
                });

                // 2. ЛИБО payments вообще без conditions
                $q->orWhereDoesntHave('conditions');
            });
        });
    }

    public function number_withdraw(Builder $builder, $value)
    {
        $builder->whereHas('payments', function ($query) use ($value) {
            $query->where(function ($q) use ($value) {
                // 1. Payments с conditions, подходящими под условие
                $q->whereHas('conditions', function ($subQuery) use ($value) {
                    $subQuery->where(function ($conditionQuery) use ($value) {
                        $conditionQuery->where('number_withdraw', '<=', $value)
                            ->orWhereNull('number_withdraw');
                    });
                });

                // 2. ЛИБО payments вообще без conditions
                $q->orWhereDoesntHave('conditions');
            });
        });
    }


    public function value_withdraw(Builder $builder, $value)
    {
        $builder->whereHas('payments', function ($query) use ($value)
        {
            $query->whereHas('conditions', function ($subQuery) use ($value) {
                    $subQuery->where(function ($conditionQuery) use ($value) {
                        $conditionQuery->where('value_withdraw', '<=', $value)
                            ->orWhereNull('value_withdraw');
                    });
                });

                // 2. ЛИБО payments вообще без conditions
            $query->orWhereDoesntHave('conditions');
        });
    }


    public function registration_days(Builder $builder, $value)
    {
        $builder->whereHas('payments', function ($query) use ($value)
        {
            $query->whereHas('conditions', function ($subQuery) use ($value)
                {
                    $subQuery->where(function ($conditionQuery) use ($value)
                    {
                        $conditionQuery->where('registration_days', '<=', $value)
                            ->orWhereNull('registration_days');
                    });
                });

                // 2. ЛИБО payments вообще без conditions
            $query->orWhereDoesntHave('conditions');
        });
    }

    public function check_ftd_limit(Builder $builder, $value = true)
    {
        $builder->whereHas('payments', function ($query) {
            $query->where(function ($q) {
                $q->whereRaw('
                (
                    SELECT COALESCE(SUM(deposits.sum), 0)
                    FROM deposits
                    WHERE deposits.payment_id = payments.id
                ) < payments_payments_methods_table.FTD_limits
            ')
                    ->orWhereNull('payments_payments_methods_table.FTD_limits');
            });
        });
    }

    public function check_std_limit(Builder $builder, $value = true)
    {
        $builder->whereHas('payments', function ($query) {
            $query->where(function ($q) {
                $q->whereRaw('
                (
                    SELECT COALESCE(SUM(deposits.sum), 0)
                    FROM deposits
                    WHERE deposits.payment_id = payments.id
                ) < payments_payments_methods_table.STD_limits
            ')
                    ->orWhereNull('payments_payments_methods_table.STD_limits');
            });
        });
    }

}
