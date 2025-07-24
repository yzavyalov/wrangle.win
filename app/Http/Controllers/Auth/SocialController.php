<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\AuthResource;
use App\Models\Auth\SocialAccount;
use App\Models\User;
use App\Services\BalanceService;
use App\Services\CheckUserService;
use App\Traits\JsonResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialController extends Controller
{
    public function redirect($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    public function callback($provider)
    {
        $socialUser = Socialite::driver($provider)->user();

        $socialAccount = SocialAccount::where('provider_name',$provider)
            ->where('provider_id',$socialUser->getId())
            ->first();

        if ($socialAccount)
        {
            $user = $socialAccount->user;

//            return $this->successJsonAnswer200('User',AuthResource::make($user));
            Auth::login($user);

            return redirect()->route('profile');
        }
        else
        {
            $user = User::where('email',$socialUser->getEmail())->first();

            if (!$user)
            {
                if ($provider == 'telegram')
                    $email = ($socialUser->getName() ?: $socialUser->getNickname()) . '@telegram.com';
                else
                    $email = $socialUser->getEmail();

                $check = CheckUserService::iafsCheck($email);

                if ($check === true )
                {
                    return $this->errorJsonAnswer403('Sorry but we can\'t register you!');
                }
                else
                {
                    $user = User::create([
                        'name' => $socialUser->getName() ?? $socialUser->getNickname(),
                        'email' => $email,
                        'password' => bcrypt(Str::random(8)),
                    ]);

                    $user->socialAccounts()->create([
                        'provider_name' => $provider,
                        'provider_id' => $socialUser->getId(),
                    ]);

//                    return $this->successJsonAnswer200('User',AuthResource::make($user));
                    Auth::login($user);

                    return redirect()->route('profile');
                }
            }
            else
            {
                Auth::login($user);
                session(['user' => $user]);
                return redirect()->route('profile');
//                return $this->successJsonAnswer200('User',AuthResource::make($user));
            }
        }

        return $this->successJsonAnswer204('You are logged in!');
    }
}
