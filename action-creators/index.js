(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("resourceful-redux"), require("querystringify"), require("xhr"));
	else if(typeof define === 'function' && define.amd)
		define(["resourceful-redux", "querystringify", "xhr"], factory);
	else if(typeof exports === 'object')
		exports["resourcefulActionCreators"] = factory(require("resourceful-redux"), require("querystringify"), require("xhr"));
	else
		root["resourcefulActionCreators"] = factory(root["resourceful-redux"], root["querystringify"], root["xhr"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = request;

var _xhr = __webpack_require__(4);

var _xhr2 = _interopRequireDefault(_xhr);

var _querystringify = __webpack_require__(3);

var _querystringify2 = _interopRequireDefault(_querystringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-param-reassign: 'off' */

// This is a small wrapper around `xhr`.
// It has two improvements:
//   1. Omit the `cb`, and a Promise will be returned instead
//   2. Pass a `qs` option for query string support

function buildUrl(uri, options) {
  if (options.qs) {
    uri += _querystringify2.default.stringify(options.qs, true);
  }
  return uri;
}

function request(uri, options, cb) {
  var params = {};
  // This handles the `xhr(options, cb)` syntax
  if ((typeof uri === 'undefined' ? 'undefined' : _typeof(uri)) === 'object') {
    params = uri;
  }
  // This handles the `xhr(uri, options, cb)` syntax
  else if (typeof uri === 'string' && (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
      params = options;
      params.uri = uri;
    }
    // This handles the `xhr(uri, cb)` syntax
    else {
        params.uri = uri;
      }

  // This adds support for the `qs` option
  var urlString = params.uri ? params.uri : params.url;
  params.uri = buildUrl(urlString, params);

  var callback = void 0;
  if (typeof options === 'function') {
    callback = options;
  } else if (typeof cb === 'function') {
    callback = cb;
  }

  // Return the `xhr` if a callback was passed. Otherwise, a Promise is returned
  if (callback) {
    return (0, _xhr2.default)(params, callback);
  } else {
    return new Promise(function (resolve, reject) {
      (0, _xhr2.default)(params, function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
}

// Also grabbed from xhr's source. This adds the convenience APIs;
// `xhr.get()`, for instance.
['get', 'put', 'post', 'patch', 'head', 'delete'].forEach(function (method) {
  request[method === 'delete' ? 'del' : method] = function (uri) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var callback = arguments[2];

    var opts = typeof uri === 'string' ? options : uri;
    opts.method = method.toUpperCase();
    return request(uri, opts, callback);
  };
});
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteResources = exports.updateResources = exports.readResources = exports.createResources = exports.crudAction = exports.xhr = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _resourcefulRedux = __webpack_require__(1);

var _xhr = __webpack_require__(0);

var _xhr2 = _interopRequireDefault(_xhr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function performXhr(dispatch, options) {
  var _options$xhrOptions = options.xhrOptions,
      xhrOptions = _options$xhrOptions === undefined ? {} : _options$xhrOptions,
      crudAction = options.crudAction,
      transformData = options.transformData,
      resourceName = options.resourceName;

  // Catch common configuration problems in dev

  if (true) {
    var _resourceName = options.resourceName;

    var lowercaseCrud = crudAction.toLowerCase();
    var isValidCrudType = lowercaseCrud === 'update' || lowercaseCrud === 'delete' || lowercaseCrud === 'read' || lowercaseCrud === 'create';
    var url = xhrOptions.url,
        uri = xhrOptions.uri;


    if (!_resourceName) {
      throw new Error('A resourceName was not passed to a Resourceful Redux Action ' + 'creator. A resourceName must be passed so that Resourceful Redux ' + 'knows which resource slice to update. Refer to the CRUD Actions ' + 'guide for more: https://resourceful-redux.js.org/docs/guides/crud-actions.html');
    }

    if (!isValidCrudType) {
      throw new Error('An invalid "crudAction" was passed to a Resourceful Redux action creator. ' + 'It must be one of: "create", "read", "update", "delete"');
    }

    if (!url && !uri) {
      throw new Error('No URL was passed to a Resourceful Redux action creator. You must ' + 'pass either "xhrOptions.url" or "xhrOptions.uri". For more, refer to ' + 'the Action Creators Extension documentation: ' + 'https://resourceful-redux.js.org/docs/extensions/action-creators.html');
    }
  }

  var crudType = crudAction.toUpperCase();

  dispatch(_extends({}, options, {
    type: _resourcefulRedux.actionTypes[crudType + '_RESOURCES_PENDING']
  }));

  var req = (0, _xhr2.default)(xhrOptions, function (err, res, body) {
    if (req.aborted) {
      dispatch(_extends({}, options, {
        type: _resourcefulRedux.actionTypes[crudType + '_RESOURCES_NULL']
      }));
    } else if (err || res.statusCode >= 400) {
      dispatch(_extends({}, options, {
        type: _resourcefulRedux.actionTypes[crudType + '_RESOURCES_FAILED'],
        res: res,
        err: err
      }));
    } else {
      var resources = void 0;
      if (transformData) {
        resources = transformData(body, options);
      } else {
        resources = body;
      }

      dispatch(_extends({}, options, {
        type: _resourcefulRedux.actionTypes[crudType + '_RESOURCES_SUCCEEDED'],
        resources: resources
      }));
    }
  });

  return req;
}

function crudAction(options) {
  return function (dispatch, getState) {
    var opts = void 0;
    if (typeof options === 'function') {
      opts = options(getState()) || {};
    } else {
      opts = options || {};
    }

    performXhr(dispatch, options);
  };
}

function createResources() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function (dispatch, getState) {
    var opts = void 0;
    if (typeof options === 'function') {
      opts = options(getState()) || {};
    } else {
      opts = options || {};
    }

    var xhrOpts = opts.xhrOptions || {};

    var newOptions = _extends({
      crudAction: 'create'
    }, opts, {
      xhrOptions: _extends({
        method: 'POST'
      }, xhrOpts)
    });

    performXhr(dispatch, newOptions);
  };
}

function readResources() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function (dispatch, getState) {
    var opts = void 0;
    if (typeof options === 'function') {
      opts = options(getState()) || {};
    } else {
      opts = options || {};
    }

    var xhrOpts = opts.xhrOptions || {};

    var newOptions = _extends({
      crudAction: 'read'
    }, opts, {
      xhrOptions: _extends({
        method: 'GET'
      }, xhrOpts)
    });

    performXhr(dispatch, newOptions);
  };
}

function updateResources() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function (dispatch, getState) {
    var opts = void 0;
    if (typeof options === 'function') {
      opts = options(getState()) || {};
    } else {
      opts = options || {};
    }

    var xhrOpts = opts.xhrOptions || {};

    var newOptions = _extends({
      crudAction: 'update'
    }, opts, {
      xhrOptions: _extends({
        method: 'PATCH'
      }, xhrOpts)
    });

    performXhr(dispatch, newOptions);
  };
}

function deleteResources() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function (dispatch, getState) {
    var opts = void 0;
    if (typeof options === 'function') {
      opts = options(getState()) || {};
    } else {
      opts = options || {};
    }

    var xhrOpts = opts.xhrOptions || {};

    var newOptions = _extends({
      crudAction: 'delete'
    }, opts, {
      xhrOptions: _extends({
        method: 'DELETE'
      }, xhrOpts)
    });

    performXhr(dispatch, newOptions);
  };
}

exports.xhr = _xhr2.default;
exports.crudAction = crudAction;
exports.createResources = createResources;
exports.readResources = readResources;
exports.updateResources = updateResources;
exports.deleteResources = deleteResources;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map