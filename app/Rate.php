<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Insurance;

class Rate extends Model
{
    public function insurance()
    {
        return $this->belongsTo(Insurance::class);
    }
}
