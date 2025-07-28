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
        $methods = PaymentMethod::all();

        $grouped = [
            'payin' => [],
            'payout' => [],
        ];

        foreach ($methods as $method) {
            $logoUrl = asset('storage/' . $method->logo);

            if ($method->category == 1) {
                $grouped['payin'][] = $logoUrl;
            } elseif ($method->category == 2) {
                $grouped['payout'][] = $logoUrl;
            }
        }

        return $grouped;
    }
}
