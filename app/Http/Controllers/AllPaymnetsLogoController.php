<?php

namespace App\Http\Controllers;

use App\Models\PaymentMethod;
use Illuminate\Http\Request;

class AllPaymnetsLogoController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        return  PaymentMethod::all()->pluck('logo');
    }
}
