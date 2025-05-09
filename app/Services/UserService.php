<?php

namespace App\Services;

use App\Http\Resources\BalanceResource;
use App\Models\User;

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

}
