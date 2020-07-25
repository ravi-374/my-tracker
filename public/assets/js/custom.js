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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/assets/js/custom.js":
/*!***************************************!*\
  !*** ./resources/assets/js/custom.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

$.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  }
});

window.onload = function () {
  window.startLoader = function () {
    $('.infy-loader').show();
  };

  window.stopLoader = function () {
    $('.infy-loader').hide();
  }; // infy loader js


  stopLoader();
};

$.extend($.fn.dataTable.defaults, {
  'paging': true,
  'info': true,
  'ordering': true,
  'autoWidth': false,
  'pageLength': 10,
  'language': {
    'search': '',
    'sSearch': 'Search',
    'sProcessing': getSpinner()
  },
  'preDrawCallback': function preDrawCallback() {
    customSearch();
  }
});

function customSearch() {
  $('.dataTables_filter input').addClass('form-control');
  $('.dataTables_filter input').attr('placeholder', 'Search');
}

function getSpinner() {
  return '<div id="infyLoader" class="infy-loader">\n' + '    <svg width="150px" height="75px" viewBox="0 0 187.3 93.7" preserveAspectRatio="xMidYMid meet"\n' + '         style="left: 50%; top: 50%; position: absolute; transform: translate(-50%, -50%) matrix(1, 0, 0, 1, 0, 0);">\n' + '        <path stroke="#00c6ff" id="outline" fill="none" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"\n' + '              stroke-miterlimit="10"\n' + '              d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 \t\t\t\tc-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"/>\n' + '        <path id="outline-bg" opacity="0.05" fill="none" stroke="#f5981c" stroke-width="5" stroke-linecap="round"\n' + '              stroke-linejoin="round" stroke-miterlimit="10"\n' + '              d="\t\t\t\tM93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 \t\t\t\tc-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"/>\n' + '    </svg>\n' + '</div>';
}

window.displaySuccessMessage = function (message) {
  $.toast({
    heading: 'Success',
    text: message,
    showHideTransition: 'slide',
    icon: 'success',
    position: 'top-right'
  });
};

window.printErrorMessage = function (selector, errorResult) {
  $(selector).show().html('');
  console.log(errorResult);
  $(selector).text(errorResult.responseJSON.message);
};

window.resetModalForm = function (formId, validationBox) {
  $(formId)[0].reset();
  $(validationBox).hide();
};

window.renderData = function (id) {
  $.ajax({
    url: departmentUrl + id + '/edit',
    type: 'GET',
    success: function success(result) {
      if (result.success) {
        var department = result.data;
        $('#departmentId').val(department.id);
        $('#edit_name').val(department.name);
        $('#EditModal').modal('show');
      }
    },
    error: function error(result) {
      console.log(result);
    }
  });
};

window.deleteItem = function (url, tableId, header) {
  var callFunction = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
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
    confirmButtonText: 'Yes'
  }, function () {
    deleteItemAjax(url, tableId, header, callFunction = null);
  });
};

window.deleteItemInputConfirmation = function (url, tableId, header, alertMessage) {
  var callFunction = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  swal({
    type: 'input',
    inputPlaceholder: 'Please type "delete" to delete this ' + header + '.',
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
    imageUrl: baseUrl + 'images/warning.png'
  }, function (inputVal) {
    if (inputVal === false) {
      return false;
    }

    if (inputVal == '' || inputVal.toLowerCase() != 'delete') {
      swal.showInputError('Please type "delete" to delete this client.');
      $('.sa-input-error').css('top', '23px!important');
      return false;
    }

    if (inputVal.toLowerCase() === 'delete') {
      deleteItemAjax(url, tableId, header, callFunction = null);
    }
  });
};

function deleteItemAjax(url, tableId, header) {
  var callFunction = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  console.log(url);
  $.ajax({
    url: url,
    type: 'DELETE',
    dataType: 'json',
    success: function success(obj) {
      if (obj.success) {
        $(tableId).DataTable().ajax.reload(null, false);
      }

      swal({
        title: 'Deleted!',
        text: header + ' has been deleted.',
        type: 'success',
        timer: 2000
      });

      if (callFunction) {
        eval(callFunction);
      }
    },
    error: function error(data) {
      swal({
        title: '',
        text: data.responseJSON.message,
        type: 'error',
        timer: 5000
      });
    }
  });
}

window.manageAjaxErrors = function (data) {
  var errorDivId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'editValidationErrorsBox';

  if (data.status == 404) {
    $.toast({
      heading: 'Error',
      text: data.responseJSON.message,
      showHideTransition: 'fade',
      icon: 'error',
      position: 'top-right'
    });
  } else {
    printErrorMessage('#' + errorDivId, data);
  }
};

/***/ }),

/***/ "./resources/assets/style/sass/laravel/app.scss":
/*!******************************************************!*\
  !*** ./resources/assets/style/sass/laravel/app.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/assets/style/sass/style.scss":
/*!************************************************!*\
  !*** ./resources/assets/style/sass/style.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*************************************************************************************************************************************!*\
  !*** multi ./resources/assets/js/custom.js ./resources/assets/style/sass/laravel/app.scss ./resources/assets/style/sass/style.scss ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\wamp64\www\Ravi\my-traker\resources\assets\js\custom.js */"./resources/assets/js/custom.js");
__webpack_require__(/*! C:\wamp64\www\Ravi\my-traker\resources\assets\style\sass\laravel\app.scss */"./resources/assets/style/sass/laravel/app.scss");
module.exports = __webpack_require__(/*! C:\wamp64\www\Ravi\my-traker\resources\assets\style\sass\style.scss */"./resources/assets/style/sass/style.scss");


/***/ })

/******/ });