<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'type',
        'category',
        'commission',
        'fix_fee',
        'logo',
        'link',
    ];


    public function paymentLogs()
    {
        return $this->hasMany(Payment_log::class);
    }
}
