<?php

namespace App\Http\Enums;

enum PaymentTypeEnum: int
{
    case ACQUIRING = 1;
    case OPENBANK = 2;
    case CRYPTO = 3;
    case P2P = 4;
    case LOCAL = 5;

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    // Человеко-читаемые названия статусов
    public function label(): string
    {
        return match ($this) {
            self::ACQUIRING => 'Acquiring',
            self::OPENBANK => 'Openbank',
            self::CRYPTO => 'Crypto',
            self::P2P => 'p2p',
            self::LOCAL => 'Local',
        };
    }
}
