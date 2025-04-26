<?php

namespace App\Http\Enums;

enum BetStatusEnum: int
{
    case CREATED = 1;
    case PAID = 2;
    case APPROVED = 3;
    case CANCELED = 4;
    case FINISHED = 5;

    // Получение всех значений статусов
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    // Человеко-читаемые названия статусов
    public function label(): string
    {
        return match ($this) {
            self::CREATED => 'Created',
            self::PAID => 'Paid',
            self::APPROVED => 'Approved',
            self::CANCELED => 'Canceled',
            self::FINISHED => 'Finished',
        };
    }
}
