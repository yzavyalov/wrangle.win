<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Models\Winteca_transaction;
use App\Services\Payment\Acquiring\WintecaService;
use App\Services\Payment\Acquiring\WintecaTokenService;
use App\Services\WintecaCallbackService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Profiler\Profile;

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

        // Получаем "сырое" тело запроса — НЕ декодируем и не меняем его
        $rawBody = $request->getContent();

        // Получаем подпись из заголовка
        $receivedSignature = $request->header('X-Signature');

        if (empty($receivedSignature)) {
            Log::warning('Winteca callback: signature header missing');
            return response()->json(['error' => 'Missing signature'], 400);
        }

        // Генерируем подпись по алгоритму: base64_encode(sha1(secret + rawBody + secret, true))
        $expectedSignature = base64_encode(sha1($secret . $rawBody . $secret, true));

        // Логируем для отладки
        Log::info('Signature debug', [
            'secret' => $secret,
            'raw_length' => strlen($rawBody),
            'raw_start' => substr($rawBody, 0, 100), // первые 100 символов тела
            'raw_end' => substr($rawBody, -100),     // последние 100 символов тела
            'expectedSignature' => $expectedSignature,
            'receivedSignature' => $receivedSignature,
            'signatures_match' => hash_equals($expectedSignature, $receivedSignature)
        ]);

        if (!hash_equals($expectedSignature, $receivedSignature)) {
            // Дополнительная проверка: сравним побайтно, где первый расхождение
            $expectedBytes = base64_decode($expectedSignature);
            $receivedBytes = base64_decode($receivedSignature);
            $diffPos = -1;
            for ($i = 0; $i < min(strlen($expectedBytes), strlen($receivedBytes)); $i++) {
                if ($expectedBytes[$i] !== $receivedBytes[$i]) {
                    $diffPos = $i;
                    break;
                }
            }
            Log::warning('Signature mismatch details', [
                'diff_position' => $diffPos,
                'expected_byte' => $diffPos >= 0 ? ord($expectedBytes[$diffPos]) : null,
                'received_byte' => $diffPos >= 0 ? ord($receivedBytes[$diffPos]) : null,
            ]);

            return response()->json(['error' => 'Invalid signature'], 403);
        }

        // Подпись валидна — можно работать с данными
        $data = json_decode($rawBody, true);
        Log::info('Winteca callback verified', $data);

        return $this->callbackService->wintecaCallBack($data);
    }




    public function payInSuccess()
    {
        $message = 'Your transaction has been successfully created. Your balance will be replenished shortly.';

        return Inertia::render('Profile', [
            'tab' => 'paymentAnswer',
            'message' => $message,
        ]);
    }

    public function payInFail()
    {
        $message = 'Your transaction was declined. Please try again later or choose another method.';

        return Inertia::render('Profile', [
            'tab' => 'paymentAnswer',
            'message' => $message,
        ]);
    }

    public function payInPending(Request $request)
    {

        $id    = $request->query('id');
        $token = $request->query('description');
        $amount = $request->query('amount');
        $currency = $request->query('currency');

        $tokenUserID = WintecaTokenService::checkToken($token);

        if (! $tokenUserID) {
            return redirect()->route('index');
        }

        $winteca_transaction = Winteca_transaction::query()
            ->where('id_winteca', $id)
            ->first();

        if (! $winteca_transaction) {
            return redirect()->route('index');
        }

        $operation = $winteca_transaction->transactionable;
        $user = $operation->user ?? null;

        if (! $user || $user->id !== (int)$tokenUserID) {
            return redirect()->route('index');
        }

        Auth::login($user,false);

        $message = "A payment of $amount $currency has been created. Once the bank processes the transaction, your balance will be credited with $operation->sum $operation->currency, as payment processing fees will be deducted.";

        return Inertia::render('Profile',['transactionMessage' => $message]);
    }
}
