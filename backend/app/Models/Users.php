<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
    protected $table = 'users';

    protected $primaryKey = 'id';

    public $timestamps = false;

    protected $fillable = [
        'username',
        'password',
        'firstName',
        'lastName',
        'dateOfBirth',
        'priceProfiles_id',
        'userType',
    ];
}