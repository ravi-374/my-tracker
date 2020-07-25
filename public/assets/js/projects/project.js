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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/assets/js/projects/project.js":
/*!*************************************************!*\
  !*** ./resources/assets/js/projects/project.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

$('#client_id,#edit_client_id').select2({
  width: '100%',
  placeholder: 'Select Client'
});
$('#filterClient').select2();
var tbl = $('#projects_table').DataTable({
  processing: true,
  serverSide: true,
  'order': [[0, 'asc']],
  ajax: {
    url: projectUrl,
    data: function data(_data) {
      _data.filter_client = $('#filterClient').find('option:selected').val();
    }
  },
  columnDefs: [{
    'targets': [0],
    'className': 'text-center',
    'width': '10%'
  }, {
    'targets': [3],
    'orderable': false,
    'className': 'text-center',
    'width': '10%'
  }],
  columns: [{
    data: 'prefix',
    name: 'prefix'
  }, {
    data: 'name',
    name: 'name'
  }, {
    data: 'client.name',
    defaultContent: '',
    name: 'client.name'
  }, {
    data: function data(row) {
      return '<a title="Edit" class="btn action-btn btn-primary btn-sm edit-btn mr-1" data-id="' + row.id + '">' + '<i class="cui-pencil action-icon"></i>' + '</a>' + '<a title="Delete" class="btn action-btn btn-danger btn-sm delete-btn" data-id="' + row.id + '">' + '<i class="cui-trash action-icon" ></i></a>';
    },
    name: 'id'
  }],
  'fnInitComplete': function fnInitComplete() {
    $('#filterClient').change(function () {
      tbl.ajax.reload();
    });
  }
});
$('#addNewForm').submit(function (event) {
  event.preventDefault();
  var loadingButton = jQuery(this).find('#btnSave');
  loadingButton.button('loading');
  $.ajax({
    url: projectCreateUrl,
    type: 'POST',
    data: $(this).serialize(),
    success: function success(result) {
      if (result.success) {
        displaySuccessMessage(result.message);
        $('#AddModal').modal('hide');
        $('#projects_table').DataTable().ajax.reload(null, false);
        revokerTracker();
      }
    },
    error: function error(result) {
      printErrorMessage('#validationErrorsBox', result);
    },
    complete: function complete() {
      loadingButton.button('reset');
    }
  });
});
$('#editForm').submit(function (event) {
  event.preventDefault();
  var loadingButton = jQuery(this).find('#btnEditSave');
  loadingButton.button('loading');
  var id = $('#projectId').val();
  $.ajax({
    url: projectUrl + id,
    type: 'put',
    data: $(this).serialize(),
    success: function success(result) {
      if (result.success) {
        displaySuccessMessage(result.message);
        $('#EditModal').modal('hide');
        $('#projects_table').DataTable().ajax.reload(null, false);
        revokerTracker();
      }
    },
    error: function error(result) {
      manageAjaxErrors(result);
    },
    complete: function complete() {
      loadingButton.button('reset');
    }
  });
});
$('#AddModal').on('hidden.bs.modal', function () {
  $('#client_id').val(null).trigger('change');
  $('#user_ids').val(null).trigger('change');
  resetModalForm('#addNewForm', '#validationErrorsBox');
});
$('#EditModal').on('hidden.bs.modal', function () {
  resetModalForm('#editForm', '#editValidationErrorsBox');
});

window.renderData = function (id) {
  console.log(projectUrl + id + '/edit');
  $.ajax({
    url: projectUrl + id + '/edit',
    type: 'GET',
    success: function success(result) {
      if (result.success) {
        var project = result.data.project;
        $('#projectId').val(project.id);
        $('#edit_name').val(project.name);
        $('#edit_prefix').val(project.prefix);
        $('#edit_client_id').val(project.client_id).trigger('change');
        $('#edit_description').val(project.description);
        var valArr = result.data.users;
        $('#edit_user_ids').val(valArr);
        $('#edit_user_ids').trigger('change');
        $('#EditModal').modal('show');
      }
    },
    error: function error(result) {
      manageAjaxErrors(result);
    }
  });
};

$(document).on('click', '.edit-btn', function (event) {
  var projectId = $(event.currentTarget).data('id');
  renderData(projectId);
});
$(document).on('click', '.delete-btn', function (event) {
  var projectId = $(event.currentTarget).data('id');
  var alertMessage = '<div class="alert alert-warning swal__alert">\n' + '<strong class="swal__text-warning">Are you sure want to delete this project?</strong><div class="swal__text-message">By deleting this project all its task and time entries will be deleted.</div></div>';
  deleteItemInputConfirmation(projectUrl + projectId, '#projects_table', 'Project', alertMessage);
  setTimeout(function () {
    revokerTracker();
  }, 1000);
});
$('#user_ids,#edit_user_ids').select2({
  width: '100%',
  placeholder: 'Select Users'
});

/***/ }),

/***/ 6:
/*!*******************************************************!*\
  !*** multi ./resources/assets/js/projects/project.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\wamp64\www\Ravi\my-traker\resources\assets\js\projects\project.js */"./resources/assets/js/projects/project.js");


/***/ })

/******/ });