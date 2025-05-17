<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AlphaPoWallet extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'user_id',
        'foreign_id',
        'currency',
        'convert_to',
        'address',
        'tag',
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
