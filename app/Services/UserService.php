<?php

namespace App\Services;

use App\Http\Resources\BalanceResource;
use App\Models\User;
use Illuminate\Support\Str;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Http\Request;

class UserService
{
    public function block(User $user)
    {
        $user->removeRole('user');

        $user->assignRole('badUser');
    }


    public function unblock(User $user)
    {
        $user->removeRole('badUser');

        $user->assignRole('user');
    }

    public function putInSession(User $user)
    {
        session()->put([
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'balance' => $user->balance?->balance ?? 0,
            ]
        ]);
    }


    public function getUserEmail(User $user)
    {
        if (!$user->email) {
            return null;
        }

        if (str_ends_with($user->email, '@telegram.com')) {
            return null;
        }

        return $user->email;
    }


    public function createTwoFactorCode(User $user)
    {
        $user->two_factor_code = strtoupper(Str::random(6));
    }

    public function checkCode(User $user, $code)
    {
        if ($user->two_factor_code && $user->two_factor_code==$code)
        {
            return true;
        }
        else
            return false;
    }


    public function getUserFromToken(Request $request)
    {
        $token = $request->bearerToken();

        if (!$token) {
            return null;
        }

        // Ищем токен в таблице `personal_access_tokens`
        $accessToken = PersonalAccessToken::findToken($token);

        if (!$accessToken) {
            return null;
        }

        return $accessToken->tokenable; // Вернёт User модель
    }
}
