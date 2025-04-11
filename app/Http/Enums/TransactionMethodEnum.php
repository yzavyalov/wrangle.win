<?php

namespace App\Enum;

enum TransactionMethodEnum:int
{
    case TEST = 1;
    case CARD = 2;
    case OPENBANKING = 3;
    case CRYPTO = 4;
    case BIT = 5;


    // Получение всех значений статусов
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    // Человеко-читаемые названия статусов
    public function label(): string
    {
        return match ($this) {
            self::TEST => 'Test',
            self::CARD => 'Card',
            self::OPENBANKING => 'Openbanking',
            self::CRYPTO => 'Crypto',
            self::BIT => 'Bit',
        };
    }
}
