<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BetSearchRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => 'integer|nullable|exists:bets,id',
            'user_id' => 'integer|nullable|exists:users,id',
            'email' => 'email|nullable|exists:users,email',
            'status' => 'integer|nullable',
            'finish' => 'date|nullable',
            'title' => 'string|nullable',
            'categories' => 'nullable|array|min:1',  // Ожидаем массив
            'categories.*' => 'integer|exists:bet_categories,id',
            'sort_by' => 'nullable|in:finish,title,budget',
            'sort_order' => 'nullable|in:asc,desc',
            'table' => 'nullable|integer|in:1,2',
            'page' => 'nullable|integer',
            'per_page' => 'nullable|integer',
        ];
    }
}
