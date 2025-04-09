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
            'title' => 'string|nullable',
            'categories' => 'nullable|array|min:1',  // Ожидаем массив
            'categories.*' => 'nullable|integer|exists:bet_categories,id',
            'sort_by' => 'nullable|in:finish,title,budget',
            'sort_order' => 'nullable|in:asc,desc',
        ];
    }
}
