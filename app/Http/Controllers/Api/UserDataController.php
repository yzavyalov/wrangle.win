<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;


class UserDataController extends Controller
{

    public function changeUserPassword(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'current_password' => ['nullable'], // базовое правило, позже переопределим условие
            'new_password' => [
                'required',
                Password::min(8)
                    ->mixedCase()
                    ->letters()
                    ->numbers()
                    ->symbols(),
            ],
        ]);

        $validator->sometimes('current_password', 'required|current_password', function () use ($user) {
            return !empty($user->password); // если у пользователя есть пароль в БД
        });

        $validator->validate();

        if (!empty($user->password)){
            if (!Hash::check($request->current_password, $user->password)) {
                return $this->errorJsonAnswer403('The current password is incorrect.');
            }
        }

        $user->update([
            'password' => Hash::make($request->new_password),
        ]);

        return $this->successJsonAnswer200('Password updated successfully.');
    }
}
