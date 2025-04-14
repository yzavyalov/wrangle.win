<?php

namespace App\Http\Controllers\AdminPanel;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


class AdminAuthController extends Controller
{
    public function showLoginForm()
    {
        return view('admin-panel.auth.login');
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::guard('web')->attempt($credentials))
        {
            $user = Auth::user();

            if ($user->hasRole('admin'))
            {
                return view('admin-panel.auth.inputCode');
            }
            else
            {
                Auth::logout();
                return redirect()->route('admin.login')->withErrors(['email' => 'Access denied.']);
            }
        }

        return back()->withErrors(['email' => 'Invalid credentials.']);
    }
}
