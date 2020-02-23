<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\CarBrand;

class MotorcycleModel extends Model
{
    public function motorcycle_brand()
    {
        return $this->belongsTo(MotorcycleBrand::class);
    }
}
