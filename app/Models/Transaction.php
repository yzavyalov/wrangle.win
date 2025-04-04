<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

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
}
