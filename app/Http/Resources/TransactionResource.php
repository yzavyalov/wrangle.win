<?php

namespace App\Http\Resources;


use App\Http\Enums\TransactionMethodEnum;
use App\Http\Enums\TransactionOperationEnum;
use App\Http\Enums\TransactionStatusEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
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
            'date' => $this->created_at,
            'operation' => TransactionOperationEnum::from($this->operation)->value,
            'operation_name' => TransactionOperationEnum::from($this->operation)->label(),
            'status' => TransactionStatusEnum::from($this->status)->value,
            'status_name' => TransactionStatusEnum::from($this->status)->label(),
            'method' => TransactionMethodEnum::from($this->method)->value,
            'method_name' => TransactionMethodEnum::from($this->method)->label(),
            'sum' => $this->sum,
            'remaining' => $this->remaining,
            'comment' => $this->comment,
        ];
    }
}
