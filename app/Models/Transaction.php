<?php

namespace App\Models;

use App\Traits\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory, Filterable;

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
