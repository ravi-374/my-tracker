let tableName = '#role_table'
$(tableName).DataTable({
    processing: true,
    serverSide: true,
    'order': [[0, 'asc']],
    ajax: {
        url: '/roles',
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
                return '<a title="Edit" href="' + roleUrl + row.id +'/edit" class="btn btn-primary btn-sm edit-btn mr-1 text-white" data-id="' +
                    row.id + '">' +
                    '<i class="fas fa-pencil-alt"></i>' + '</a>' +
                    '<a title="Delete"  class="btn  btn-danger btn-sm delete-btn text-white"  data-id="' +
                    row.id + '">' +
                    '<i class="fas fa-trash"></i></a>';
            }, name: 'id',
        },
    ],
});
$(document).on('click', '.delete-btn', function (event) {
    let roleId = $(event.currentTarget).data('id')
    deleteItem(roleUrl + roleId, tableName, 'Role')
})
