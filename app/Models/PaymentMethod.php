<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model
{
    use HasFactory;

    protected $table = 'payment_methods';

    protected $fillable = [
        'id',
        'type',
        'category',
        'title',
        'logo',
        'comission',
        'fixfee',
    ];

    public function payments()
    {
        return $this->belongsToMany(Payment::class,'payments_payments_methods_table','payment_method_id','payment_id')
            ->withPivot(['FTD', 'FTD_limits', 'STD', 'STD_limits', 'order_by']);
    }
}
