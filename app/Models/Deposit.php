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
        'transaction_id',
        'payment_id',
        'payment_method_id',
        'limit',
        'sum',
        'last_amount',
        'currency',
        'status',
    ];


    public function paymentLogs(): MorphMany
    {
        return $this->morphMany(Payment_log::class,'payment_logtable');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function payment()
    {
        return $this->belongsTo(Payment::class);
    }

    public function paymnetMethod()
    {
        return $this->belongsTo(PaymentMethod::class,'payment_method_id');
    }

    public function transactionable()
    {
        return $this->morphMany(Winteca_transaction::class,'transactionable');
    }

    public function transaction()
    {
        return $this->belongsTo(Transaction::class, 'transaction_id');
    }
}
