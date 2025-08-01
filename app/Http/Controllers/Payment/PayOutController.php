<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Http\Enums\PaymentCategoryEnum;
use App\Http\Enums\PaymentTypeEnum;
use App\Http\Requests\AlphaPoPayOutRequest;
use App\Http\Requests\CreatePayOutRequest;
use App\Http\Requests\SelectPaymentRequest;
use App\Http\Resources\PaymentMethodsResource;
use App\Http\Resources\PaymentResource;
use App\Models\Payment;
use App\Models\PaymentMethod;
use App\Services\BalanceService;
use App\Services\OutsidePaymentService;
use App\Services\Payment\CascadeService;
use App\Services\Payment\PaymentPayOutAnswerService;
use App\Services\TwoFactorService;
use Illuminate\Http\Request;

class PayOutController extends Controller
{
    public function __construct(OutsidePaymentService $outsidePaymentService,
                                CascadeService $cascadeService,
                                )
    {
        $this->outsidePaymentService = $outsidePaymentService;

        $this->cascadeService = $cascadeService;
    }


    public function allOutPayments()
    {
        $methods = $this->cascadeService->payoutsMethods();

        return PaymentMethodsResource::collection($methods);
    }

    public function showMethod($id)
    {
        $method = $this->cascadeService->payoutShowMethod($id);

        if ($method)
            return $this->successJsonAnswer200('Payment method',PaymentMethodsResource::make($method));
        else
            return $this->errorJsonAnswer404('Either this method does not exist, or it is not for payments.');
    }


    public function payOutPayment(SelectPaymentRequest $request, $id)
    {
        $method = PaymentMethod::query()->findOrFail($id);

        $data = $request->validated();

        $code = TwoFactorService::enter();

        $answer['method'] = PaymentMethodsResource::make($method);

        $answer['amount'] = $data['amount'];

        $answer['currency'] = $data['currency'];

//        $answer['cachename'] = $code;

        return $this->successJsonAnswer200('the code was sent to the client\'s email',$answer);
    }


    public function checkCodeAndPayOut(CreatePayOutRequest $request, $id)
    {
        $validateData = $request->validated();

        $amount = $validateData['amount'];

        $currency = $validateData['currency'] ?? 'EUR';

        $card_number = $validateData['card_number'];

        if (PaymentMethod::query()->findOrFail($id)->category !== PaymentCategoryEnum::OUT->value)
            return $this->errorJsonAnswer400('incorrectly chosen method');

        $check = TwoFactorService::verify($validateData['code']);
dd($check);
        if ($check)
        {
            $checkBalance = BalanceService::checkSum($validateData['amount']);

            if (!$checkBalance)
                return PaymentPayOutAnswerService::lessBalance();

            $response = $this->outsidePaymentService->createPauOutCascade($amount, $currency, $card_number,$id);

            if($response)
                return $this->successJsonAnswer200('message',$response);
            else
                return $this->successJsonAnswer200('message',PaymentPayOutAnswerService::withdrawFailed());
        }
        else
        {
            return $this->successJsonAnswer200('message',PaymentPayOutAnswerService::codeNotCorrect());
        }
    }
}
