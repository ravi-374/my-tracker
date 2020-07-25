@extends('layouts.app')
@section('title')
    Users
@endsection
@section('content')
    <div class="container-fluid">
        <div class="animated fadeIn">
            <div class="page-header">
                <h3 class="page__heading"></h3>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="card shadow border-0">
                        <div class="card-body ">
                            <div class="row">
                                <div class="col-5 ">
                                    <div class="d-flex justify-content-center w-50">
                                        <img src="{{ $user->image_path }}" class="img-avatar" style="height: 50px"/>
                                    </div>

                                    <div class="row mt-4 ">
                                        <div class="col-4 ml-5">
                                            <h5>Name:</h5>
                                            <h5>Email:</h5>
                                            <h5>Roles Name:</h5>
                                            <h5>Total Permission:</h5>
                                        </div>
                                        <div class="col-4">
                                            <h5>{{ ucfirst($user->name) }}</h5>
                                            <h5>{{ $user->email }}</h5>
                                            <h5>{{ implode(',', $user->roles()->pluck('name')->toArray()) }}</h5>
                                            <h5>{{ $user->getAllPermissions()->count() }}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 pl-0 ml-3">
                                        <h2>Permissions</h2>
                                        <ul class="list-group list-group-flush w-50 mt-4">
                                            @foreach($user->getAllPermissions() as $value)
                                                <li class="list-group-item border-0 h5 border-dark">{{ ucfirst($value->name) }}</li>
                                            @endforeach
                                        </ul>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection


