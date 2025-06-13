<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Services\Payment\Acquiring\WintecaService;
use Illuminate\Http\Request;

class WintecaController extends Controller
{
    public function __construct(WintecaService $wintecaService)
    {
        $this->wintecaService=$wintecaService;
    }
    public function check(Request $request)
    {
        $data = $request->only('currency','amount');

        return $this->wintecaService->generateHppUrl($data['currency'], $data['amount'], 'Check');
    }
}
