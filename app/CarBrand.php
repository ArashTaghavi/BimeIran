<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\CarModel;

class CarBrand extends Model
{
    public function car_models()
    {
        return $this->hasMany(CarModel::class);
    }
}
