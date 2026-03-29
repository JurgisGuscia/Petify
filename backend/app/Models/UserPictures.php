<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserPictures extends Model
{
    protected $table = 'userPictures';
    public $timestamps = false;
    protected $fillable = [
        'url',
        'users_id'
    ];

    public function user()
    {
        return $this->belongsTo(Users::class, 'users_id');
    }
}