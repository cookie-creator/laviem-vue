<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        info($this->updated_at);
        return [
            'id' => $this->id,
            'title' => $this->title,
            'message' => $this->message,
            'user_id' => $this->user_id,
            'showed' => $this->showed,
            'type' => $this->type,
            'updated_at' => Carbon::createFromFormat('Y-m-d H:i:s', $this->updated_at)->toFormattedDateString(),
            'created_at' => Carbon::createFromFormat('Y-m-d H:i:s', $this->created_at)->toFormattedDateString(),
        ];
    }
}
