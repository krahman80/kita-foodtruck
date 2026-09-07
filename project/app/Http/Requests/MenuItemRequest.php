<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MenuItemRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            // Whole yen, positive (DDD §4.2 invariant #1).
            'price_yen' => ['required', 'integer', 'min:1'],
            // Media: uploaded image + alt required together (DDD §4.2 invariant #3).
            'image' => [
                Rule::requiredIf($this->isMethod('post')),
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],
            'image_alt_text' => ['required', 'string', 'max:255'],
            'spice_level' => ['required', Rule::in(['mild', 'medium', 'hot', 'tangy'])],
            // Two v1 categories (PRD §11).
            'category' => ['required', Rule::in(['chili_dog', 'drink'])],
            'badge_type' => ['required', Rule::in(['halal_standard', 'limited_batch', 'none'])],
            'highlight_tag_1' => ['nullable', 'string', 'max:255'],
            'highlight_tag_2' => ['nullable', 'string', 'max:255'],
            'is_sold_out' => ['sometimes', 'boolean'],
            'is_active' => ['sometimes', 'boolean'],
            'display_order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
