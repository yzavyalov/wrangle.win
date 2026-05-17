<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CountryIpMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $ip = $request->ip();

        /**
         * Для Cloudflare:
         * $ip = $request->header('CF-Connecting-IP', $request->ip());
         */

        // Получаем страну через ip-api
        $response = @file_get_contents("http://ip-api.com/json/{$ip}");

        if ($response) {
            $data = json_decode($response, true);

            // GB = United Kingdom
            $blockedCountries = ['GB'];

            if (
                isset($data['countryCode']) &&
                in_array($data['countryCode'], $blockedCountries)
            ) {
                abort(404);
            }
        }

        return $next($request);
    }
}
