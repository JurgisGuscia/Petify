<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PriceProfiles extends Model
{
    protected $table = 'priceProfiles'; 

    public $timestamps = false;

    protected $fillable = [
        'name',
        'discount',
    ];
}