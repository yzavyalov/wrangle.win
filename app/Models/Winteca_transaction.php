<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Winteca_transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'transactionable_id',
        'transactionable_type',
        'id_winteca',
        'status',
        'resolution',
        'amount',
        'payment_amount',
        'deposit',
        'currency',
        'reference_id',
        'fee',
    ];
    public function transactionable(): MorphTo
    {
        return $this->morphTo();
    }
}
