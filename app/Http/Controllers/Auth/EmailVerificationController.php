<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Bonus;
use App\Models\User;
use App\Services\BonusServices;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Verified;

class EmailVerificationController extends Controller
{
    public function __construct(BonusServices $bonusServices)
    {
        $this->bonusServices = $bonusServices;
    }
    public function verify(Request $request, $id, $hash)
    {
        $user = User::findOrFail($id);

        if (! hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
            abort(403, 'Invalid verification link.');
        }

        if (! $user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
            event(new Verified($user));
        }

        // Авторизуем пользователя
        auth()->login($user);

        // Создаем Sanctum токен
        $token = $user->createToken('email-verify')->plainTextToken;

        //Начисляем бонус при регистрации
        $bonus = Bonus::query()->where('title','registration bonus')->first();

        $this->bonusServices->addBonus($bonus);

        return redirect()->route('index');
    }
}
