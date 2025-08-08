<?php

namespace App\Services\Payment\Acquiring;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class WintecaTokenService
{
    public static function createToken()
    {
        $tempToken = Str::uuid()->toString();

        Cache::put(
            'auth_token:' . $tempToken,    // ключ
            auth()->id(),                  // значение (user_id)
            now()->addMinutes(5)           // время жизни
        );

        return $tempToken;
    }

    public static function checkToken($token)
    {
        $cacheKey = 'auth_token:' . $token;
dd($cacheKey);
        // Получаем user_id, связанный с токеном
        $cachedUserId = Cache::get($cacheKey);

        // Проверяем, совпадает ли с текущим авторизованным пользователем
        return $cachedUserId === auth()->id();
    }



}
