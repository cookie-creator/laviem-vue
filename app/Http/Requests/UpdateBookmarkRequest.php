<?php

namespace App\Http\Requests;

use App\Models\Bookmark;
use Illuminate\Foundation\Http\FormRequest;

class UpdateBookmarkRequest extends FormRequest
{
    public function authorize()
    {
        $bookmark = $this->route('bookmark');
        if ($this->user()->id !== $bookmark->user_id) {
            return false;
        }
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:1000',
            'url' => 'required|string|max:1000',
            'user_id' => 'exists:users,id',
            'category_id' => 'exists:categories,id',
            'description' => 'nullable|string',
        ];
    }
}
