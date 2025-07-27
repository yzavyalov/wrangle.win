<?php

namespace App\Http\Controllers;

use App\Models\PaymentMethod;

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
