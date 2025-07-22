<?php

namespace App\Models;

use App\Traits\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory,Filterable;

    protected $fillable = [
        'id',
        'name',
        'type',
        'category',
        'commission',
        'fix_fee',
        'logo',
        'link',
        'function',
    ];


    public function paymentLogs()
    {
        return $this->hasMany(Payment_log::class);
    }

    public function methods()
    {
        return $this->belongsToMany(PaymentMethod::class,'payments_payments_methods_table','payment_id','payment_method_id')
            ->withPivot(['FTD', 'FTD_limits', 'STD', 'STD_limits', 'order_by']);
    }

    public function conditions()
    {
        return $this->hasOne(PaymentsTrustCondition::class,'payment_id','id');
    }

    public function deposits()
    {
        return $this->hasMany(Deposit::class);
    }

    public function payouts()
    {
        return $this->hasMany(Payout::class);
    }

}
