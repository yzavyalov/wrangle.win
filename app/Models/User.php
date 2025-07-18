<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Http\Enums\BetStatusEnum;
use App\Http\Enums\TransactionOperationEnum;
use App\Models\Auth\SocialAccount;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_code',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function mybets()
    {
        return $this->hasMany(Bet::class, 'user_id', 'id')
            ->where(function ($query) {
                $query->where('list', '!=', 1)
                    ->orWhereNull('list');
            });
    }

    public function balance()
    {
        return $this->hasOne(Balance::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class,'user_id','id');
    }

    public function lastTransaction()
    {
        return $this->hasOne(Transaction::class)->latestOfMany();
    }

    public function debitTransactions()
    {
        return $this->hasMany(Transaction::class,'user_id','id')->where('operation',TransactionOperationEnum::DEBET);
    }

    public function bits()
    {
        return $this->hasMany(Bit::class);
    }

    public function favoriteBets(): BelongsToMany
    {
        return $this->belongsToMany(Bet::class, 'favorite_bets')->withTimestamps();
    }

    public function socialAccounts()
    {
        return $this->hasMany(SocialAccount::class);
    }


    public function sendPasswordResetNotification($token)
    {
        $this->notify(new \App\Notifications\ResetPasswordNotification($token));
    }

    public function cryptoWallets()
    {
        return $this->hasMany(AlphaPoWallet::class);
    }

    public function deposits()
    {
        return $this->hasMany(Deposit::class);
    }

    public function payouts()
    {
        return $this->hasMany(Payout::class);
    }

}
