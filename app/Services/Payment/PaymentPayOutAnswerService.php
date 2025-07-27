<?php

namespace App\Services\Payment;

class PaymentPayOutAnswerService
{
    public static function lessBalance()
    {
        $message = <<<HTML
                            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                                <p style="font-size: 18px;">
                                    Your balance is less than the withdrawal amount.
                                </p>
                                <br>
                                <button onclick="window.location.href='/payments/out'"
                                        style="margin-top: 20px; padding: 10px 20px; font-size: 16px; background-color: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer;">
                                    BACK
                                </button>
                            </div>
                        HTML;

        return response()->json(['message' => $message]);
    }
}
