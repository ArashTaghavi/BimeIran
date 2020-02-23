<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Marketer;

class MarketerCustomer extends Model
{
    protected $hidden = [
        'created_at', 'updated_at'
    ];
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'marketer_id', 'full_name', 'national_code', 'phone', 'address', 'created_at', 'updated_at'
    ];

    public function marketer()
    {
        return $this->belongsTo(Marketer::class);
    }
}
