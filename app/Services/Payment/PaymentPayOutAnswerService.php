<?php

namespace App\Services\Payment;

class PaymentPayOutAnswerService
{
    public $backUrl;

    public function __construct()
    {
        $this->backUrl = env('APP_URL').'/profile';
    }
    public static function lessBalance()
    {
        $backUrl = env('APP_URL').'/profile';

        $message = <<<HTML
                            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                                <p style="font-size: 18px;">
                                    Your balance is less than the withdrawal amount.
                                </p>
                                <br>
                                <button onclick="window.location.href='{$backurl}'"
                                        style="margin-top: 20px; padding: 10px 20px; font-size: 16px; background-color: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer;">
                                    BACK
                                </button>
                            </div>
                        HTML;

        return response()->json(['message' => $message]);
    }


    public function wintecaError($answer)
    {
        $rawError = $answer['error'];

        // Пытаемся вытащить JSON-часть из строки
        if (preg_match('/\{.*\}$/', $rawError, $matches)) {
            $jsonPart = $matches[0];
            $decoded = json_decode($jsonPart, true);

            $errorText = $this->extractErrorMessage($decoded) ?? 'Unknown error';
        } else {
            $errorText = 'Unknown error';
        }

        $escapedText = htmlspecialchars($errorText, ENT_QUOTES, 'UTF-8');

        $message = <<<HTML
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
            <p style="font-size: 18px; color: red;">Error</p>
            <p style="font-size: 18px;">{$escapedText}</p>
            <br>
            <button onclick="window.location.href='{$this->backUrl}'"
                    style="margin-top: 20px; padding: 10px 20px; font-size: 16px;
                    background-color: #28a745; color: white; border: none;
                    border-radius: 5px; cursor: pointer;">
                BACK
            </button>
        </div>
    HTML;

        return response()->json(['message' => $message]);
    }

    /**
     * Универсальный рекурсивный поиск текста ошибки в массиве
     */
    private function extractErrorMessage(array $data)
    {
        // 1. Если есть массив errors
        if (isset($data['errors'][0]['title'])) {
            return $data['errors'][0]['title'];
        }

        // 2. Если есть "message"
        if (isset($data['message']) && is_string($data['message'])) {
            return $data['message'];
        }

        // 3. Если есть статус или причина
        if (isset($data['data']['attributes']['status'])) {
            $status = $data['data']['attributes']['status'];
            if ($status === 'expired') {
                return 'The payout invoice has expired';
            }
            return "Status: $status";
        }

        // 4. Рекурсивно ищем строку с текстом ошибки
        foreach ($data as $value) {
            if (is_array($value)) {
                $found = $this->extractErrorMessage($value);
                if ($found) {
                    return $found;
                }
            }
        }

        return null;
    }


    public function wintecaSuccsess($answer)
    {
        $invoiceId = $answer['data']['id'] ?? null;
        $amount = $answer['data']['attributes']['payout_amount'] ?? null;
        $currency = $answer['data']['attributes']['currency'] ?? 'USD';
        $maskedCard = $answer['data']['attributes']['fields']['card_number'] ?? '**** **** ****';

        $message = <<<HTML
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 30px; background-color: #f9f9f9; border-radius: 10px; max-width: 600px; margin: 40px auto; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #28a745; margin-bottom: 20px;">Payout Created Successfully</h2>

            <p style="font-size: 16px; color: #333;">
                Your payout request has been created and is being processed.
            </p>

            <p style="font-size: 16px; color: #333;">
                As soon as the bank processes the payment, the funds will be available on your card.
            </p>

            <p style="font-size: 15px; color: #666; margin-top: 20px;">
                <strong>Amount:</strong> {$amount} {$currency}<br>
                <strong>Card:</strong> {$maskedCard}<br>
                <strong>Invoice ID:</strong> {$invoiceId}
            </p>

            <button onclick="window.location.href='{$this->backUrl}'"
                    style="margin-top: 30px; padding: 12px 24px; font-size: 16px; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">
                Return to Profile Page
            </button>
        </div>
    HTML;

        return response()->json(['message' => $message]);;
    }

    public static function withdrawFailed()
    {
        $backUrl = env('APP_URL').'/profile';

        $message = <<<HTML
                    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                        <p style="font-size: 18px; color: red;">
                            Error
                        </p>
                        <p style="font-size: 18px;">
                            Withdrawal of money failed, please select another method or check with technical support
                        </p>
                        <br>
                        <button onclick="window.location.href='{$backUrl}'"
                                style="margin-top: 20px; padding: 10px 20px; font-size: 16px; background-color: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer;">
                            BACK
                        </button>
                    </div>
                HTML;

        return response()->json(['message' => $message]);
    }



    public static function codeNotCorrect()
    {
        $backUrl = env('APP_URL').'/profile';

        $message = <<<HTML
                    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                        <p style="font-size: 18px; color: red;">
                            Error
                        </p>
                        <p style="font-size: 18px;">
                            The code is not correct
                        </p>
                        <br>
                        <button onclick="window.location.href='{$backUrl}'"
                                style="margin-top: 20px; padding: 10px 20px; font-size: 16px; background-color: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer;">
                            BACK
                        </button>
                    </div>
                HTML;

        return response()->json(['message' => $message]);
    }

}
