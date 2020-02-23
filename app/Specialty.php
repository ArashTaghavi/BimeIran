<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Medic;

class Specialty extends Model
{
    public function medic()
    {
        return $this->belongsTo(Medic::class);
    }
}
