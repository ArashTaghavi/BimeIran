<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Wallet extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'amount'
    ];

    /**
     * The attributes that should be visible for arrays.
     *
     * @var array
     */
    protected $visible = [
        'amount'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
