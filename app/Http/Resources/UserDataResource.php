<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserDataResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->name,
            'email' => $this->email,
            'balance' => BalanceResource::make($this->balance),
            'transactions' => TransactionResource::collection($this->transactions),
            'bits' => BitResource::collection($this->bits),
        ];
    }
}
