<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Auth::routes(['verify' => true]);
Route::middleware('auth')->group( function () {
    Route::get('/home', 'HomeController@index')->middleware('verified');
    Route::get('users/{user}/edit', 'UserController@edit')->name('users.edit');
    Route::post('users/profile-update', 'UserController@profileUpdate')->name('update-profile');
    Route::post('users/change-password', 'UserController@changePassword')->name('change-password');
    Route::resource('departments', 'DepartmentController');
    Route::post('departments/{department}/update', 'DepartmentController@update');

    Route::middleware('permission:manage_clients')->group(function (){
        Route::resource('clients', 'ClientController');
    });
    Route::middleware('permission:manage_projects')->group(function (){
        Route::resource('projects', 'ProjectController');
    });
    Route::resource('roles', 'RoleController')->middleware('permission:manage_roles');

    Route::middleware('permission:manage_users')->group(function (){
        Route::resource('users', 'UserController');
    });

});
