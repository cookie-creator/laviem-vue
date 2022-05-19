<?php

namespace App\Http\Requests;

use App\Models\Bookmark;
use Illuminate\Foundation\Http\FormRequest;

class StoreBookmarkRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'user_id' => $this->user()->id
        ]);
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:1000',
            'url' => 'required|string|max:1000',
            'user_id' => 'exists:users,id',
            'category_id' => 'exists:categories,id',
            'description' => 'nullable|string'
        ];
    }
}
