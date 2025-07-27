<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Enums\PaymentCategoryEnum;
use App\Http\Enums\PaymentTypeEnum;
use App\Http\Requests\SelectPaymentRequest;
use App\Http\Resources\PaymentMethodsResource;
use App\Http\Resources\PaymentResource;
use App\Models\Payment;
use App\Models\PaymentMethod;
use App\Services\OutsidePaymentService;
use App\Services\Payment\CascadeService;
use App\Services\Payment\FirstDepositService;
use Illuminate\Http\Request;

class PaymnetsController extends Controller
{
    public function __construct(OutsidePaymentService $outsidePaymentService,
                                FirstDepositService $firstDepositService)
    {
        $this->outsidePaymentService = $outsidePaymentService;

        $this->firstDepositService = $firstDepositService;
    }

    public function allInPayments()
    {
        $methods = $this->outsidePaymentService->cascadeService->methods();

        return PaymentMethodsResource::collection($methods);
    }



    public function showMethod($id)
    {
        $method = $this->outsidePaymentService->cascadeService->showMethod($id);

        foreach ($method as $item)
        {
            if ($item->title == 'Bitcoin')
                $cryptocourses = $this->outsidePaymentService->alphaPoService->exchange(env('CURRENT_CURRENCY'),'BTC',1);
            elseif ($item->title == 'USDTE')
                $cryptocourses = $this->outsidePaymentService->alphaPoService->exchange(env('CURRENT_CURRENCY'),'USDTE',1);
        }

        $method = PaymentMethodsResource::collection($method);

        $answer = ['method' => $method, 'course' => $cryptocourses ?? null];

        return $this->successJsonAnswer200('Your methods', $answer);
    }

    public function deposit(SelectPaymentRequest $request,$id)
    {
        $data = $request->validated();

        if (PaymentMethod::query()->findOrFail($id)->category !== PaymentCategoryEnum::IN->value)
            return $this->errorJsonAnswer400('incorrectly chosen method');

//        $this->firstDepositService->checkFirstDeposit();

        $result = $this->outsidePaymentService->createPayInCascade($data['amount'],$data['currency'],$id);

        return $this->successJsonAnswer200('Message', $result);
    }
}
