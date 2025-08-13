<?php

namespace App\Providers;

use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;
use SocialiteProviders\Manager\SocialiteWasCalled;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;


use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Socialite провайдеры
        Event::listen(SocialiteWasCalled::class, function (\SocialiteProviders\Manager\SocialiteWasCalled $event) {
            $event->extendSocialite('facebook', \SocialiteProviders\Facebook\Provider::class);
            $event->extendSocialite('telegram', \SocialiteProviders\Telegram\Provider::class);
        });

        // Rate limiting для логина
        RateLimiter::for('login', function (Request $request) {
            $email = (string) $request->input('email');

            return [
                // Лимит по email+IP
                Limit::perMinute(5)->by(mb_strtolower($email).'|'.$request->ip()),
                // Доп. лимит по IP
                Limit::perMinute(20)->by('ip:'.$request->ip()),
            ];
        });

        // Rate limiting для регистрации
        RateLimiter::for('register', function (Request $request) {
            return [
                // 3 попытки в минуту с одного IP
                Limit::perMinute(3)->by('ip:'.$request->ip()),
            ];
        });

        // Bootstrap пагинация
        Paginator::useBootstrap();

        // Общие данные для Inertia
        Inertia::share([
            'auth' => function () {
                return [
                    'user' => Auth::user(),
                ];
            },
        ]);
    }
}
