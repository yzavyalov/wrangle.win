<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bonus extends Model
{
    use HasFactory;

    protected $fillable = [
                'id',
                'title',
                'type',
                'description',
                'amount',
                'amount_type',
    ];
}
