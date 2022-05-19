<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class BookmarkResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
          'id' => $this->id,
          'name' => $this->name,
          'url' => $this->url,
          'user_id' => $this->user_id,
          'category_id' => $this->category_id,
          'description' => $this->details->description,
          'category_name' => ($this->category) ? $this->category->name : "",
            'updated_at' => Carbon::createFromFormat('Y-m-d H:i:s', $this->updated_at)->toFormattedDateString(),
            'created_at' => Carbon::createFromFormat('Y-m-d H:i:s', $this->created_at)->toFormattedDateString(),
        ];
    }
}
