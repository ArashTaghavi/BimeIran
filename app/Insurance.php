<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Rate;

class Insurance extends Model
{
    public function rates()
    {
        return $this->hasMany(Rate::class);
    }
}
