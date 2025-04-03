<?php

namespace App\Providers;

use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;
use SocialiteProviders\Manager\SocialiteWasCalled;

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
        Event::listen(SocialiteWasCalled::class, function (\SocialiteProviders\Manager\SocialiteWasCalled $event) {
            $event->extendSocialite('facebook', \SocialiteProviders\Facebook\Provider::class);
            $event->extendSocialite('telegram', \SocialiteProviders\Telegram\Provider::class);
        });
    }
}
