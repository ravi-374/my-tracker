<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Requests\CreateDepartmentRequest;
use App\Http\Requests\UpdateDepartmentRequest;
use App\Models\Department;
use App\Queries\DepartmentDataTable;
use App\Repositories\DepartmentRepository;
use DebugBar;
use Flash;
use App\Http\Controllers\AppBaseController;
use Illuminate\Http\Request;
use DataTables;
use Response;

class DepartmentController extends AppBaseController
{
    /** @var  DepartmentRepository */
    private $departmentRepository;

    public function __construct(DepartmentRepository $departmentRepo)
    {
        $this->departmentRepository = $departmentRepo;
    }

    /**
     * Display a listing of the Department.
     *
     * @param DepartmentDataTable $departmentDataTable
     * @return Response
     */
    public function index(Request $request)
    {
        if ($request->ajax()) {
            return DataTables::of((new DepartmentDataTable())->get())->make(true);
        }

        return view('departments.index');
    }


    /**
     * Store a newly created Department in storage.
     *
     * @param CreateDepartmentRequest $request
     *
     * @return Response
     */
    public function store(CreateDepartmentRequest $request)
    {
        $input = $request->all();

        $this->departmentRepository->create($input);

        return $this->sendSuccess('Department created successfully.');
    }


    /**
     * Show the form for editing the specified Department.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function edit(Department $department)
    {
        return $this->sendResponse($department, 'Department retrieved successfully.');
    }

    /**
     * Update the specified Department in storage.
     *
     * @param  int              $id
     * @param UpdateDepartmentRequest $request
     *
     * @return Response
     */
    public function update(Department $department,UpdateDepartmentRequest $request)
    {
        $this->departmentRepository->update($request->all(), $department->id);

        return $this->sendSuccess('Department updated successfully.');
    }

    /**
     * Remove the specified Department from storage.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy(Department $department)
    {
        $this->departmentRepository->delete($department->id);

        return $this->sendSuccess('Department deleted successfully.');

    }
}
