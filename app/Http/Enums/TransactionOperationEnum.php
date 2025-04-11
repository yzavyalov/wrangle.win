<?php

namespace App\Enum;

enum TransactionOperationEnum: int
{
    case DEBET = 1;
    case CREDIT = 2;
    case CANCELED = 3;


    // Получение всех значений статусов
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    // Человеко-читаемые названия статусов
    public function label(): string
    {
        return match ($this) {
            self::DEBET => 'Debet',
            self::CREDIT => 'Credit',
            self::CANCELED => 'Canceled',
        };
    }
}
