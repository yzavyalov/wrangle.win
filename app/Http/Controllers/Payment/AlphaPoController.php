<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Http\Requests\AlphaRatesRequest;
use App\Services\OutsidePaymentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AlphaPoController extends Controller
{
    public function __construct(OutsidePaymentService $outsidePaymentService)
    {
        $this->outsidePaymentService = $outsidePaymentService;
    }

    public function cryptoList()
    {
        return $this->outsidePaymentService->cryptoProcessingService->currencyList();
    }

    public function pare()
    {
        return $this->outsidePaymentService->cryptoProcessingService->pare();
    }

    public function rates(AlphaRatesRequest $request)
    {
        $request = $request->validated();

        return $this->outsidePaymentService->cryptoProcessingService->rates($request['currency_from'],$request['currency_to']);
    }

    public function handle(Request $request)
    {
        $publicKey = config(env('CRYPTOPROCESSING_PUBLIC_KEY'));  // X-Processing-Key
        $secretKey = config(env('CRYPTOPROCESSING_SECRET_KEY'));  // your private key

        // Получаем заголовки
        $receivedKey = $request->header('X-Processing-Key');
        $receivedSignature = $request->header('X-Processing-Signature');

        // Получаем «сырой» JSON
        $rawPayload = $request->getContent();

        // Вычисляем HMAC
        $calculatedSignature = hash_hmac('sha512', $rawPayload, $secretKey);

        // Проверяем подпись
        if ($receivedKey !== $publicKey || !hash_equals($calculatedSignature, $receivedSignature)) {
            Log::warning('AlphaPo callback failed signature check.', [
                'received_key' => $receivedKey,
                'received_signature' => $receivedSignature,
                'calculated_signature' => $calculatedSignature,
            ]);

            return response('Invalid signature', 403);
        }

        // Декодируем данные
        $data = json_decode($rawPayload, true);

        // ✅ Валидация параметров (пример — по твоим нужным полям)
        if (!isset($data['order_id'], $data['amount'], $data['status'])) {
            return response('Missing required parameters', 400);
        }

        // 🔧 Тут логика обработки (например, обновление заказа в БД)

        // Отвечаем успешно
        return response('OK', 200);
    }

}
