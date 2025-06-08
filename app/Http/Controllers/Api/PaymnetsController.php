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
use App\Services\Payment\CascadeService;
use Illuminate\Http\Request;

class PaymnetsController extends Controller
{
    public function __construct(CascadeService $cascadeService)
    {
        $this->cascadeService = $cascadeService;
    }
    public function allInPayments()
    {
        $methods = $this->cascadeService->methods();

        return PaymentMethodsResource::collection($methods);
    }

    public function allOutPayments()
    {
        $payments = Payment::query()->where('category',PaymentCategoryEnum::OUT)->get();

        return PaymentResource::collection($payments);
    }


    public function showMethod($id)
    {
        $method = $this->cascadeService->showMethod($id);

        return PaymentMethodsResource::collection($method);
    }

    public function deposit(SelectPaymentRequest $request,$id)
    {
        $data = $request->validated();

        $payment = Payment::query()->findOrFail($id);

        $type = PaymentTypeEnum::from($payment->type);

        $handler = $type->handler();

        $result = $handler->handle($payment, $data);

        return $result;
    }
}
