<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class ConditionsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'payment_id' => 'required|integer|exists:payments,id',
            'number_deposits' => 'nullable|integer|min:0',
            'value_deposits' => 'nullable|integer|min:0',
            'number_withdraw' => 'nullable|integer|min:0',
            'value_withdraw' => 'nullable|integer|min:0',
            'registration_days' => 'nullable|integer|min:0',
        ];
    }
}
