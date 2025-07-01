<?php

namespace App\Models;


use App\Traits\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Bet extends Model
{
    use HasFactory, Filterable;

    protected $fillable = [
        'id',
        'user_id',
        'list',
        'title',
        'image',
        'status',
        'source1',
        'source2',
        'source3',
        'description',
        'finish',
        'created_at',
        'winner_answer_id',
    ];

    public function owner()
    {
        return $this->belongsTo(User::class,'user_id','id');
    }

    public function categories()
    {
        return $this->belongsToMany(BetCategory::class,'bet_bet_categories','bet_id','bet_category_id');
    }

    public function answers()
    {
        return $this->hasMany(Answers::class);
    }

    public function winnerAnswer()
    {
        return $this->belongsTo(Answers::class, 'winner_answer_id');
    }

    public function bits()
    {
        return $this->hasMany(Bit::class,'bet_id');
    }

    public function favoritedBy(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'favorite_bets')->withTimestamps();
    }


}
