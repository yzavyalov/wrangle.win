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
use Illuminate\Http\Request;

class PaymnetsController extends Controller
{
    public function __construct(CascadeService $cascadeService, OutsidePaymentService $outsidePaymentService)
    {
        $this->cascadeService = $cascadeService;

        $this->outsidePaymentService = $outsidePaymentService;
    }
    public function allInPayments()
    {
        $methods = $this->cascadeService->methods();

        return PaymentMethodsResource::collection($methods);
    }



    public function showMethod($id)
    {
        $method = $this->cascadeService->showMethod($id);

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

        $payment = Payment::query()->findOrFail($id);

        $deposit = $this->outsidePaymentService->depositService->createDeposit($data['amount'],$data['currency'],$payment->id);

        $data['reference_id'] = $deposit->id;

        $type = PaymentTypeEnum::from($payment->type);

        $handler = $type->handler();

        $result = $handler->handle($payment, $data);

        return $result;
    }
}
