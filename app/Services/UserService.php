<?php

namespace App\Services;

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
}
