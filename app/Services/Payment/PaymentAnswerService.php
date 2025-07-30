<?php

namespace App\Services\Payment;

use SimpleSoftwareIO\QrCode\Facades\QrCode;

class PaymentAnswerService
{
    public $baseUrl;

    public function __construct()
    {
        $this->baseUrl = env('APP_URL');
    }
    public function wintecaPayInAnswer($answer)
    {
        // Проверка на наличие ошибки
        if (!$answer || !isset($answer['data']['attributes'])) {
            $message = <<<HTML
                            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; color: red;">
                                <p style="font-size: 18px;">
                                    Withdrawal of money failed. Please select another method or contact technical support.
                                </p>
                                <button onclick="window.location.href= $this->baseUrl.'/api/payments/in'"
                                        style="padding: 10px 20px; font-size: 16px; background-color: #dc3545; color: white; border: none; border-radius: 5px; cursor: pointer;">
                                    BACK
                                </button>
                            </div>
                        HTML;
        } else {
            $attributes = $answer['data']['attributes'];

            $hppUrl = htmlspecialchars($attributes['hpp_url'] ?? '#', ENT_QUOTES, 'UTF-8');
            $amount = htmlspecialchars($attributes['amount'] ?? '0.00', ENT_QUOTES, 'UTF-8');
            $currency = htmlspecialchars($attributes['currency'] ?? '', ENT_QUOTES, 'UTF-8');

            $message = <<<HTML
                            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; color: red;">
                                <p style="font-size: 18px;">
                                    You have successfully created a deposit.
                                </p>
                                <p>
                                    To complete the transaction and protect your personal data, please proceed to the secure payment page:
                                </p>
                                <p>
                                    <a href="{$hppUrl}" target="_blank" style="color: #007bff; text-decoration: none; font-weight: bold;">
                                        Click here to continue
                                    </a>
                                </p>
                                <p style="font-size: 16px;">
                                    <strong>Amount:</strong> {$amount} {$currency}
                                </p>
                                <button onclick="window.location.href= $this->baseUrl.'/api/payments/in'"
                                        style="margin-top: 20px; padding: 10px 20px; font-size: 16px; background-color: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer;">
                                    OK
                                </button>
                            </div>
                        HTML;
        }

        return response()->json(['message' => $message]);
    }



    public function AlphaPoPayInAnswer($answer, $amount, $currency)
    {
        if (isset($answer['error'])) {
            $errorMessage = htmlspecialchars($answer['error']); // защита от XSS

            $errorBlock =
                <<<HTML
                    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; color: red;">
                        <p style="font-size: 18px;">
                            <strong>Ошибка:</strong> {$errorMessage}
                        </p>
                        <button onclick="window.location.href='/api/payments/in'"
                                style="padding: 10px 20px; font-size: 16px; background-color: #dc3545; color: white; border: none; border-radius: 5px; cursor: pointer;">
                            Назад
                        </button>
                    </div>
                HTML;

            return response()->json(['message' => $errorBlock]);
        }

        // Успешный ответ
        $wallet = $answer['data']['address'] ?? null;

        if (!$wallet) {
            $fallbackBlock =
                <<<HTML
                    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; color: red;">
                        <p style="font-size: 18px;">
                            <strong>Ошибка:</strong> Не удалось получить адрес кошелька.
                        </p>
                        <button onclick="window.location.href='/api/payments/in'"
                                style="padding: 10px 20px; font-size: 16px; background-color: #dc3545; color: white; border: none; border-radius: 5px; cursor: pointer;">
                            Назад
                        </button>
                    </div>
                HTML;

            return response()->json(['message' => $fallbackBlock]);
        }

        $qr = QrCode::size(200)->generate($wallet);

        $successBlock =
            <<<HTML
                <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                    <p style="font-size: 18px;">
                        To top up your balance using <strong>{$amount} {$currency}</strong>, please send the amount to the following wallet address:
                    </p>
                    <p style="font-size: 20px; font-weight: bold; word-break: break-all;">{$wallet}</p>
                    <div style="margin: 20px 0;">{$qr}</div>
                    <button onclick="window.location.href='/api/payments/in'"
                            style="padding: 10px 20px; font-size: 16px; background-color: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer;">
                        OK
                    </button>
                </div>
            HTML;

        return response()->json(['message' => $successBlock]);
    }



    public function AlphaPoPayInNotCurrencyAnswer()
    {
        $message = <<<HTML
                    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                        <p style="font-size: 18px;">
                            Unfortunately, our service is currently unable to process an exchange with the selected currency. Please try a different payment method or contact our technical support for assistance.
                        </p>
                    </div>
                    HTML;

        return response()->json(['message' => $message]);
    }

}
