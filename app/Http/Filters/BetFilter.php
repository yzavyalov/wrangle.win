<?php

namespace App\Http\Filters;

use Illuminate\Database\Eloquent\Builder;

class BetFilter extends AbstractFilter
{
    public const ID = 'id';
    public const USER_ID = 'user_id';
    public const TITLE = 'title';
    public const STATUS = 'status';
    public const DESCRIPTION = 'description';
    public const FINISH = 'finish';
    public const CATEGORIES = 'categories';
    public const SORT_BY = 'sort_by'; // Поле для сортировки
    public const SORT_ORDER = 'sort_order'; // Направление сортировки

    protected function getCallbacks(): array
    {
        return [
            self::ID => [$this, 'id'],
            self::USER_ID => [$this, 'user_id'],
            self::TITLE => [$this, 'title'],
            self::STATUS => [$this, 'status'],
            self::DESCRIPTION => [$this, 'description'],
            self::FINISH => [$this, 'finish'],
            self::CATEGORIES => [$this, 'categories'],
            self::SORT_BY => [$this, 'sortBy'],
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

    public function title(Builder $builder, $value)
    {
        $builder->where(function ($query) use ($value) {
            $query->where('title', 'like', "%{$value}%")
                ->orWhere('description', 'like', "%{$value}%");
        });
    }

    public function categories(Builder $builder, $value)
    {
        $builder->whereHas('categories', function ($query) use ($value) {
            $query->whereIn('bet_categories.id', (array) $value);
        });
    }

    public function sortBy(Builder $builder, $value)
    {
        $allowedSortFields = ['finish', 'title', 'budget']; // Добавили 'budget'
        $sortOrder = request()->get('sort_order', 'asc'); // По умолчанию 'asc'

        if (in_array($value, $allowedSortFields)) {
            if ($value === 'budget') {
                // Используем подзапрос, который вычисляет сумму ставок (bits.sum)
                $builder->selectRaw('bets.*, (SELECT SUM(bits.sum) FROM bits WHERE bits.bet_id = bets.id) as budget')
                    ->orderByRaw("budget {$sortOrder}");
            } else {
                // Обычная сортировка по колонкам
                $builder->orderBy($value, $sortOrder);
            }
        }
    }

}
