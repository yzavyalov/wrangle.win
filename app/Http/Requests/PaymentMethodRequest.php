<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class PaymentMethodRequest extends FormRequest
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
            'title'      => 'required|string|max:120',
            'type'       => 'required|integer|in:1,2,3,4,5',
            'category'   => 'required|integer|in:1,2',
            'comission' => 'required|numeric|min:0',
            'fixfee'    => 'required|numeric|min:0',
            'logo'       => 'nullable|image', // или 'nullable|image' если не обязателен
        ];
    }
}
