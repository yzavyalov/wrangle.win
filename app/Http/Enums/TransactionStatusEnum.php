<?php

namespace App\Http\Enums;

enum TransactionStatusEnum:int
{
    case CREATED = 1;
    case PROCESSED = 2;
    case CANCELED = 3;
    case DECLINE = 4;
    case WAITING = 5;
    case FAILED = 6;


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
            self::PROCESSED => 'Processed',
            self::CANCELED => 'Canceled',
            self::DECLINE => 'Decline',
            self::WAITING => 'Waiting',
            self::FAILED => 'Failed',
        };
    }
}
