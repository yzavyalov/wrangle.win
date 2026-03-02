<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CryptoWallet extends Model
{
    use HasFactory;

    protected $table = 'crypto_wallets';

    protected $fillable = [
        'id',
        'user_id',
        'payment_methods_id',
        'currency',
        'address',
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
