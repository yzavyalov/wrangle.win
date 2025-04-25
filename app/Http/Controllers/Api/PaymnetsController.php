<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Enums\PaymentCategoryEnum;
use App\Http\Resources\PaymentResource;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymnetsController extends Controller
{
    public function allInPayments()
    {
        $payments = Payment::query()->where('category',PaymentCategoryEnum::IN)->get();

        return PaymentResource::collection($payments);
    }

    public function allOutPayments()
    {
        $payments = Payment::query()->where('category',PaymentCategoryEnum::OUT)->get();

        return PaymentResource::collection($payments);
    }
}
