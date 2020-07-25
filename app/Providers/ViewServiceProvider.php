<?php

namespace App\Providers;
use App\Models\Client;
use App\Models\Company;

use Illuminate\Support\ServiceProvider;
use View;

class ViewServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        View::composer(['projects.fields'], function ($view) {
            $clientItems = Client::pluck('name','id')->toArray();
            $view->with('clientItems', $clientItems);
        });
        View::composer(['customers.fields'], function ($view) {
            $companyItems = Company::pluck('name','id')->toArray();
            $view->with('companyItems', $companyItems);
        });
        View::composer(['empolyees.fields'], function ($view) {
            $companyItems = Company::pluck('name','id')->toArray();
            $view->with('companyItems', $companyItems);
        });
        View::composer(['empolyees.fields'], function ($view) {
            $companyItems = Company::pluck('name','id')->toArray();
            $view->with('companyItems', $companyItems);
        });
        //
    }
}