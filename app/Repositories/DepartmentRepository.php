<?php

namespace App\Repositories;

use App\Models\Department;
use App\Repositories\BaseRepository;
use Illuminate\Database\Query\Builder;

/**
 * Class DepartmentRepository
 * @package App\Repositories
 * @version July 21, 2020, 5:11 am UTC
*/

class DepartmentRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name'
    ];

    /**
     * Return searchable fields
     *
     * @return array
     */
    public function getFieldsSearchable()
    {
        return $this->fieldSearchable;
    }

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Department::class;
    }

    public function getDepartmentList()
    {
        /** @var Builder|Department $query */

        $query = Department::orderBy('name');
        return $query->pluck('name', 'id');
    }
}
