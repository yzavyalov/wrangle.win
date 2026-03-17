<?php

namespace App\Services\Payment;

use App\Http\Requests\PaymentMethodRequest;
use App\Models\Payment;
use App\Models\PaymentMethod;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class PaymentMethodService
{
    public function create(PaymentMethodRequest $request)
    {
        $data = $request->validated();

        $method = PaymentMethod::create($data);

        if ($request->hasFile('logo'))
        {
            $file = $request->file('logo');

            $filename = uniqid() . '_' . $file->getClientOriginalName();

            // Сохраняем файл в storage/app/public/logo
            $filePath = $file->storeAs('logo', $filename, 'public');

            // Сохраняем путь как есть — Laravel ожидает 'logo/filename.png'
            $method->logo = 'logo/' . $filename;

            $method->save();
        }

        return $method;
    }


    public function update(PaymentMethod $paymentMethod, PaymentMethodRequest $request)
    {
        // Сохраняем путь к старому логотипу (если был)
        $oldLogo = $paymentMethod->logo;

        // Обновляем остальные поля модели
        $paymentMethod->update($request->validated());

        // Обработка логотипа
        if ($request->hasFile('logo')) {
            $file = $request->file('logo');
            $filename = uniqid() . '_' . $file->getClientOriginalName();

            // Сохраняем файл в storage/app/public/logo
            $filePath = $file->storeAs('logo', $filename, 'public');

            // Удаляем старый логотип, если он был
            if ($oldLogo && Storage::disk('public')->exists($oldLogo)) {
                Storage::disk('public')->delete($oldLogo);
            }

            // Сохраняем новый путь
            $paymentMethod->logo = $filePath;
            $paymentMethod->save();
        }

        return $paymentMethod;
    }


    public static function paymentMethodId($paymentId,$currency)
    {
        $payment = Payment::query()->find($paymentId);

        $paymentMethod = $payment->methods()->where('currency',$currency)->first();

        return $paymentMethod->id ?? null;
    }

    public static function currencyOfPaymentMethodId($paymentMethodId)
    {
        return PaymentMethod::find($paymentMethodId)?->currency;
    }


}
