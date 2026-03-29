<?php 
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PetTypes extends Model
{
    protected $table = 'petTypes';

    protected $fillable = [
        'type'
    ];

    /**
     * One pet type has many breeds
     */
    public function breeds()
    {
        return $this->hasMany(Breeds::class, 'petTypes_id');
    }
}