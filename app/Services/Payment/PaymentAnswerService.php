<?php

namespace App\Services\Payment;

use SimpleSoftwareIO\QrCode\Facades\QrCode;

class PaymentAnswerService
{
    public $backUrl;

    public function __construct()
    {
        $this->backUrl = env('APP_URL') . '/profile';
    }

    public function wintecaPayInAnswer($answer)
    {
        // Проверка на наличие ошибки
        if (!$answer || !isset($answer['data']['attributes'])) {
            $message = <<<HTML
                            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; color: red;">
                                <p style="font-size: 18px;">
                                    Failed to create a deposit. Please select another method or contact technical support.
                                </p>
                                <button onclick="window.location.href= '{$this->backUrl}'"
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
                                <button onclick="window.location.href= '{$this->backUrl}'"
                                        style="margin-top: 20px; padding: 10px 20px; font-size: 16px; background-color: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer;">
                                    OK
                                </button>
                            </div>
                        HTML;
        }

        return response()->json(['message' => $message]);
    }


    public function CryptoZayaPayInQRAnswer($answer, $amount, $currency)
    {
        if (empty($answer)) {
            $message =
                <<<HTML
                        <div style="
                            min-height: 100vh;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            background: #FFE432;
                            font-family: Arial, sans-serif;
                        ">
                            <div style="
                                background: #FEEC78;
                                padding: 40px;
                                border-radius: 16px;
                                box-shadow: 0 10px 30px rgba(0,0,0,0.08);
                                text-align: center;
                                max-width: 480px;
                                width: 100%;
                            ">

                                <div style="
                                    font-size: 48px;
                                    margin-bottom: 15px;
                                ">
                                    ❌
                                </div>

                                <h2 style="
                                    margin-bottom: 20px;
                                    font-weight: 600;
                                    color: #dc3545;
                                ">
                                    Payment Failed
                                </h2>

                                <p style="
                                    font-size: 16px;
                                    margin-bottom: 30px;
                                    color: #555;
                                    line-height: 1.6;
                                ">
                                    Unfortunately, our service is currently unable to process an exchange
                                    with the selected currency.<br><br>
                                    Please try a different payment method or contact our technical support
                                    for assistance.
                                </p>

                                <button onclick="window.location.href='{$this->backUrl}'"
                                    style="
                                        padding: 12px 28px;
                                        font-size: 16px;
                                        font-weight: 600;
                                        background: linear-gradient(135deg, #dc3545, #c82333);
                                        color: #fff;
                                        border: none;
                                        border-radius: 8px;
                                        cursor: pointer;
                                        transition: 0.3s ease;
                                    "
                                    onmouseover="this.style.opacity='0.85'"
                                    onmouseout="this.style.opacity='1'"
                                >
                                    Back
                                </button>

                            </div>
                        </div>
                        HTML;
        } else {
            $qr = QrCode::size(200)->generate($answer);
            $message = <<<HTML
                        <div style="
                            min-height: 100vh;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            background: #FFE432;
                            font-family: Arial, sans-serif;
                        ">
                            <div style="
                                background: #FEEC78;
                                padding: 40px;
                                border-radius: 16px;
                                box-shadow: 0 10px 30px rgba(0,0,0,0.08);
                                text-align: center;
                                max-width: 420px;
                                width: 100%;
                            ">

                                <h2 style="margin-bottom:20px;font-weight:600;color:#333;">Deposit Instruction</h2>

                                <p style="font-size:18px;margin-bottom:15px;color:#555;">
                                    Please transfer <strong>{$amount} {$currency}</strong> to:
                                </p>

                                <input id="walletAddressInput" readonly value="{$answer}" style="
                                    width: 100%;
                                    padding: 12px;
                                    border-radius: 10px;
                                    border: 1px solid rgba(0,0,0,0.12);
                                    font-size: 14px;
                                    font-weight: 600;
                                    color: #222;
                                    background: rgba(255,255,255,0.65);
                                    text-align: center;
                                    margin-bottom: 12px;
                                " />

                                <button type="button"
                                    onclick="
                                        (function(){
                                            var el = document.getElementById('walletAddressInput');
                                            var text = el.value;

                                            // modern way
                                            if (navigator.clipboard && window.isSecureContext) {
                                                navigator.clipboard.writeText(text).then(function(){
                                                    var b = document.getElementById('copyBtn');
                                                    b.innerText = 'Copied ✓';
                                                    setTimeout(function(){ b.innerText = 'Copy Address'; }, 1500);
                                                }).catch(function(){
                                                    el.select();
                                                    document.execCommand('copy');
                                                });
                                                return;
                                            }

                                            // fallback way
                                            el.focus();
                                            el.select();
                                            document.execCommand('copy');

                                            var b = document.getElementById('copyBtn');
                                            b.innerText = 'Copied ✓';
                                            setTimeout(function(){ b.innerText = 'Copy Address'; }, 1500);
                                        })();
                                    "
                                    id="copyBtn"
                                    style="
                                        padding: 10px 18px;
                                        font-size: 14px;
                                        font-weight: 700;
                                        background: #333;
                                        color: #fff;
                                        border: none;
                                        border-radius: 8px;
                                        cursor: pointer;
                                        margin-bottom: 25px;
                                        width: 100%;
                                    "
                                >
                                    Copy Address
                                </button>

                                <div style="margin-bottom:30px;display:flex;justify-content:center;">
                                    {$qr}
                                </div>

                                <button onclick="window.location.href='{$this->backUrl}'"
                                    style="
                                        padding: 12px 28px;
                                        font-size: 16px;
                                        font-weight: 600;
                                        background: linear-gradient(135deg, #28a745, #20c997);
                                        color: #fff;
                                        border: none;
                                        border-radius: 8px;
                                        cursor: pointer;
                                        transition: 0.3s ease;
                                        width: 100%;
                                    "
                                    onmouseover="this.style.opacity='0.85'"
                                    onmouseout="this.style.opacity='1'"
                                >
                                    OK
                                </button>

                            </div>
                        </div>
                        HTML;


            return response()->json(['message' => $message]);
        }
    }

}
