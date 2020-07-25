<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Department
 * @package App\Models
 * @version July 21, 2020, 5:11 am UTC
 *
 * @property string $name
 */
class Department extends Model
{


    public $table = 'departments';

    protected $dates = ['deleted_at'];

    public $fillable = [
        'name'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'name' => 'string'
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'name' => 'string|required|unique:departments,name'
    ];
    public function projects()
    {
        return $this->hasMany(Project::class);
    }

}
