<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class news extends Model
{
    protected $hidden = [
        'created_at', 'updated_at'
    ];
}
