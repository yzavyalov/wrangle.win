<?php

namespace App\Services\Payment\Acquiring;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class WintecaTokenService
{
    public static function createToken()
    {
        $tempToken = Str::uuid();

        Cache::put(
            'auth_token:' . $tempToken,    // ключ
            auth()->id(),                  // значение (user_id)
            now()->addMinutes(5)           // время жизни
        );

        return $tempToken;
    }
}
