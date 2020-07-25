<?php

namespace App\Repositories;

use App\Repositories\BaseRepository;
use Spatie\Permission\Models\Role;

/**
 * Class RoleRepository
 * @package App\Repositories
 * @version July 23, 2020, 5:05 am UTC
*/

class RoleRepository extends BaseRepository
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
        return Role::class;
    }

    /**
     * @return mixed
     */
    public function getRolesList()
    {
        return Role::orderBy('name')->pluck('name', 'id');
    }

    /**
     * @param array $input
     *
     * @return Role
     */
    public function store($input)
    {
        $role = Role::create([ 'name' => $input['name']]);
        if (isset($input['permissions']) && !empty($input['permissions'])) {
            $role->syncPermissions($input['permissions']);
        }

        return $role->fresh();
    }

    /**
     * @param array $input
     * @param int   $id
     *
     * @return Role
     */
    public function update($input,$id)
    {
        $role = Role::findOrFail($id);
        $role->update(['name' => $input['name']]);

        if (isset($input['permissions']) && !empty($input['permissions'])) {
            $role->syncPermissions($input['permissions']);
        }
        return $role->fresh();
    }

}
