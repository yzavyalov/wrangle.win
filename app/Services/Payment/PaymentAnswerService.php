<?php

namespace App\Services\Payment;

class PaymentAnswerService
{
    public function wintecaPayInAnswer($answer)
    {
        if (!$answer || !isset($answer['data']['attributes'])) {
            $message = '<p>Withdrawal of money failed, please select another method or check with technical support.</p>';
        } else {
            $attributes = $answer['data']['attributes'];
            $message = sprintf(
                '<p>You have successfully created a deposit.</p>
            <p>To complete the transaction and protect your personal data, please proceed to the secure payment page:</p>
            <p><a href="%s" target="_blank">Click here to continue</a></p>
            <p><strong>Amount:</strong> %s %s</p>',
                htmlspecialchars($attributes['hpp_url'], ENT_QUOTES, 'UTF-8'),
                htmlspecialchars($attributes['amount'], ENT_QUOTES, 'UTF-8'),
                htmlspecialchars($attributes['currency'], ENT_QUOTES, 'UTF-8')
            );
        }

        return response()->json(['message' => $message]);
    }

}
