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
    public const VALUE_WITHDRAW = 'value_withdraw';
    public const REGISTRATION_DAYS = 'registration_days';
    public const CHECK_FTD_LIMIT = 'check_ftd_limit';
    public const CHECK_STD_LIMIT = 'check_std_limit';

    private const PIVOT = 'payments_payments_methods_table';

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

    public function id(Builder $builder, $value): void
    {
        $builder->where('id', $value);
    }

    public function type(Builder $builder, $value): void
    {
        $builder->where('type', $value);
    }

    public function category(Builder $builder, $value): void
    {
        $builder->where('category', $value);
    }

    protected function wherePayments(Builder $builder, callable $callback): void
    {
        $builder->whereHas('payments', $callback);
    }

    protected function applyPivotFlag(Builder $builder, string $field, $value): void
    {
        $this->wherePayments($builder, function ($query) use ($field, $value) {
            $query->whereNotNull(self::PIVOT . '.' . $field);

            if ($value !== null) {
                $query->where(self::PIVOT . '.' . $field, $value);
            }
        });
    }

    protected function applyPivotLimit(Builder $builder, string $field, $value): void
    {
        $this->wherePayments($builder, function ($query) use ($field, $value) {
            $query->where(function ($q) use ($field, $value) {
                $q->where(self::PIVOT . '.' . $field, '>=', $value)
                    ->orWhereNull(self::PIVOT . '.' . $field);
            });
        });
    }

    protected function applyConditionLimit(Builder $builder, string $field, $value): void
    {
        $this->wherePayments($builder, function ($query) use ($field, $value) {
            $query->where(function ($q) use ($field, $value) {
                $q->whereHas('conditions', function ($subQuery) use ($field, $value) {
                    $subQuery->where(function ($conditionQuery) use ($field, $value) {
                        $conditionQuery->where($field, '<=', $value)
                            ->orWhereNull($field);
                    });
                })->orWhereDoesntHave('conditions');
            });
        });
    }

    public function ftd(Builder $builder, $value): void
    {
        $this->applyPivotFlag($builder, 'FTD', $value);
    }

    public function std(Builder $builder, $value): void
    {
        $this->applyPivotFlag($builder, 'STD', $value);
    }

    public function ftd_limits(Builder $builder, $value): void
    {
        $this->applyPivotLimit($builder, 'FTD_limits', $value);
    }

    public function std_limits(Builder $builder, $value): void
    {
        $this->applyPivotLimit($builder, 'STD_limits', $value);
    }

    public function number_deposits(Builder $builder, $value): void
    {
        $this->applyConditionLimit($builder, 'number_deposits', $value);
    }

    public function value_deposits(Builder $builder, $value): void
    {
        $this->applyConditionLimit($builder, 'value_deposits', $value);
    }

    public function number_withdraw(Builder $builder, $value): void
    {
        $this->applyConditionLimit($builder, 'number_withdraw', $value);
    }

    public function value_withdraw(Builder $builder, $value): void
    {
        $this->applyConditionLimit($builder, 'value_withdraw', $value);
    }

    public function registration_days(Builder $builder, $value): void
    {
        $this->applyConditionLimit($builder, 'registration_days', $value);
    }

    public function check_ftd_limit(Builder $builder, $value = true): void
    {
        $this->wherePayments($builder, function ($query) {
            $query->where(function ($q) {
                $q->whereRaw('
                    (
                        SELECT COALESCE(SUM(deposits.sum), 0)
                        FROM deposits
                        WHERE deposits.payment_id = payments.id
                    ) < ' . self::PIVOT . '.FTD_limits
                ')->orWhereNull(self::PIVOT . '.FTD_limits');
            });
        });
    }

    public function check_std_limit(Builder $builder, $value = true): void
    {
        $this->wherePayments($builder, function ($query) {
            $query->where(function ($q) {
                $q->whereRaw('
                    (
                        SELECT COALESCE(SUM(deposits.sum), 0)
                        FROM deposits
                        WHERE deposits.payment_id = payments.id
                    ) < ' . self::PIVOT . '.STD_limits
                ')->orWhereNull(self::PIVOT . '.STD_limits');
            });
        });
    }
}
