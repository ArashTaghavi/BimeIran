<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class ToMarketer extends Model
{
    protected $hidden = [
        'created_at', 'updated_at'
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
