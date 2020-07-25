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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/assets/js/clients/client.js":
/*!***********************************************!*\
  !*** ./resources/assets/js/clients/client.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

$('#department_id,#edit_department_id').select2({
  width: '100%',
  placeholder: 'Select Department'
});
$('#filter_department').select2();
var tbl = $('#clients_table').DataTable({
  processing: true,
  serverSide: true,
  'order': [[0, 'asc']],
  ajax: {
    url: clientUrl,
    data: function data(_data) {
      _data.filter_department = $('#filter_department').find('option:selected').val();
    }
  },
  columnDefs: [{
    'targets': [4],
    'orderable': false,
    'className': 'text-center',
    'width': '10%'
  }],
  columns: [{
    data: 'name',
    name: 'name'
  }, {
    data: function data(row) {
      return row.department !== null ? row.department.name : '';
    },
    name: 'department.name'
  }, {
    data: 'email',
    name: 'email'
  }, {
    data: function data(row) {
      if (row.website != null) {
        return '<a href="http://' + row.website + '" target="_blank" >' + row.website + '</a>';
      } else {
        return null;
      }
    },
    name: 'website'
  }, {
    data: function data(row) {
      return '<a title="Edit" class="btn btn-primary btn-sm edit-btn mr-1 text-white" data-id="' + row.id + '">' + '<i class="fas fa-pencil-alt"></i>' + '</a>' + '<a title="Delete"  class="btn  btn-danger btn-sm delete-btn text-white"  data-id="' + row.id + '">' + '<i class="fas fa-trash"></i></a>';
    },
    name: 'id'
  }],
  'fnInitComplete': function fnInitComplete() {
    $('#filter_department').change(function () {
      tbl.ajax.reload();
    });
  }
});
$('#addNewForm').submit(function (event) {
  event.preventDefault();
  var loadingButton = jQuery(this).find('#btnSave');
  loadingButton.button('loading');
  $.ajax({
    url: clientCreateUrl,
    type: 'POST',
    data: $(this).serialize(),
    success: function success(result) {
      if (result.success) {
        displaySuccessMessage(result.message);
        $('#AddModal').modal('hide');
        $('#clients_table').DataTable().ajax.reload(null, false);
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
  var id = $('#clientId').val();
  $.ajax({
    url: clientUrl + id,
    type: 'put',
    data: $(this).serialize(),
    success: function success(result) {
      if (result.success) {
        displaySuccessMessage(result.message);
        $('#EditModal').modal('hide');
        $('#clients_table').DataTable().ajax.reload(null, false);
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
  resetModalForm('#addNewForm', '#validationErrorsBox');
});
$('#EditModal').on('hidden.bs.modal', function () {
  resetModalForm('#editForm', '#editValidationErrorsBox');
});

window.renderData = function (id) {
  $.ajax({
    url: clientUrl + id + '/edit',
    type: 'GET',
    success: function success(result) {
      if (result.success) {
        var client = result.data;
        $('#clientId').val(client.id);
        $('#edit_name').val(client.name);
        $('#edit_email').val(client.email);
        $('#edit_department_id').val(client.department_id).trigger('change.select2');
        $('#edit_website').val(client.website);
        $('#EditModal').modal('show');
      }
    },
    error: function error(result) {
      manageAjaxErrors(result);
    }
  });
};

$(document).on('click', '.edit-btn', function (event) {
  var clientId = $(event.currentTarget).data('id');
  renderData(clientId);
});
$(document).on('click', '.delete-btn', function (event) {
  var clientId = $(event.currentTarget).data('id');
  var alertMessage = '<div class="alert alert-warning swal__alert">\n' + '<strong class="swal__text-warning">Are you sure want to delete this client?</strong><div class="swal__text-message">By deleting this client all its project, task and time entries will be deleted.</div></div>';
  deleteItemInputConfirmation(clientUrl + clientId, '#clients_table', 'Client', alertMessage);
});

/***/ }),

/***/ 1:
/*!*****************************************************!*\
  !*** multi ./resources/assets/js/clients/client.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\wamp64\www\Ravi\my-traker\resources\assets\js\clients\client.js */"./resources/assets/js/clients/client.js");


/***/ })

/******/ });