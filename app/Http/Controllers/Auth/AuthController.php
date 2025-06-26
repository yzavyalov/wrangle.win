<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\AuthResource;
use App\Http\Resources\UserResource;
use App\Services\CheckUserService;
use App\Services\UserService;
use App\Traits\JsonResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    use JsonResponseTrait;
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }


    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        // Проверка: существует ли пользователь и правильный ли пароль
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // Проверка: подтверждён ли email
        if (! $user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Please verify your email before logging in.'], 403);
        }

        // Авторизация пользователя
        auth()->login($user);

        // Сохраняем в сессию (если используется)
        $this->userService->putInSession($user);

        // Возвращаем ответ с данными пользователя
        return $this->successJsonAnswer200('User', UserResource::make($user));
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        // Auth::logout();
        Auth::guard('web')->logout(); // ← критично
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message' => 'Logged out']);
    }

    public function me(Request $request)
    {
        if (!auth()->check()) {
            abort(401, 'Unauthorized');
        }

        return $this->successJsonAnswer200('You data', UserResource::make($request->user()));
    }


    public function register(Request $request)
    {
        // Валидация входных данных
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Password::min(8)->letters()->numbers()->symbols()],
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $email = $request->email;

        $check = CheckUserService::iafsCheck($email);

        if ($check === false)
        {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            // Отправка письма с подтверждением
            $user->sendEmailVerificationNotification();

            return $this->successJsonAnswer200('Registration successful. Please check your email to verify your account.');
        }
        else {
            return $this->errorJsonAnswer403('Sorry but we can\'t register you, try again later!');
        }
    }
}

