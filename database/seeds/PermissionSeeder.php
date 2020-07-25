<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permissions = [
            [
                'name'         => 'manage_clients'
            ],
            [
                'name'         => 'manage_projects'
            ],
            [
                'name'         => 'manage_users'
            ],
            [
                'name'         => 'manage_roles'
            ],

        ];
        foreach ($permissions as $permission) {
            Permission::create($permission);
        }
    }
}
