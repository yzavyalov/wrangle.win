<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
        'scheme' => 'https',
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'google' => [
        'client_id' => env('GOOGLE_CLIENT_ID', 'http://localhost:8000/auth/google/callback'),
        'client_secret' => env('GOOGLE_CLIENT_SECRET'),
        'redirect' => env('GOOGLE_REDIRECT_URI'),
    ],

    'facebook' => [
        'client_id' => env('FACEBOOK_CLIENT_ID'),
        'client_secret' => env('FACEBOOK_CLIENT_SECRET'),
        'redirect' => env('FACEBOOK_REDIRECT_URI')
    ],

    'telegram' => [
        'bot' => env('TELEGRAM_BOT_NAME'),  // The bot's username
        'client_id' => null,
        'client_secret' => env('TELEGRAM_TOKEN'),
        'redirect' => env('TELEGRAM_REDIRECT_URI'),
    ],

    'winteca' => [
        'base_url' => 'https://api.winteca.com',
        'api_account' => env('WINTECA_API_ACCOUNT_ID'),
        'api_key' => env('WINTECA_API_KEY'),
        'api_secret' => env('WINTECA_PRIVAT_KEY'),
        'public_key' => env('WINTECA_PUBLIC_KEY'),
        'privat_key' => env('WINTECA_PRIVAT_KEY'),

        'api_account_www_pay_out' => env('WINTECA_API_ACCOUNT_ID_WWN_PAY_OUT'),
        'api_key_www_pay_out' => env('WINTECA_API_KEY_WWN_PAY_OUT'),
        'public_key_www_pay_out' => env('WINTECA_PUBLIC_KEY_WWN_PAY_OUT'),
        'privat_key_www_pay_out' => env('WINTECA_PRIVAT_KEY_WWN_PAY_OUT'),
    ],

];
