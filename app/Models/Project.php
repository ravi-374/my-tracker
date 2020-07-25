<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * Class Project
 * @package App\Models
 * @version July 22, 2020, 9:58 am UTC
 *
 * @property string|unique $name
 * @property integer $client_id
 */
class Project extends Model
{

    public $table = 'projects';
    const TEAM_ARR = ['1' => 'Backend', '2' => 'Frontend', '3' => 'Mobile', '4' => 'QA'];

    public $fillable = [
        'name',
        'team',
        'description',
        'client_id',
        'created_by',
        'deleted_by',
        'prefix',
    ];


    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id'          => 'integer',
        'name'        => 'string',
        'team'        => 'integer',
        'description' => 'string',
        'client_id'   => 'integer',
        'created_by'  => 'integer',
        'deleted_by'  => 'integer',
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'name'      => 'required|unique:projects,name',
        'client_id' => 'required',
    ];
    public static $editRules = [
        'client_id' => 'required',
    ];
    public static $messages = [
        'name.unique' => 'Project with same name already exist.',
    ];

    /**
     * @return BelongsTo
     */
    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id');
    }

    /**
     * @return BelongsToMany
     */
    public function users()
    {
        return $this->belongsToMany('App\User')->withTimestamps();
    }
    /**
     * @return BelongsTo
     */
    public function createdUser()
    {
        return $this->belongsTo('App\User', 'created_by');
    }

    /**
     * @param $value
     */
    public function setPrefixAttribute($value)
    {
        $this->attributes['prefix'] = strtoupper($value);
    }

}
