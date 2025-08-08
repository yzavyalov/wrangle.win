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

        if (! $user || $user->id !== $tokenUserID) {
            return redirect()->route('index');
        }

        Auth::login($user);

        $message = 'The payment '.$amount.' '. $currency .' has been created, once the bank processes the transaction, your balance will be replenished.';

        return Inertia::render('Profile',['transactionMessage' => $message]);
    }
}
