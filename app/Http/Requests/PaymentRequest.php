<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class PaymentRequest extends FormRequest
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
            'name' => 'required|string',
            'type' => 'required|between:1,5',
            'category' => 'required|between:1,3',
            'commission' => 'nullable|numeric',
            'logo' => 'nullable|file|mimes:jpg,jpeg,png,gif|max:1024',
            'link' => 'required|string',
            'function' => 'required|string',
        ];
    }
}
