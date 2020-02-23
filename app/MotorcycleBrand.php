<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MotorcycleBrand extends Model
{
    public function motorcycle_models()
    {
        return $this->hasMany(MotorcycleModel::class);
    }
}
