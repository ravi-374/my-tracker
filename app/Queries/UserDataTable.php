<?php
namespace App\Queries;

use App\User;
use Illuminate\Database\Eloquent\Builder;

/**
 * Class UserDataTable.
 */
class UserDataTable
{
    /**
     * @return User|Builder
     */
    public function get()
    {
        /** @var User $query */
        $query = User::query();

        return $query;
    }
}
