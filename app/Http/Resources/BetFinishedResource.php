<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BetFinishedResource extends JsonResource
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
            'user_id' => $this->user_id,
            'title' => $this->title,
            'image' => $this->image,
            'status' => $this->status,
            'source1' => $this->source1,
            'source2' => $this->source2,
            'source3' => $this->source3,
            'description' => $this->description,
            'finish' => $this->finish,
            'budget' => $this->bits()->pluck('sum')->sum(),
            'winner' => AnswerResource::make($this->winnerAnswer),
        ];
    }
}
