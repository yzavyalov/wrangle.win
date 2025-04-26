<?php

namespace App\Http\Controllers\AdminPanel;

use App\Http\Controllers\Controller;
use App\Models\Bet;
use App\Models\Bit;
use App\Models\Transaction;
use App\Models\User;
use App\Services\TwoFactorAdminService;
use App\Services\TwoFactorService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class PageController extends Controller
{
    public function mainPage()
    {
        $bets = Bet::all()->count();

        $bits = Bit::all()->sum('sum');

        $users = User::all()->count();

        $transactions = Transaction::all()->count();

        return view('admin-panel.admin-panel',compact('bets', 'bits','users','transactions'));
    }
}
