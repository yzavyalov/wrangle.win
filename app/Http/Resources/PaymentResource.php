<?php

namespace App\Http\Resources;

use App\Http\Enums\PaymentCategoryEnum;
use App\Http\Enums\PaymentTypeEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
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
            'name' => $this->name,
            'type' => $this->type,
            'type_name' => PaymentTypeEnum::from($this->type)->label(),
            'category' => $this->category,
            'category_name' => PaymentCategoryEnum::from($this->category)->label(),
            'commission' => $this->commission,
            'logo' => $this->logo,
            'link' => $this->link,
            'order_by' => optional($this->pivot)->order_by,
        ];
    }
}
