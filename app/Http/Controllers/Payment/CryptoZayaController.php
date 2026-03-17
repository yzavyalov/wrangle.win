<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Services\Payment\Crypto\CryptoZayaService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CryptoZayaController extends Controller
{

    public function __construct(CryptoZayaService $cryptoZayaService)
    {
        $this->cryptoZayaService = $cryptoZayaService;
    }
    public function handle(Request $request)
    {
        $callback = $request->all();

        $token = config('cryptozaya.cryptozaya_api_key');

        $hashedToken = hash('sha256', $token);

        if ($callback['signature'] !== $hashedToken) {
            return response()->json([
                'success' => false,
                'error' => 'Invalid signature'
            ], 403);
        }

        $response = $this->cryptoZayaService->takeCallback($callback);

        if ($response === null) {
            return response()->json([
                'success' => false,
                'error' => 'transaction not found'
            ], 405);
        }

        return response()->json(['success' => true]);
    }
}
