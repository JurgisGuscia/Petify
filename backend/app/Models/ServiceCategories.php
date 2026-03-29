<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceCategories extends Model
{
    protected $table = 'serviceCategories';

    protected $fillable = [
        'name'
    ];

    public function services()
    {
        return $this->hasMany(AvailableServices::class, 'serviceCategories_id');
    }
}