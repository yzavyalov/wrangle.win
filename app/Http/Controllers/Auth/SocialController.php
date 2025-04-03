<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Auth\SocialAccount;
use App\Models\User;
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

            Auth::login($user);
        }
        else
        {
            $user = User::where('email',$socialUser->getEmail())->first();

            if (!$user)
            {
                if ($provider == 'telegram')
                    $email = $socialUser->getName().'@telegram.com' ?? $socialUser->getNickname().'@telegram.com';
                else
                    $email = $socialUser->getEmail();

                $user = User::create([
                    'name' => $socialUser->getName() ?? $socialUser->getNickname(),
                    'email' => $email,
                    'password' => bcrypt(Str::random(8)),
                ]);

                $user->socialAccounts()->create([
                    'provider_name' => $provider,
                    'provider_id' => $socialUser->getId(),
                ]);
            }
            Auth::login($user);

        }

        return $this->successJsonAnswer204('You are logged in!');
    }
}
