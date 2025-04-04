<?php

namespace App\Http\Filters;

use Illuminate\Database\Eloquent\Builder;

class BetCategoryFilter extends AbstractFilter
{
    public const NAME = 'name';
    public const MENU_STATUS ='menu_status';
    protected function getCallbacks(): array
    {
        return [
            self::NAME => [$this,'name'],
            self::MENU_STATUS => [$this,'menu_status'],
        ];
    }

    public function name(Builder $builder,$value)
    {
        $builder->where('name','like', "%{$value}%");
    }

    public function menu_status(Builder $builder,$value)
    {
        $builder->where('menu_status',$value);
    }
}
