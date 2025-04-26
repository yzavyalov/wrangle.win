<?php

namespace App\Http\Enums;

enum PaymentCategoryEnum:int
{
    case IN = 1;
    case OUT = 2;


    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    // Человеко-читаемые названия статусов
    public function label(): string
    {
        return match ($this) {
            self::IN => 'In',
            self::OUT => 'Out',
        };
    }
}
