<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServicePrices extends Model
{
    protected $table = 'servicePrices'; 

    protected $fillable = [
        'price',
        'availableServices_id',
    ];

    public function service()
    {
        return $this->belongsTo(AvailableServices::class, 'availableServices_id');
    }
}