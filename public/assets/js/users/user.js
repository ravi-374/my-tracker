/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/assets/js/users/user.js":
/*!*******************************************!*\
  !*** ./resources/assets/js/users/user.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

$(function () {
  $('#projectId,#editProjectId').select2({
    width: '100%'
  });
  $('#roleId,#editRoleId').select2({
    width: '100%',
    placeholder: 'Select Role',
    minimumResultsForSearch: -1
  });
});
$(document).ready(function () {
  $('input').attr('autocomplete', 'false');
});
var tbl = $('#users_table').DataTable({
  processing: true,
  serverSide: true,
  'order': [[0, 'asc']],
  ajax: {
    url: usersUrl
  },
  columnDefs: [{
    'targets': [2],
    'className': 'text-center',
    'width': '12%'
  }, {
    'targets': [3],
    'className': 'text-center',
    'width': '12%'
  }],
  columns: [{
    data: 'name',
    name: 'name'
  }, {
    data: 'email',
    name: 'email'
  }, {
    data: 'role_name',
    name: 'role_name'
  }, {
    data: function data(row) {
      return '<a title="View" href="' + usersUrl + row.id + '" class="btn action-btn btn-info btn-sm edit-btn mr-1" data-id="' + row.id + '">' + '<i class="far fa-eye action-icon"  style="color:#3c8dbc"></i>' + '</a>' + '<a title="Edit" class="btn action-btn btn-primary btn-sm edit-btn mr-1" data-id="' + row.id + '">' + '<i class="cui-pencil action-icon"  style="color:#3c8dbc"></i>' + '</a>' + '<a title="Delete" class="btn action-btn btn-danger btn-sm delete-btn" data-id="' + row.id + '">' + '<i class="cui-trash action-icon text-danger"></i></a>';
    },
    name: 'id'
  }]
});
$('#users_table').on('draw.dt', function () {
  $('[data-toggle="tooltip"]').tooltip();
});

window.renderData = function (url) {
  $.ajax({
    url: url,
    type: 'GET',
    success: function success(result) {
      if (result.success) {
        var user = result.data;
        $('#userId').val(user.id);
        $('#edit_name').val(user.name);
        $('#edit_email').val(user.email);
        $('#EditModal').modal('show');
      }
    },
    error: function error(_error) {
      manageAjaxErrors(_error);
    }
  });
};

$(function () {
  // create new user
  $('#addNewForm').submit(function (event) {
    event.preventDefault();
    var loadingButton = jQuery(this).find('#btnSave');
    loadingButton.button('loading');
    $.ajax({
      url: createUserUrl,
      type: 'POST',
      data: $(this).serialize(),
      success: function success(result) {
        if (result.success) {
          displaySuccessMessage(result.message);
          $('#AddModal').modal('hide');
          $('#users_table').DataTable().ajax.reload(null, false);
        }
      },
      error: function error(result) {
        printErrorMessage('#validationErrorsBox', result);
      },
      complete: function complete() {
        loadingButton.button('reset');
      }
    });
  }); // update user

  $('#editForm').submit(function (event) {
    event.preventDefault();
    var loadingButton = jQuery(this).find('#btnEditSave');
    loadingButton.button('loading');
    var id = $('#userId').val();
    $.ajax({
      url: usersUrl + id,
      type: 'put',
      data: $(this).serialize(),
      success: function success(result) {
        if (result.success) {
          displaySuccessMessage(result.message);
          $('#EditModal').modal('hide');
          $('#users_table').DataTable().ajax.reload(null, false);
        }
      },
      error: function error(_error2) {
        manageAjaxErrors(_error2);
      },
      complete: function complete() {
        loadingButton.button('reset');
      }
    });
  });
  $('#AddModal').on('hidden.bs.modal', function () {
    $('#projectId').val(null).trigger('change');
    resetModalForm('#addNewForm', '#validationErrorsBox');
  });
  $('#EditModal').on('hidden.bs.modal', function () {
    resetModalForm('#editForm', '#editValidationErrorsBox');
  }); // open edit user model

  $(document).on('click', '.edit-btn', function (event) {
    var userId = $(event.currentTarget).data('id');
    renderData(usersUrl + userId + '/edit');
  }); // open delete confirmation model

  $(document).on('click', '.delete-btn', function (event) {
    var userId = $(event.currentTarget).data('id');
    deleteItem(usersUrl + userId, '#users_table', 'User');
  });
});

/***/ }),

/***/ 4:
/*!*************************************************!*\
  !*** multi ./resources/assets/js/users/user.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\wamp64\www\Ravi\my-traker\resources\assets\js\users\user.js */"./resources/assets/js/users/user.js");


/***/ })

/******/ });