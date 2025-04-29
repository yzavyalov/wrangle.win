<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class BetRequest extends FormRequest
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
            'title' => 'required|string',
            'categories' => 'required|array|min:1',  // Ожидаем массив
            'categories.*' => 'required|integer|exists:bet_categories,id',
            'image' => 'file|mimes:jpg,jpeg,png,gif|max:1024',  // Проверка на изображение и размер
            'source1' => 'required|url',  // Проверка на корректный URL
            'source2' => 'nullable|url',
            'source3' => 'nullable|url',
            'description' => 'required|string|max:3000',
            'answers' => 'bail|required|array|min:2',
            'answers.*' => 'required|string',
            'finish' => 'required|date',
            'status' => 'integer|nullable',
        ];
    }

}
