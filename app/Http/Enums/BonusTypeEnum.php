<?php

namespace App\Http\Enums;

enum BonusTypeEnum: int
{
    case DISPOSABLE = 1;
    case MONTHLY = 2;
    case ANNUAL = 3;


    // Получение всех значений статусов
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    // Человеко-читаемые названия статусов
    public function label(): string
    {
        return match ($this) {
            self::DISPOSABLE => 'Disposable',
            self::MONTHLY => 'Monthly',
            self::ANNUAL => 'Annual',
        };
    }
}
