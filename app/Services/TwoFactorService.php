<?php

namespace App\Services;

use App\Mail\VerificationCodeEmail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;

class TwoFactorService
{
    public static function enter()
    {
        $user = Auth::user();

        $randomCode = self::codeGenerate();

//        Mail::to($user->email)->queue(new VerificationCodeEmail($randomCode));
        Mail::to($user->email)->send(new VerificationCodeEmail($randomCode));

        $cachename = 'code'.$user->id;

        Cache::put($cachename,$randomCode,600);

        return $cachename;
    }

    public static function codeGenerate($length = 6)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $code = '';

        for ($i = 0; $i < $length; $i++) {
            $code .= $characters[rand(0, strlen($characters) - 1)];
        }

        return $code;
    }


    public static function verify($inputCode)
    {
        $user = Auth::user();
        $cacheName = 'code' . $user->id;

        $cachedCode = Cache::get($cacheName);

        if ($cachedCode && $inputCode === $cachedCode) {
            // Удалим код после успешной проверки для безопасности
            Cache::forget($cacheName);
            return true;
        }

        return false;
    }
}
