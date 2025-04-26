<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class BadUserMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        if ($user && $user->hasRole('badUser')) {
            Auth::logout(); // выходим из сессии

            // очищаем сессию полностью, если нужно
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return redirect()->route('index')->with('error', 'Access denied');
        }

        return $next($request);
    }
}
