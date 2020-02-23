<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;
use App\City;
use App\Order;
use App\Province;
use App\ToMarketer;
use App\Wallet;

class User extends Model
{
    use RevisionableTrait;

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'created_at', 'updated_at'
    ];

    protected $guarded = [];

    public function sessions()
    {
        return $this->hasMany(Session::class);
    }

    public function wallet()
    {
        return $this->hasOne(Wallet::class);
    }

    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function province()
    {
        return $this->belongsTo(Province::class);
    }

    public function to_marketer()
    {
        return $this->hasMany(ToMarketer::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
