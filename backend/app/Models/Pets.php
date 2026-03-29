<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pets extends Model
{
    protected $table = 'pets';
    public $timestamps = false;
    protected $fillable = [
        'name',
        'users_id',
        'breeds_id',
    ];

    public function user()
    {
        return $this->belongsTo(Users::class, 'users_id');
    }

    public function breed()
    {
        return $this->belongsTo(Breeds::class, 'breeds_id');
    }
}