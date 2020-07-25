<?php

namespace App\Queries;

use App\Models\Role;
use Illuminate\Database\Query\Builder;

/**
 * Class RoleDataTable.
 */
class RoleDataTable
{
    /**
     * @return Department|Builder
     */
    public function get()
    {
        /** @var Department $query */
        $query = Role::query();

        return $query;
    }
}
