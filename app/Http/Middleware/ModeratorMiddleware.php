<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ModeratorMiddleware
{
    public function handle(Request $request, Closure $next)
    {

        if (Auth::check() && Auth::user()->hasRole('admin')) {
            return $next($request);
        }

        return redirect()->route('admin.login');
    }
}


