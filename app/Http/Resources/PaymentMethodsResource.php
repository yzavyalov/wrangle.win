<?php

namespace App\Http\Resources;

use App\Http\Enums\PaymentCategoryEnum;
use App\Http\Enums\PaymentTypeEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentMethodsResource extends JsonResource
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
            'type' => $this->type,
            'type_name' => PaymentTypeEnum::from($this->type)->label(),
            'category' => $this->category,
            'category_name' => PaymentCategoryEnum::from($this->category)->label(),
            'title' => $this->title,
            'logo' => $this->logo,
            'payments' => PaymentResource::collection($this->payments),
        ];
    }
}
