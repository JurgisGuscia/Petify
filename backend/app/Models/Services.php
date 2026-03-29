<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Services extends Model
{
    protected $table = 'services';

    public $timestamps = false;

    protected $fillable = [
        'pet_id',
        'date',
        'name_snapshot',
        'category_snapshot',
        'price_snapshot',
    ];

    public function pet()
    {
        return $this->belongsTo(Pets::class, 'pet_id');
    }
}