<?php

namespace App\Http\Enums;

use App\Contracts\PaymentDepositInterface;
use App\Services\Payment\AcquiringHandler;
use App\Services\Payment\CryptoPaymentHandler;
use App\Services\Payment\LocalHandler;
use App\Services\Payment\OpenBankHandler;
use App\Services\Payment\P2PHandler;

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


    public function handler(): PaymentDepositInterface
    {
        return match ($this) {
            self::ACQUIRING => app(AcquiringHandler::class),
            self::OPENBANK => app(OpenBankHandler::class),
            self::CRYPTO => app(CryptoPaymentHandler::class),
            self::P2P => app(P2PHandler::class),
            self::LOCAL => app(LocalHandler::class),
        };
    }
}
