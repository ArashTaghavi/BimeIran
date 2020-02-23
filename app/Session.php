<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class Session extends Model
{
    use RevisionableTrait;
    use SoftDeletes;
    
    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
