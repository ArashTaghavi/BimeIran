<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\CarBrand;

class CarModel extends Model
{
    public function car_brand()
    {
        return $this->belongsTo(CarBrand::class);
    }
}
