<?php

namespace App\Models;

use App\Http\Filters\FilterInterface;
use App\Traits\Filterable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model
{
    use HasFactory, Filterable;

    protected $table = 'payment_methods';

    protected $fillable = [
        'id',
        'type',
        'category',
        'title',
        'logo',
        'currency',
    ];

    public function payments()
    {
        return $this->belongsToMany(Payment::class,'payments_payments_methods_table','payment_method_id','payment_id')
            ->withPivot(['FTD', 'FTD_limits', 'STD', 'STD_limits', 'order_by']);
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
