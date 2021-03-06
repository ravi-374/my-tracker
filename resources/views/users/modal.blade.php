<div id="AddModal" class="modal fade" role="dialog" tabindex="-1">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">New User</h5>
                <button type="button" aria-label="Close" class="close" data-dismiss="modal">×</button>
            </div>
            {!! Form::open(['id'=>'addNewForm','files'=>true]) !!}
            <div class="modal-body">
                <div class="alert alert-danger" style="display: none" id="validationErrorsBox"></div>
                <div class="row">
                    <div class="form-group col-sm-12">
                        {!! Form::label('name', 'Name') !!}<span class="required">*</span>
                        {!! Form::text('name', null, ['id'=>'name','class' => 'form-control',]) !!}
                    </div>

                </div>
                <div class="row">
                    <div class="form-group col-sm-12">
                        {!! Form::label('email', 'Email') !!}<span class="required">*</span>
                        {!! Form::text('email', null, ['id'=>'email','class' => 'form-control']) !!}
                    </div>
                </div>

                <div class="row">
                    <div class="form-group col-sm-6">
                        {!! Form::label('password', 'New Password') !!}<span class="required confirm-pwd">*</span>
                        <div class="input-group">
                            <input class="form-control input-group__addon" id="new_password" type="password" name="password">
                            <div class="input-group-append input-group__icon">
                                <span class="input-group-text changeType">
                                    <i class="icon-ban icons"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        {!! Form::label('password_confirmation', 'Confirm Password') !!}<span class="required confirm-pwd">*</span>
                        <div class="input-group">
                            <input class="form-control input-group__addon" id="new_confirm_password" type="password" name="password_confirmation">
                            <div class="input-group-append input-group__icon">
                                <span class="input-group-text changeType">
                                    <i class="icon-ban icons"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-12">
                        {!! Form::label('role_id', 'Role') !!}<span class="required">*</span>
                        {!! Form::select('role_id', $roles, null, ['class' => 'form-control', 'id' => 'roleId','placeholder'=>'Select Role', 'required']) !!}
                    </div>
                </div>

                <div class="text-right">
                    {!! Form::button('Save', ['type'=>'submit','class' => 'btn btn-primary','id'=>'btnSave','data-loading-text'=>"<span class='spinner-border spinner-border-sm'></span> Processing..."]) !!}
                    <button type="button" class="btn btn-light ml-1" data-dismiss="modal">Cancel</button>
                </div>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
</div>
