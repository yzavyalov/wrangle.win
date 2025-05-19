<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\AuthResource;
use App\Http\Resources\UserResource;
use App\Services\BalanceService;
use App\Services\CheckUserService;
use App\Services\UserService;
use App\Traits\JsonResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;

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

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

//        $token = $user->createToken('auth-token')->plainTextToken;
        auth()->login($user);

        $this->userService->putInSession($user);

        return $this->successJsonAnswer200('user', UserResource::make($user));
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
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
            'password' => ['required', 'confirmed', Password::min(8)
//        ->mixedCase()     // минимум одна заглавная и одна строчная буква
        ->letters()       // хотя бы одна буква
        ->numbers()       // хотя бы одна цифра
        ->symbols()       // хотя бы один символ
//        ->uncompromised() // не был скомпрометирован (проверка через HaveIBeenPwned API)
    ],
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $email = $request->email;

        $check = CheckUserService::iafsCheck($email);

        if ($check === false)
        {
            // Создание пользователя
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            auth()->login($user);

            $this->userService->putInSession($user);

            return $this->successJsonAnswer200('User',AuthResource::make($user));
        }
        else
            return $this->errorJsonAnswer403('Sorry but we can\'t register you, try again later!');
    }
}

