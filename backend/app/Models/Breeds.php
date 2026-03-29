<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Breeds extends Model
{
    protected $table = 'breeds';

    protected $fillable = [
        'name',
        'petTypes_id'
    ];

    /**
     * Each breed belongs to a pet type
     */
    public function petType()
    {
        return $this->belongsTo(PetTypes::class, 'petTypes_id');
    }
}