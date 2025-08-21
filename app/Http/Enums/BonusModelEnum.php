<?php

namespace App\Http\Enums;

enum BonusModelEnum: int
{
    case MONEY = 1;
    case PERCENT = 2;


    // Получение всех значений статусов
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    // Человеко-читаемые названия статусов
    public function label(): string
    {
        return match ($this) {
            self::MONEY => 'Disposable',
            self::PERCENT => 'Monthly',
        };
    }
}
