<?php

use Illuminate\Database\Seeder;
use App\Models\Client;
class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Client::create(['department_id'=>'1','name'=>'c1']);
        Client::create(['department_id'=>'1','name'=>'c2']);
        Client::create(['department_id'=>'2','name'=>'c3']);
        Client::create(['department_id'=>'2','name'=>'c4']);
    }
}
