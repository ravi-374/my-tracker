<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserProfileRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Queries\UserDataTable;
use App\Repositories\RoleRepository;
use App\Repositories\UserRepository;
use App\User;
use DataTables;
use Exception;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\View\View;

/**
 * Class UserController.
 */
class UserController extends AppBaseController
{
    /** @var UserRepository */
    private $userRepository;


    /**
     * UserController constructor.
     *
     * @param UserRepository $userRepo
     */
    public function __construct(UserRepository $userRepo)
    {
        $this->userRepository = $userRepo;

    }

    public function index(Request $request,RoleRepository $roleRepository)
    {
        if ($request->ajax()) {
            return Datatables::of((new UserDataTable())->get())->addColumn('role_name',function (User $user){
                return $user->roles()->pluck('name')->toArray();
            })->make(true);
        }
        $roles = $roleRepository->getRolesList();
        return view('users.index',compact('roles'));
    }

    /**
     * Store a newly created User in storage.
     *
     * @param CreateUserRequest $request
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function store(CreateUserRequest $request)
    {
        $input = $request->all();

        $this->userRepository->store($input);

        return $this->sendSuccess('User created successfully.');
    }

    public function show(User $user)
    {
        return view('users.show',compact('user'));
    }

    /**
     * @param User $user
     * @return JsonResponse
     */
    public function edit(User $user)
    {
        $userObj = $user->toArray();
        return $this->sendResponse($userObj, 'User retrieved successfully.');
    }

    /**
     * @param \App\Models\User $user
     * @param UpdateUserRequest $request
     * @return JsonResponse
     */
    public function update(User $user, UpdateUserRequest $request)
    {
        $input = $request->all();

        $this->userRepository->update($input, $user->id);

        return $this->sendSuccess('User updated successfully.');
    }
    /**
     * Remove the specified User from storage.
     *
     * @param User $user
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function destroy(User $user)
    {
        $this->userRepository->delete($user->id);

        return $this->sendSuccess('User deleted successfully.');
    }

    /**
     * @param UpdateUserProfileRequest $request
     *
     * @return JsonResponse
     */
    public function profileUpdate(UpdateUserProfileRequest $request)
    {
        $input = $request->all();

        $this->userRepository->profileUpdate($input);

        return $this->sendSuccess('Profile updated successfully.');
    }

    /**
     * @param ChangePasswordRequest $request
     *
     * @return JsonResponse
     */
    public function changePassword(ChangePasswordRequest $request)
    {
        $input = $request->all();

        /** @var User $user */
        $user = Auth::user();

        if (!Hash::check($input['password_current'], $user->password)) {
            return $this->sendError('Current password is invalid.');
        }

        $input['password'] = Hash::make($input['password']);
        $user->update($input);

        return $this->sendSuccess('Password updated successfully.');
    }


}
