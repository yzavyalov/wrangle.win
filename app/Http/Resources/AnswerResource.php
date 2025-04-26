<?php

namespace App\Http\Resources;

use App\Services\AnswerService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AnswerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'bet_id' => $this->bet_id,
            'description' => $this->description,
            'profit' => AnswerService::profit($this->resource),
        ];
    }
}
