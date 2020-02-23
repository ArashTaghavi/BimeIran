<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Marketer;

class MarketerWallet extends Model
{
    protected $hidden = [
        'created_at', 'updated_at'
    ];

    public function marketer()
    {
        return $this->belongsTo(Marketer::class);
    }
}
