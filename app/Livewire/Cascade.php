<?php

namespace App\Livewire;

use App\Models\Payment;
use App\Models\PaymentMethod;
use Livewire\Component;

class Cascade extends Component
{
    public $methods = [];
    public $allPayments = [];
    public $selectedPayments = [];

    public function mount()
    {
        $this->allPayments = Payment::all();
        $this->loadPayments();
    }

    public function rules()
    {
        $rules = [];

        foreach ($this->selectedPayments as $methodId => $payments){
            foreach ($payments as $index=>$payment){
                $rules["selectedPayments.$methodId.$index.payment_id"] = 'required|exists:payments,id';
                $rules["selectedPayments.$methodId.$index.FTD"] = 'required|numeric|in:0,1';
                $rules["selectedPayments.$methodId.$index.FTD_limits"] = 'nullable|numeric|min:0';
                $rules["selectedPayments.$methodId.$index.STD"] = 'required|numeric|in:0,1';
                $rules["selectedPayments.$methodId.$index.STD_limits"] = 'nullable|numeric|min:0';
            }
        }

        return $rules;
    }

    public function messages()
    {
        return [
            '*.payment_id.required' => 'Please select a payment.',
            '*.payment_id.exists' => 'The selected payment does not exist.',
            '*.FTD.required' => 'The FTD field is required.',
            '*.FTD.numeric' => 'FTD must be a number 1 or 0.',
            '*.FTD_limits.required' => 'The FTD Limits field is required.',
            '*.FTD_limits.numeric' => 'FTD Limits must be a number.',
            '*.STD.numeric' => 'STD must be a number 1 or 0.',
            '*.STD_limits.numeric' => 'STD Limits must be a number.',
        ];
    }

    public function loadPayments()
    {
        $this->methods = PaymentMethod::with(['payments' => function ($query) {
            $query->orderBy('payments_payments_methods_table.order_by');
        }])->get();

        $this->selectedPayments = [];

        foreach ($this->methods as $method) {
            foreach ($method->payments as $payment) {
                $this->selectedPayments[$method->id][] = [
                    'payment_id' => $payment->id,
                    'FTD' => $payment->pivot->FTD,
                    'FTD_limits' => $payment->pivot->FTD_limits,
                    'STD' => $payment->pivot->STD,
                    'STD_limits' => $payment->pivot->STD_limits,
                    'order_by' => $payment->pivot->order_by,
                ];
            }
        }
    }

    public function addPayment($methodId)
    {
        if (!isset($this->selectedPayments[$methodId])) {
            $this->selectedPayments[$methodId] = [];
        }

        $this->selectedPayments[$methodId][] = [
            'payment_id' => null,
            'FTD' => null,
            'FTD_limits' => null,
            'STD' => null,
            'STD_limits' => null,
            'order_by' => count($this->selectedPayments[$methodId]) + 1,
        ];
    }

    public function removePayment($methodId, $index)
    {
        unset($this->selectedPayments[$methodId][$index]);
        $this->selectedPayments[$methodId] = array_values($this->selectedPayments[$methodId]);
    }

    public function updated($property)
    {
        $this->validateOnly($property);
    }
    public function save()
    {
        $this->validate();

        foreach ($this->selectedPayments as $methodId => $payments) {
            $method = PaymentMethod::find($methodId);
            $syncData = [];

            // Отфильтровать и отсортировать платежи по order_by
            $payments = collect($payments)
                ->filter(fn($payment) => !empty($payment['payment_id']))
                ->sortBy('order_by')
                ->values(); // сбрасывает ключи, чтобы $index шел от 0

            // Назначить уникальные значения order_by
            foreach ($payments as $index => $paymentData) {
                $syncData[$paymentData['payment_id']] = [
                    'FTD' => $paymentData['FTD'] ?? null,
                    'FTD_limits' => $paymentData['FTD_limits'] ?? null,
                    'STD' => $paymentData['STD'] ?? null,
                    'STD_limits' => $paymentData['STD_limits'] ?? null,
                    'order_by' => $index, // уникальный порядок
                ];
            }

            $method->payments()->sync($syncData);
        }

        $this->loadPayments(); // Обновить форму после сохранения
    }


    public function render()
    {
        return view('livewire.cascade');
    }
}
