<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\City;
use App\User;

class Province extends Model
{
    public function city()
    {
        return $this->hasMany(City::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
