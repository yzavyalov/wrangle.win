<?php

namespace App\Services;

use App\Models\Deposit;
use App\Models\Payment_log;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class CryptoProcessingService
{
    public $base_currency;
    public function __construct(PaymentLogsService $paymentLogsService)
    {
        $this->paymentLogsService = $paymentLogsService;

        $this->base_currency = env('CURRENT_CURRENCY');
    }

    public function saveUserWallet($address, $paymentMethodId, $currency)
    {
        $data = [
            'address' => $address,
            'payment_methods_id' => $paymentMethodId,
            'currency' => $currency,
        ];

        $this->saveWallets($data, Auth::user());
    }


    public function checkUserDepositAddress($paymentId, $currency)
    {
        $user = Auth::user();

        $transactions = $user->transactions()
            ->where('method', $paymentId)
            ->count();

        if ($transactions % 5 === 0) {
            return null;
        }

        $oldWallet = $user->cryptoWallets()
            ->where([
                'payment_methods_id' => $paymentId,
                'currency' => $currency,
            ])
            ->where('created_at', '>=', now()->subMonths(3))
            ->latest()
            ->first();

        return $oldWallet->address ?? null;
    }



    protected function saveWallets(array $data, User $user)
    {
        $wallet = $user->cryptoWallets()->create($data);
        return $wallet;
    }

}
