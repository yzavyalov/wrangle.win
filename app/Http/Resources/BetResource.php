<?php

namespace App\Http\Resources;

use App\Http\Enums\BetStatusEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BetResource extends JsonResource
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
            'status_type' => $this->status instanceof BetStatusEnum
                ? $this->status->label()
                : BetStatusEnum::from($this->status)->label(),
            'source1' => $this->source1,
            'source2' => $this->source2,
            'source3' => $this->source3,
            'description' => $this->description,
            'finish' => $this->finish,
            'budget' => $this->bits()->pluck('sum')->sum(),
            'answers' => AnswerResource::collection($this->answers),
            'winner' => AnswerResource::make($this->winnerAnswer),
            'is_favorite' => $this->favoritedBy->contains(auth()->id()),
        ];
    }
}
