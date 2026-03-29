<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PetPictures extends Model
{
    protected $table = 'petPictures'; 
    public $timestamps = false;
    protected $fillable = [
        'url',
        'pets_id',
    ];

    public function pet()
    {
        return $this->belongsTo(Pets::class, 'pets_id');
    }
}