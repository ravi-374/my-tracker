$('#departments-table').DataTable({
    processing: true,
    serverSide: true,
    'order': [[0, 'asc']],
    ajax: {
        url: '/departments',
    },
    columnDefs: [
        {
            'targets': [1],
            'orderable': false,
            'className': 'text-center',
            'width': '10%',
        },
    ],
    columns: [
        {
            data: 'name',
            name: 'name',
        },
        {
            data: function (row) {
                return '<a title="Edit" class="btn btn-primary btn-sm edit-btn mr-1 text-white" data-id="' +
                    row.id + '">' +
                    '<i class="fas fa-pencil-alt"></i>' + '</a>' +
                    '<a title="Delete"  class="btn  btn-danger btn-sm delete-btn text-white"  data-id="' +
                    row.id + '">' +
                    '<i class="fas fa-trash"></i></a>';
            }, name: 'id',
        },
    ],
});

$('#addNewForm').submit(function (event) {
    event.preventDefault();
    var loadingButton = jQuery(this).find('#btnSave');
    loadingButton.button('loading');
    $.ajax({
        url: departmentCreateUrl,
        type: 'POST',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                $('#AddModal').modal('hide');
                $('#departments-table').DataTable().ajax.reload(null, false);
            }
        },
        error: function (result) {
                printErrorMessage('#validationErrorsBox', result);
        },
        complete: function () {
            loadingButton.button('reset');
        },
    });
});
$('#editForm').submit(function (event) {
    event.preventDefault();
    var loadingButton = jQuery(this).find('#btnEditSave');
    loadingButton.button('loading');
    var id = $('#departmentId').val();
    console.log(departmentUrl + id + '/update')

    $.ajax({
        url: departmentUrl + id + '/update',
        type: 'post',
        data: $(this).serialize(),
        success: function (result) {
            if (result.success) {
                $('#EditModal').modal('hide');
                $('#departments-table').DataTable().ajax.reload(null, false);
            }
        },
        error: function (result) {
            console.log(result)

        },
        complete: function () {
            loadingButton.button('reset');
        },
    });
});
$('#AddModal').on('hidden.bs.modal', function () {
    resetModalForm('#addNewForm', '#validationErrorsBox');
});

$('#EditModal').on('hidden.bs.modal', function () {
    resetModalForm('#editForm', '#editValidationErrorsBox');
});
$(document).on('click', '.edit-btn', function (event) {
    let departmentId = $(event.currentTarget).data('id');
    renderData(departmentId);
});

$(document).on('click', '.delete-btn', function (event) {
    let departmentId = $(event.currentTarget).data('id');
    // console.log(departmentId)
    deleteItem(departmentUrl + departmentId, '#departments-table',
        'Department');
});


