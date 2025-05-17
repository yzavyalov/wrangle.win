<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Http\Requests\AlphaRatesRequest;
use App\Services\OutsidePaymentService;
use App\Services\Payment\AlphaPoService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AlphaPoController extends Controller
{
    public function __construct(OutsidePaymentService $outsidePaymentService, AlphaPoService $alphaPoService)
    {
        $this->outsidePaymentService = $outsidePaymentService;

        $this->alphaPoService = $alphaPoService;
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
        $publicKey = config('cryptoprocessing.public_key');   // Правильный способ вызова конфигурации
        $secretKey = config('cryptoprocessing.secret_key');   // Убедись, что ключи заданы в config/cryptoprocessing.php

        // Получаем заголовки
        $receivedKey = $request->header('X-Processing-Key');
        $receivedSignature = $request->header('X-Processing-Signature');

        // Получаем «сырой» JSON
        $rawPayload = $request->getContent();

        // Проверка наличия заголовков
        if (empty($receivedKey) || empty($receivedSignature)) {
            Log::warning('AlphaPo callback missing headers', [
                'received_key' => $receivedKey,
                'received_signature' => $receivedSignature,
            ]);
            return response('Missing required headers', 400);
        }

        // Вычисляем подпись
        $calculatedSignature = hash_hmac('sha512', $rawPayload, $secretKey);

//         Проверка подписи
        if ($receivedKey !== $publicKey || !hash_equals($calculatedSignature, $receivedSignature)) {
            Log::warning('AlphaPo callback failed signature check', [
                'received_key' => $receivedKey,
                'received_signature' => $receivedSignature,
                'calculated_signature' => $calculatedSignature,
            ]);
            return response('Invalid signature', 403);
        }

        // Декодируем тело запроса
        $data = json_decode($rawPayload, true);

        if (!is_array($data)) {
            Log::warning('AlphaPo callback: invalid JSON payload');
            return response('Invalid JSON', 400);
        }

        // Проверка обязательных полей
        if (
            !isset($data['id'], $data['type'], $data['status']) ||
            !isset($data['crypto_address']['currency'], $data['crypto_address']['address']) ||
            !isset($data['currency_sent']['amount'], $data['currency_sent']['currency']) ||
            !isset($data['currency_received']['amount'], $data['currency_received']['currency'])
        ) {
            Log::warning('AlphaPo callback: missing required fields', ['payload' => $data]);
            return response('Missing required parameters', 400);
        }

        // Найти депозит, сохранить
        $this->alphaPoService->getCallBackDeposit($data);


        // Order::where('id', $data['order_id'])->update([...]);

        Log::info('AlphaPo callback processed successfully');

        // Возврат успешного ответа
        return response('OK', 200);
    }

}
