<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Str;

class PasswordResetController extends Controller
{
    // Отправка ссылки на email
    public function sendResetLinkEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink($request->only('email'));

        return $status === Password::RESET_LINK_SENT
            ? $this->successJsonAnswer204('Reset link sent.')
            : $this->errorJsonAnswer400('Unable to send reset link.');
    }


    // Сброс пароля
    public function reset(Request $request)
    {
        $request->validate([
            'token'    => 'required',
            'email'    => 'required|email',
            'password' => ['required', 'confirmed', Password::min(8)
                ->mixedCase()     // минимум одна заглавная и одна строчная буква
                ->letters()       // хотя бы одна буква
                ->numbers()       // хотя бы одна цифра
                ->symbols()       // хотя бы один символ
                ->uncompromised() // не был скомпрометирован (проверка через HaveIBeenPwned API)
            ],
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($user));
            }
        );

        return $status === Password::PASSWORD_RESET
            ? $this->successJsonAnswer204('Password reset successfully.')
            : $this->errorJsonAnswer400(__($status));
    }
}
