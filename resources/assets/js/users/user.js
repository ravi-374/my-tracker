$(function () {
    $('#projectId,#editProjectId').select2({
        width: '100%',
    })
    $('#roleId,#editRoleId').select2({
        width: '100%',
        placeholder: 'Select Role',
        minimumResultsForSearch: -1,
    })
});

$(document).ready(function () {
    $('input').attr('autocomplete', 'false');
});

var tbl = $('#users_table').DataTable({
    processing: true,
    serverSide: true,
    'order': [[0, 'asc']],
    ajax: {
        url: usersUrl,
    },
    columnDefs: [
        {
            'targets': [2],
            'className': 'text-center',
            'width': '12%',
        },
        {
            'targets': [3],
            'className': 'text-center',
            'width': '12%',
        },
    ],
    columns: [
        {
            data: 'name',
            name: 'name',
        },
        {
            data: 'email',
            name: 'email',
        },
        {
            data: 'role_name',
            name: 'role_name',
        },
        {
            data: function (row) {
                return '<a title="View" href="' + usersUrl + row.id +'" class="btn action-btn btn-info btn-sm edit-btn mr-1" data-id="' +
                    row.id + '">' +
                    '<i class="far fa-eye action-icon"  style="color:#3c8dbc"></i>' +
                    '</a>' +
                    '<a title="Edit" class="btn action-btn btn-primary btn-sm edit-btn mr-1" data-id="' +
                    row.id + '">' +
                    '<i class="cui-pencil action-icon"  style="color:#3c8dbc"></i>' +
                    '</a>' +

                    '<a title="Delete" class="btn action-btn btn-danger btn-sm delete-btn" data-id="' +
                    row.id + '">' +
                    '<i class="cui-trash action-icon text-danger"></i></a>'
            }, name: 'id',
        },
    ],
});

$('#users_table').on('draw.dt', function () {
    $('[data-toggle="tooltip"]').tooltip()
});

window.renderData = function (url) {
    $.ajax({
        url: url,
        type: 'GET',
        success: function (result) {
            if (result.success) {
                let user = result.data
                $('#userId').val(user.id)
                $('#edit_name').val(user.name)
                $('#edit_email').val(user.email)
                $('#EditModal').modal('show')
            }
        },
        error: function (error) {
            manageAjaxErrors(error)
        },
    })
};



$(function () {
    // create new user
    $('#addNewForm').submit(function (event) {
        event.preventDefault()
        var loadingButton = jQuery(this).find('#btnSave')
        loadingButton.button('loading')
        $.ajax({
            url: createUserUrl,
            type: 'POST',
            data: $(this).serialize(),
            success: function (result) {
                if (result.success) {
                    displaySuccessMessage(result.message)
                    $('#AddModal').modal('hide')
                    $('#users_table').DataTable().ajax.reload(null, false)
                }
            },
            error: function (result) {
                printErrorMessage('#validationErrorsBox', result)
            },
            complete: function () {
                loadingButton.button('reset')
            },
        })
    });

    // update user
    $('#editForm').submit(function (event) {
        event.preventDefault()
        var loadingButton = jQuery(this).find('#btnEditSave')
        loadingButton.button('loading')
        var id = $('#userId').val()
        $.ajax({
            url: usersUrl + id,
            type: 'put',
            data: $(this).serialize(),
            success: function (result) {
                if (result.success) {
                    displaySuccessMessage(result.message)
                    $('#EditModal').modal('hide')
                    $('#users_table').DataTable().ajax.reload(null, false)
                }
            },
            error: function (error) {
                manageAjaxErrors(error)
            },
            complete: function () {
                loadingButton.button('reset')
            },
        })
    });

    $('#AddModal').on('hidden.bs.modal', function () {
        $('#projectId').val(null).trigger('change')
        resetModalForm('#addNewForm', '#validationErrorsBox')
    });

    $('#EditModal').on('hidden.bs.modal', function () {
        resetModalForm('#editForm', '#editValidationErrorsBox')
    });

    // open edit user model
    $(document).on('click', '.edit-btn', function (event) {
        let userId = $(event.currentTarget).data('id')
        renderData(usersUrl + userId + '/edit')
    })

    // open delete confirmation model
    $(document).on('click', '.delete-btn', function (event) {
        let userId = $(event.currentTarget).data('id')
        deleteItem(usersUrl + userId, '#users_table', 'User')
    });


});
