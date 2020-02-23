<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\MarketerAccount;
use App\MarketerCustomer;
use App\MarketerWallet;
use App\MarketerWithdraw;

class Marketer extends Model
{
    protected $hidden = [
        'password', 'token', 'created_at', 'updated_at'
    ];

    public function marketer_account()
    {
        return $this->hasOne(MarketerAccount::class);
    }

    public function marketer_wallet()
    {
        return $this->hasOne(MarketerWallet::class);
    }

    public function marketer_withdraw()
    {
        return $this->hasMany(MarketerWithdraw::class);
    }

    public function marketer_customer()
    {
        return $this->hasMany(MarketerCustomer::class);
    }
}
