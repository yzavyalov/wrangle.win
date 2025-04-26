<?php

namespace App\Models;


use App\Traits\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BetCategory extends Model
{
    use HasFactory, Filterable;

    protected $table = 'bet_categories';
    public $fillable = [
        'id',
        'name',
        'menu_status',
    ];


    public function bets()
    {
        return $this->belongsToMany(Bet::class,'bet_bet_categories','bet_category_id','bet_id');
    }

    public function activeBets()
    {
        return $this->belongsToMany(Bet::class,'bet_bet_categories','bet_category_id','bet_id')
            ->where('status',3);
    }
}
