<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentsTrustCondition extends Model
{
    use HasFactory;

    protected $table = 'payments_trust_conditions';

    protected $fillable = [
        'id',
        'payment_id',
        'number_deposits',
        'value_deposits',
        'number_withdraw',
        'value_withdraw',
        'registration_days',
    ];

    public function payment()
    {
        return $this->belongsTo(Payment::class,'payment_id','id');
    }
}
