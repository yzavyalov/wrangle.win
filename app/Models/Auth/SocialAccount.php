<?php

namespace App\Models\Auth;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SocialAccount extends Model
{
    use HasFactory;

    protected $table='social_accounts';
    protected $guarded = false;

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
