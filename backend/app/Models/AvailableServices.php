<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AvailableServices extends Model
{
    protected $table = 'availableServices';

    protected $fillable = [
        'name',
        'available',
        'serviceCategories_id',
        'description'
    ];

    public function category()
    {
        return $this->belongsTo(ServiceCategories::class, 'serviceCategories_id');
    }
}