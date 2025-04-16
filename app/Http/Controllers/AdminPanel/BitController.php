<?php

namespace App\Http\Controllers\AdminPanel;

use App\Http\Controllers\Controller;
use App\Models\Bet;
use App\Models\Bit;
use Illuminate\Http\Request;

class BitController extends Controller
{
    public function allbits()
    {
        $bits = Bit::paginate(25);

        return view('admin-panel.bits.allbitstable',compact('bits'));
    }
}
