<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Deposit extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'user_id',
        'payment_id',
        'sum',
        'currency',
        'status',
    ];


    public function paymentLogs(): MorphMany
    {
        return $this->morphMany(Payment_log::class,'payment_logtable');
    }
}
