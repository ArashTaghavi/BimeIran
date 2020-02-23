<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Receiver;
use App\Transaction;
use App\User;

class Order extends Model
{
    public function receiver()
    {
        return $this->hasOne(Receiver::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
