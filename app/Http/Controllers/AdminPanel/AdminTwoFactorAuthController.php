<?php

namespace App\Http\Controllers\AdminPanel;

use App\Http\Controllers\Controller;


use App\Http\Requests\AdminTwoFactorFormRequest;
use App\Services\TwoFactorService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class AdminTwoFactorAuthController extends Controller
{
    public function showInputForm()
    {
        $cachename = TwoFactorService::enter();

        $d = Cache::get($cachename);

        return view('admin-panel.auth.inputCode');
    }

    public function checkCode(AdminTwoFactorFormRequest $request)
    {
        $systemCode = Cache::get('code'.Auth::id());

        if ($systemCode === $request->code)
//        if (true)
        {
            session(['admin' => 1]);

            return redirect()->route('admin-panel');
        }
        else
        {
            return redirect()->back();
        }
    }
}
