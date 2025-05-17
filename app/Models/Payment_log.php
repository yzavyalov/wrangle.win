<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Payment_log extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'payment_id',
        'response',
    ];


    public function payment_logtable(): MorphTo
    {
        return $this->morphTo();
    }

    public function payment()
    {
        return $this->belongsTo(Payment::class);
    }
}
