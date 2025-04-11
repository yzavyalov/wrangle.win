<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BitResource extends JsonResource
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
            'answer_id' => $this->answer_id,
            'bet_id' => $this->bet_id,
            'sum' => $this->sum,
            'date' => $this->created_at,
        ];
    }
}
