<?php

namespace App\Services;

use App\Http\Requests\PaymentRequest;
use App\Models\Payment;
use Illuminate\Support\Facades\Storage;

class PaymentService
{
    public function createPayment(PaymentRequest $request)
    {
        $validateData = $request->validated();

        $payment = new Payment();

        if ($request->hasFile('logo'))
        {
            $file = $request->file('logo');
            // Сохранение файла в хранилище после валидации
            $filename = uniqid() . '_' . $file->getClientOriginalName();

//            $filePath = $file->storeAs('public/images', $filename);
            $filePath = $file->storeAs('logo', $filename, 'public');
            // Сохранение относительного пути в базу данных
            $payment->logo = str_replace('public/', '', $filePath);
        }

        $payment->name = $validateData['name'];

        $payment->type = $validateData['type'];

        $payment->category = $validateData['category'];

        $payment->commission = $validateData['commission'] ?? null;

        $payment->link = $validateData['link'];

        $payment->save();

        return $payment;
    }


    public function updatePayment(Payment $payment, PaymentRequest $request)
    {
        $validateData = $request->validated();

        $payment->update($validateData);

        if ($request->hasFile('logo')) {
            $file = $request->file('logo');
            $filename = uniqid() . '_' . $file->getClientOriginalName();

            // Проверяем, есть ли старая картинка перед удалением
            if (!empty($payment->logo) && Storage::disk('public')->exists($payment->logo)) {
                Storage::disk('public')->delete($payment->logo);
            }

            // Сохранение нового файла
            $filePath = $file->storeAs('logo', $filename, 'public');

            // Обновление записи в БД
            $payment->logo = $filePath;
            $payment->save();
        }

        return $payment;
    }

    public function delBet($id)
    {
        $payment = Payment::query()->find($id);

        if ($payment) {
            // Удалить файл изображения, если существует
            if ($payment->logo && Storage::disk('public')->exists($payment->logo)) {
                Storage::disk('public')->delete($payment->logo);
            }

            // Удалить
            $payment->delete();
        }
    }
}
