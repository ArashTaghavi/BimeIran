<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Specialty;

class Medic extends Model
{
    public function specialties()
    {
        return $this->hasMany(Specialty::class);
    }
}
