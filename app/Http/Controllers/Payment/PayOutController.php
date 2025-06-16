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
use App\Services\OutsidePaymentService;
use App\Services\Payment\CascadeService;
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

    public function payoutCrypto(AlphaPoPayOutRequest $request)
    {
        $data = $request->validated();

        $amount = $data['amount'];

        $currency = $data['convert_to'];

        $address = $data['address'];

        $tag = $data['tag'] ?? null;

        return $this->outsidePaymentService->createAlphaPoPayOut($amount, $currency, $address, $tag);
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
        $payment = $this->cascadeService->payoutShowMethod($id);

        $data = $request->validated();

        $code = TwoFactorService::enter();

        $answer['payment'] = PaymentResource::make($payment);

        $answer['amount'] = $data['amount'];

        $answer['currency'] = $data['currency'];

//        $answer['cachename'] = $code;

        return $this->successJsonAnswer200('the code was sent to the client\'s email',$answer);
    }


    public function checkCodeAndPayOut(CreatePayOutRequest $request, $id)
    {
        $validateData = $request->validated();

        $check = TwoFactorService::verify($validateData['code']);

        if ($check)
        {
            $payment = Payment::query()->findOrFail($id);

            $paymentType = PaymentTypeEnum::from($payment->category);

            $withdrawHandler = $paymentType->handlerForWithdraw();

            $withdrawHandler->process($payment, $validateData);
        }
        else
        {
            return $this->errorJsonAnswer403('the code is not correct');
        }
    }
}
