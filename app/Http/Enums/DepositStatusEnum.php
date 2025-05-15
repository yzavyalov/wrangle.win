<?php

namespace App\Http\Enums;

enum DepositStatusEnum:int
{
    case CREATED = 1;
    case PAYED = 2;
    case CANCELED = 3;


    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public function label(): string
    {
        return match ($this) {
            self::CREATED => 'Created',
            self::PAYED => 'Payed',
            self::CANCELED => 'Canceled',
        };
    }
}
