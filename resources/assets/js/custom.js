$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
    },
})
window.onload = function () {
    window.startLoader = function () {
        $('.infy-loader').show()
    }

    window.stopLoader = function () {
        $('.infy-loader').hide()
    }

// infy loader js
    stopLoader()
}

$.extend($.fn.dataTable.defaults, {
    'paging': true,
    'info': true,
    'ordering': true,
    'autoWidth': false,
    'pageLength': 10,
    'language': {
        'search': '',
        'sSearch': 'Search',
        'sProcessing': getSpinner(),
    },
    'preDrawCallback': function () {
        customSearch()
    },
})

function customSearch () {
    $('.dataTables_filter input').addClass('form-control')
    $('.dataTables_filter input').attr('placeholder', 'Search')
}
function getSpinner () {
    return '<div id="infyLoader" class="infy-loader">\n' +
        '    <svg width="150px" height="75px" viewBox="0 0 187.3 93.7" preserveAspectRatio="xMidYMid meet"\n' +
        '         style="left: 50%; top: 50%; position: absolute; transform: translate(-50%, -50%) matrix(1, 0, 0, 1, 0, 0);">\n' +
        '        <path stroke="#00c6ff" id="outline" fill="none" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"\n' +
        '              stroke-miterlimit="10"\n' +
        '              d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 \t\t\t\tc-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"/>\n' +
        '        <path id="outline-bg" opacity="0.05" fill="none" stroke="#f5981c" stroke-width="5" stroke-linecap="round"\n' +
        '              stroke-linejoin="round" stroke-miterlimit="10"\n' +
        '              d="\t\t\t\tM93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 \t\t\t\tc-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"/>\n' +
        '    </svg>\n' +
        '</div>'
}
window.displaySuccessMessage = function (message) {
    $.toast({
        heading: 'Success',
        text: message,
        showHideTransition: 'slide',
        icon: 'success',
        position: 'top-right',
    })
}
window.printErrorMessage = function (selector, errorResult) {
    $(selector).show().html('')
    console.log(errorResult)
    $(selector).text(errorResult.responseJSON.message)
}

window.resetModalForm = function (formId, validationBox) {
    $(formId)[0].reset()
    $(validationBox).hide()
}
window.renderData = function (id) {
    $.ajax({
        url: departmentUrl + id + '/edit',
        type: 'GET',
        success: function (result) {
            if (result.success) {
                let department = result.data;
                $('#departmentId').val(department.id);
                $('#edit_name').val(department.name);
                $('#EditModal').modal('show');
            }
        },
        error: function (result) {
            console.log(result)
        },
    });
};
window.deleteItem = function (url, tableId, header, callFunction = null) {
    swal({
            title: 'Delete !',
            text: 'Are you sure you want to delete this "' + header + '" ?',
            type: 'warning',
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            confirmButtonColor: '#5cb85c',
            cancelButtonColor: '#d33',
            cancelButtonText: 'No',
            confirmButtonText: 'Yes',
        },
        function () {
            deleteItemAjax(url, tableId, header, callFunction = null)
        })
}
window.deleteItemInputConfirmation = function (
    url, tableId, header, alertMessage, callFunction = null) {
    swal({
            type: 'input',
            inputPlaceholder: 'Please type "delete" to delete this ' + header +
                '.',
            title: 'Delete !',
            text: alertMessage,
            html: true,
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            confirmButtonColor: '#5cb85c',
            cancelButtonColor: '#d33',
            cancelButtonText: 'No',
            confirmButtonText: 'Yes',
            imageUrl: baseUrl + 'images/warning.png',
        },
        function (inputVal) {
            if (inputVal === false) {
                return false
            }
            if (inputVal == '' || inputVal.toLowerCase() != 'delete') {
                swal.showInputError(
                    'Please type "delete" to delete this client.')
                $('.sa-input-error').css('top', '23px!important')
                return false
            }
            if (inputVal.toLowerCase() === 'delete') {
                deleteItemAjax(url, tableId, header, callFunction = null)
            }
        })
}
function deleteItemAjax (url, tableId, header, callFunction = null) {
    console.log(url);
    $.ajax({
        url: url,
        type: 'DELETE',
        dataType: 'json',
        success: function (obj) {
            if (obj.success) {
                $(tableId).DataTable().ajax.reload(null, false)
            }
            swal({
                title: 'Deleted!',
                text: header + ' has been deleted.',
                type: 'success',
                timer: 2000,
            })
            if (callFunction) {
                eval(callFunction)
            }
        },
        error: function (data) {
            swal({
                title: '',
                text: data.responseJSON.message,
                type: 'error',
                timer: 5000,
            })
        },
    })
}
window.manageAjaxErrors = function (
    data, errorDivId = 'editValidationErrorsBox') {
    if (data.status == 404) {
        $.toast({
            heading: 'Error',
            text: data.responseJSON.message,
            showHideTransition: 'fade',
            icon: 'error',
            position: 'top-right',
        })
    } else {
        printErrorMessage('#' + errorDivId, data)
    }
}
