<?php

namespace App\Http\Middleware;

use App\Services\TwoFactorAdminService;
use Closure;
use Illuminate\Http\Request;

class AdminTwoFactorAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
      if (session()->get('admin') === 1)
        return $next($request);
      else
        return redirect()->route('404');
    }
}
