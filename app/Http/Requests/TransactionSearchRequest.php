<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class TransactionSearchRequest extends FormRequest
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
            'id' => 'nullable|integer|exists:transactions,id',
            'user_id' => 'nullable|integer|exists:users,id',
            'email' => 'nullable|email',
            'operation' => 'nullable|integer',
            'status' => 'nullable|integer',
            'method' => 'nullable|integer',
            'comment' => 'nullable|string',
            'created_at' => 'nullable|date',
        ];
    }
}
