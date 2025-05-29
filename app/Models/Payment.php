<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'type',
        'category',
        'commission',
        'fix_fee',
        'logo',
        'link',
    ];


    public function paymentLogs()
    {
        return $this->hasMany(Payment_log::class);
    }

    public function methods()
    {
        return $this->belongsToMany(PaymentMethod::class,'payments_payments_methods_table','payment_id','payment_method_id');
    }

    public function conditions()
    {
        return $this->hasOne(PaymentsTrustCondition::class,'payment_id','id');
    }

}
