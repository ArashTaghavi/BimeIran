<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Province;
use App\User;

class City extends Model
{
    public function province()
    {
        return $this->belongsTo(Province::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
