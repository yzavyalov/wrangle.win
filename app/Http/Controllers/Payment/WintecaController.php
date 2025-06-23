<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Services\Payment\Acquiring\WintecaService;
use App\Services\WintecaCallbackService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;

class WintecaController extends Controller
{
    protected string $privatKey;
    public function __construct(WintecaService $wintecaService,
                                WintecaCallbackService $callbackService)
    {
        $this->wintecaService = $wintecaService;

        $this->callbackService = $callbackService;

        $this->privatKey = config('services.winteca.privat_key');
    }


    public function handle(Request $request)
    {

        $secret = $this->privatKey;

        $rawBody = $request->getContent();

        // Получаем подпись из заголовка (уточни точное имя, например: X-Signature)
        $receivedSignature = $request->header('X-Signature');

        // Генерируем подпись по документации
        $expectedSignature = base64_encode(sha1($secret . $rawBody . $secret, true));

        if (empty($receivedSignature)) {
            Log::warning('Winteca callback: signature header missing');
            return response()->json(['error' => 'Missing signature'], 400);
        }

        if (!hash_equals($expectedSignature, $receivedSignature))
        {
            Log::warning('Winteca callback: invalid signature', [
                'expected' => $expectedSignature,
                'received' => $receivedSignature,
                'body' => $rawBody,
            ]);

            return Response::json(['error' => 'Invalid signature'], 403);
        }

        // ✅ Подпись валидна. Обрабатываем данные.
        $data = json_decode($rawBody, true);

        Log::info('Winteca callback verified', $data);


        return $this->callbackService->wintecaCallBack($data);

//        return response()->json(['status' => 'ok']);

    }

    public function payInSuccess()
    {
        return $this->successJsonAnswer200('Your deposit has been sent to the bank for processing.',['status' => 1]);
    }

    public function payInFail()
    {
        return $this->errorJsonAnswer403('The bank cannot process your payment.',['status' => 0]);
    }

    public function payInPending()
    {
        return $this->errorJsonAnswer403('The bank cannot process your payment.',['status' => 2]);
    }
}
