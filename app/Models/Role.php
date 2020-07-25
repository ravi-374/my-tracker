<?php

namespace App\Models;

use Eloquent as Model;

/**
 * Class Role
 * @package App\Models
 * @version July 23, 2020, 5:05 am UTC
 *
 */
class Role extends Model
{

    public $table = 'roles';

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    public $fillable = [
        'name'
    ];

    protected $casts = [
        'id' => 'integer'
    ];

    public static $rules = [
        'name' => 'required|unique:roles,name'
    ];


}
