<?php

namespace App\Services\Payment\Crypto;

class CryptoZayaAnswerService
{
    public static function getAnswer($sum, $currency, $wallet)
    {
        $backUrl = env('APP_URL') . '/profile';

        $message = <<<HTML
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
            <p style="font-size: 20px; color: #28a745; font-weight: bold;">
                Success
            </p>

            <p style="font-size: 18px;">
                We have transferred <b>{$sum} {$currency}</b> to wallet
                <b>{$wallet}</b>.
            </p>

            <br>

            <button onclick="window.location.href='{$backUrl}'"
                style="margin-top: 20px;
                       padding: 10px 25px;
                       font-size: 16px;
                       background-color: #28a745;
                       color: white;
                       border: none;
                       border-radius: 5px;
                       cursor: pointer;">
                Return
            </button>
        </div>
    HTML;

        return response()->json(['message' => $message]);
    }
}
