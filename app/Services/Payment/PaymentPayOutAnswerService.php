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


    public function wintecaError($answer)
    {
        $decoded = json_decode($answer['error'], true); // true = ассоциативный массив

        $errorText = 'Unknown error';

        if (json_last_error() === JSON_ERROR_NONE && isset($decoded['errors'][0]['title'])) {
            $errorText = $decoded['errors'][0]['title'];
        }

        $escapedText = htmlspecialchars($errorText, ENT_QUOTES, 'UTF-8');

        $message = <<<HTML
                    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                        <p style="font-size: 18px; color: red;">
                            Error
                        </p>
                        <p style="font-size: 18px;">
                            {$escapedText}
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


    public function wintecaSuccsess($answer)
    {

    }

}
