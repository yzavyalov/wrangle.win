<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bit extends Model
{
    use HasFactory;

    protected $fillable = [
        'answer_id',
        'user_id',
        'bet_id',
        'sum',
        'created_at',
    ];

    public function answer()
    {
        return $this->belongsTo(Answers::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function bet()
    {
        return $this->belongsTo(Bet::class);
    }
}
