<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answers extends Model
{
    use HasFactory;

    protected $table = 'answers';

    protected $fillable = [
        'description'
    ];

    public function bet()
    {
        return $this->belongsTo(Bet::class,'bet_id','id');
    }

    public function bits()
    {
        return $this->hasMany(Bit::class,'answer_id','id');
    }

    public function winBet()
    {
        return $this->hasOne(Bet::class, 'winner_answer_id');
    }
}
