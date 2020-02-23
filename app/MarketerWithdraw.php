<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Marketer;

class MarketerWithdraw extends Model
{
    public function marketer()
    {
        return $this->belongsTo(Marketer::class);
    }
}
