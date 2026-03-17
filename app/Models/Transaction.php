<?php

namespace App\Models;

use App\Traits\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Transaction extends Model
{
    use HasFactory, Filterable;

    protected $fillable = [
        'id',
        'user_id',
        'operation',
        'status',
        'method',
        'sum',
        'remaining',
        'comment',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function deposit(): HasOne
    {
        return $this->hasOne(Deposit::class)->withDefault();
    }

    public function payout(): HasOne
    {
        return $this->hasOne(Payout::class)->withDefault();
    }
}
