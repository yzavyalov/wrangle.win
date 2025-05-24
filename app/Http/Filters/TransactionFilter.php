<?php

namespace App\Http\Filters;

use Illuminate\Database\Eloquent\Builder;

class TransactionFilter extends AbstractFilter
{
    public const ID = 'id';
    public const USER_ID = 'user_id';
    public const EMAIL = 'email';
    public const OPERATION = 'operation';
    public const STATUS = 'status';
    public const METHOD = 'method';
    public const COMMENT = 'comment';
    public const CREATED_AT = 'created_at';


    protected function getCallbacks(): array
    {
        return [
            self::ID => [$this, 'id'],
            self::USER_ID => [$this, 'user_id'],
            self::EMAIL => [$this, 'email'],
            self::OPERATION => [$this, 'operation'],
            self::STATUS => [$this, 'status'],
            self::METHOD => [$this, 'method'],
            self::COMMENT => [$this, 'comment'],
            self::CREATED_AT => [$this, 'created_at'],
        ];
    }

    public function id(Builder $builder, $value)
    {
        $builder->where('id', $value);
    }

    public function user_id(Builder $builder, $value)
    {
        $builder->where('user_id', $value);
    }

    public function email(Builder $builder, $value)
    {
        $builder->whereHas('user', function ($query) use ($value) {
            $query->where('email', 'like', "%$value%");
        });
    }

    public function operation(Builder $builder, $value)
    {
        $builder->where('operation',$value);
    }

    public function status(Builder $builder, $value)
    {
        $builder->where('status',$value);
    }

    public function method(Builder $builder, $value)
    {
        $builder->where('method',$value);
    }


    public function comment(Builder $builder, $value)
    {
        $builder->where('comment','like',"%$value%");
    }

    public function created_at(Builder $builder, $value)
    {
        $builder->where('created_at',$value);
    }

}
