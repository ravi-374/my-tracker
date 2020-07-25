<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Client
 * @package App\Models
 * @version July 21, 2020, 10:15 am UTC
 *
 * @property string $name
 * @property string $email
 * @property string $website
 * @property string $department_id
 */
class Client extends Model
{


    public $table = 'clients';

    protected $dates = ['deleted_at'];

    public $fillable = [
        'name',
        'email',
        'website',
        'department_id',
        'created_by',
        'deleted_by',
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id'            => 'integer',
        'name'          => 'string',
        'email'         => 'string',
        'website'       => 'string',
        'deleted_by'    => 'integer',
        'department_id' => 'integer',
    ];
    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'name'          => 'required|unique:clients,name',
        'email'         => 'nullable|email|',
        'website'       => 'nullable',
        'department_id' => 'required|integer',
    ];
    public static $editRules = [
        'email'         => 'nullable|email|',
        'website'       => 'nullable',
        'department_id' => 'required|integer',
    ];

    public static $messages = [
        'website.regex'          => 'Please enter valid url.',
        'email.regex'            => 'Please enter valid email.',
        'department_id.required' => 'Please select valid department.',
    ];
    public function department()
    {
        return $this->belongsTo(Department::class);
    }

}
