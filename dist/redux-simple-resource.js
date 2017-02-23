(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["simpleResource"] = factory();
	else
		root["simpleResource"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.xhrStatuses = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _generateReducer = __webpack_require__(1);
	
	var _generateReducer2 = _interopRequireDefault(_generateReducer);
	
	var _generateActionTypes = __webpack_require__(9);
	
	var _generateActionTypes2 = _interopRequireDefault(_generateActionTypes);
	
	var _generateActionCreators = __webpack_require__(10);
	
	var _generateActionCreators2 = _interopRequireDefault(_generateActionCreators);
	
	var _utils = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var allowAllCrudOperations = {
	  create: true,
	  readOne: true,
	  readMany: true,
	  update: true,
	  del: true
	};
	
	// resourceName: a string representing the name of the resource. For instance,
	//  "books". This will be the name of the store slice in Redux.
	// options: a list of options to configure the resource. Refer to the docs
	//  for the complete list of options
	function simpleResource(resourceName) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var initialState = options.initialState,
	      idAttribute = options.idAttribute,
	      customHandlers = options.customHandlers,
	      pluralForm = options.pluralForm,
	      allowedOperations = options.allowedOperations;
	
	  var initial = Object.assign({}, (0, _utils.generateDefaultInitialState)(), initialState);
	  var idAttr = idAttribute || 'id';
	  var handlers = customHandlers || {};
	  var pluralName = pluralForm ? pluralForm : resourceName + 's';
	  var allowedCrudOperations = _extends({}, allowAllCrudOperations, allowedOperations);
	
	  var types = (0, _generateActionTypes2.default)(resourceName, pluralName, allowedCrudOperations);
	  var actionCreators = (0, _generateActionCreators2.default)(allowedCrudOperations);
	
	  return {
	    actionCreators: actionCreators,
	    actionTypes: types,
	    initialState: initial,
	    reducer: (0, _generateReducer2.default)({
	      pluralForm: pluralName,
	      allowedOperations: allowedCrudOperations,
	      initialState: initial,
	      idAttr: idAttr, handlers: handlers, types: types, resourceName: resourceName
	    }),
	    pluralForm: pluralName
	  };
	}
	
	exports.xhrStatuses = _utils.xhrStatuses;
	exports.default = simpleResource;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = generateReducers;
	
	var _defaultReducers = __webpack_require__(2);
	
	var defaultReducers = _interopRequireWildcard(_defaultReducers);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	// "handlers" are the functions that compute the new state given the existing
	// state and the action. This function merges in the default handlers, which
	// handle basic CRUD actions, with your customHandlers, which you pass in
	// when creating a resource.
	function getHandlers(_ref) {
	  var _ref2, _ref3, _ref4, _ref5, _ref6;
	
	  var customHandlers = _ref.customHandlers,
	      resourceName = _ref.resourceName,
	      pluralForm = _ref.pluralForm,
	      allowedOperations = _ref.allowedOperations,
	      idAttr = _ref.idAttr;
	
	  var capitalResourceName = resourceName.toUpperCase();
	  var capitalPluralName = pluralForm.toUpperCase();
	  var create = allowedOperations.create,
	      readOne = allowedOperations.readOne,
	      readMany = allowedOperations.readMany,
	      update = allowedOperations.update,
	      del = allowedOperations.del;
	
	
	  var createHandlers = create ? (_ref2 = {}, _defineProperty(_ref2, 'CREATE_' + capitalResourceName, defaultReducers.create.bind(null, idAttr)), _defineProperty(_ref2, 'CREATE_' + capitalResourceName + '_FAIL', defaultReducers.createFail.bind(null, idAttr)), _defineProperty(_ref2, 'CREATE_' + capitalResourceName + '_SUCCEED', defaultReducers.createSucceed.bind(null, idAttr)), _defineProperty(_ref2, 'CREATE_' + capitalResourceName + '_ABORT', defaultReducers.createAbort.bind(null, idAttr)), _defineProperty(_ref2, 'CREATE_' + capitalResourceName + '_RESET', defaultReducers.createReset.bind(null, idAttr)), _ref2) : {};
	
	  var readOneHandlers = readOne ? (_ref3 = {}, _defineProperty(_ref3, 'RETRIEVE_' + capitalResourceName, defaultReducers.retrieveOne.bind(null, idAttr)), _defineProperty(_ref3, 'RETRIEVE_' + capitalResourceName + '_FAIL', defaultReducers.retrieveOneFail.bind(null, idAttr)), _defineProperty(_ref3, 'RETRIEVE_' + capitalResourceName + '_SUCCEED', defaultReducers.retrieveOneSucceed.bind(null, idAttr)), _defineProperty(_ref3, 'RETRIEVE_' + capitalResourceName + '_ABORT', defaultReducers.retrieveOneAbort.bind(null, idAttr)), _defineProperty(_ref3, 'RETRIEVE_' + capitalResourceName + '_RESET', defaultReducers.retrieveOneReset.bind(null, idAttr)), _ref3) : {};
	
	  var readManyHandlers = readMany ? (_ref4 = {}, _defineProperty(_ref4, 'RETRIEVE_' + capitalPluralName, defaultReducers.retrieveMany.bind(null, idAttr)), _defineProperty(_ref4, 'RETRIEVE_' + capitalPluralName + '_FAIL', defaultReducers.retrieveManyFail.bind(null, idAttr)), _defineProperty(_ref4, 'RETRIEVE_' + capitalPluralName + '_SUCCEED', defaultReducers.retrieveManySucceed.bind(null, idAttr)), _defineProperty(_ref4, 'RETRIEVE_' + capitalPluralName + '_ABORT', defaultReducers.retrieveManyAbort.bind(null, idAttr)), _defineProperty(_ref4, 'RETRIEVE_' + capitalPluralName + '_RESET', defaultReducers.retrieveManyReset.bind(null, idAttr)), _ref4) : {};
	
	  var updateHandlers = update ? (_ref5 = {}, _defineProperty(_ref5, 'UPDATE_' + capitalResourceName, defaultReducers.update.bind(null, idAttr)), _defineProperty(_ref5, 'UPDATE_' + capitalResourceName + '_FAIL', defaultReducers.updateFail.bind(null, idAttr)), _defineProperty(_ref5, 'UPDATE_' + capitalResourceName + '_SUCCEED', defaultReducers.updateSucceed.bind(null, idAttr)), _defineProperty(_ref5, 'UPDATE_' + capitalResourceName + '_ABORT', defaultReducers.updateAbort.bind(null, idAttr)), _defineProperty(_ref5, 'UPDATE_' + capitalResourceName + '_RESET', defaultReducers.updateReset.bind(null, idAttr)), _ref5) : {};
	
	  var deleteHandlers = del ? (_ref6 = {}, _defineProperty(_ref6, 'DELETE_' + capitalResourceName, defaultReducers.del.bind(null, idAttr)), _defineProperty(_ref6, 'DELETE_' + capitalResourceName + '_FAIL', defaultReducers.delFail.bind(null, idAttr)), _defineProperty(_ref6, 'DELETE_' + capitalResourceName + '_SUCCEED', defaultReducers.delSucceed.bind(null, idAttr)), _defineProperty(_ref6, 'DELETE_' + capitalResourceName + '_ABORT', defaultReducers.delAbort.bind(null, idAttr)), _defineProperty(_ref6, 'DELETE_' + capitalResourceName + '_RESET', defaultReducers.delReset.bind(null, idAttr)), _ref6) : {};
	
	  // Default handlers manage the five states of CRUD.
	  var defaultHandlers = _extends({}, createHandlers, readOneHandlers, readManyHandlers, updateHandlers, deleteHandlers);
	
	  return _extends({}, defaultHandlers, customHandlers);
	}
	
	function generateReducers(options) {
	  var idAttr = options.idAttr,
	      initialState = options.initialState,
	      customHandlers = options.customHandlers,
	      resourceName = options.resourceName,
	      pluralForm = options.pluralForm,
	      allowedOperations = options.allowedOperations;
	
	  var handlers = getHandlers({ customHandlers: customHandlers, resourceName: resourceName, pluralForm: pluralForm, allowedOperations: allowedOperations, idAttr: idAttr });
	
	  return function reducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	    var action = arguments[1];
	
	    var handler = handlers[action.type];
	    if (!handler) {
	      return state;
	    }
	    var result = handler(state, action);
	    return result ? result : state;
	  };
	}
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _create = __webpack_require__(3);
	
	Object.keys(_create).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _create[key];
	    }
	  });
	});
	
	var _readOne = __webpack_require__(5);
	
	Object.keys(_readOne).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _readOne[key];
	    }
	  });
	});
	
	var _readMany = __webpack_require__(6);
	
	Object.keys(_readMany).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _readMany[key];
	    }
	  });
	});
	
	var _update = __webpack_require__(7);
	
	Object.keys(_update).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _update[key];
	    }
	  });
	});
	
	var _delete = __webpack_require__(8);
	
	Object.keys(_delete).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _delete[key];
	    }
	  });
	});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.create = create;
	exports.createFail = createFail;
	exports.createSucceed = createSucceed;
	exports.createAbort = createAbort;
	exports.createReset = createReset;
	
	var _utils = __webpack_require__(4);
	
	function create(idAttr, state) {
	  return _extends({}, state, {
	    resourcesListMeta: _extends({}, state.resourcesListMeta, {
	      creatingStatus: _utils.xhrStatuses.PENDING
	    })
	  });
	}
	
	function createFail(idAttr, state) {
	  return _extends({}, state, {
	    resourcesListMeta: _extends({}, state.resourcesListMeta, {
	      creatingStatus: _utils.xhrStatuses.FAILED
	    })
	  });
	}
	
	function createSucceed(idAttr, state, action) {
	  var resources = (0, _utils.upsertResource)(state.resources, action.resource, action[idAttr], idAttr);
	  return _extends({}, state, {
	    resources: resources,
	    resourcesListMeta: _extends({}, state.resourcesListMeta, {
	      creatingStatus: _utils.xhrStatuses.SUCCEEDED
	    })
	  });
	}
	
	function createAbort(idAttr, state) {
	  return _extends({}, state, {
	    resourcesListMeta: _extends({}, state.resourcesListMeta, {
	      creatingStatus: _utils.xhrStatuses.ABORTED
	    })
	  });
	}
	
	function createReset(idAttr, state) {
	  return _extends({}, state, {
	    resourcesListMeta: _extends({}, state.resourcesListMeta, {
	      creatingStatus: _utils.xhrStatuses.NULL
	    })
	  });
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.updateResourcesMeta = updateResourcesMeta;
	exports.updateManyResourcesMeta = updateManyResourcesMeta;
	exports.upsertResource = upsertResource;
	exports.generateDefaultInitialState = generateDefaultInitialState;
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	// These are statuses for in-flight requests. If a request has no status
	// associated with it, then it would have a status of `NULL`.
	var xhrStatuses = exports.xhrStatuses = {
	  PENDING: 'PENDING',
	  SUCCEEDED: 'SUCCEEDED',
	  FAILED: 'FAILED',
	  ABORTED: 'ABORTED',
	  NULL: 'NULL'
	};
	
	var initialResourceMetaState = exports.initialResourceMetaState = {
	  // The status of any existing request to update this resource
	  updatingStatus: xhrStatuses.NULL,
	  // The status of any existing request to fetch this resource
	  retrievingStatus: xhrStatuses.NULL,
	  // The status of an any existing request to delete this resource. Note that
	  // this will never be "SUCCEEDED," as a successful delete removes the
	  // resource from the store.
	  deletingStatus: xhrStatuses.NULL
	};
	
	// resourcesMeta: the metadata Object from a resource store slice
	// resourceMeta: the new metadataObject from a given resourceMeta
	// id: the ID of the resource to be updated
	function updateResourcesMeta(resourcesMeta, resourceMeta, id) {
	  return _extends({}, resourcesMeta, _defineProperty({}, id, _extends({}, resourcesMeta[id], resourceMeta)));
	}
	
	// Similar to `updateResourcesMeta`, but it accepts an array of IDs instead of
	// a single ID.
	function updateManyResourcesMeta(resourcesMeta, resourceMetaUpdate, ids) {
	  var next = _extends({}, resourcesMeta);
	
	  ids.forEach(function (id) {
	    var current = next[id];
	    next[id] = _extends({}, current, resourceMetaUpdate);
	  });
	
	  return next;
	}
	
	// resources: the Array of resources
	// resource: the new resource object to be added or updated
	// id: the ID of the resource being updated
	function upsertResource(resources, resource, id, idAttr) {
	  // Attempt to find the resource by its ID. If the ID doesn't exist, or if
	  // no resource by that ID exists, then we append it to the end as a new
	  // resource.
	  var resourceIndex = id && resources.findIndex(function (item) {
	    return item[idAttr] === id;
	  });
	  if (!id || resourceIndex === -1) {
	    return [].concat(_toConsumableArray(resources), [resource]);
	  }
	
	  // Otherwise, it does exist and we add it to the list at the appropriate
	  // location
	  var shallowClone = [].concat(_toConsumableArray(resources));
	  shallowClone.splice(resourceIndex, 1, resource);
	  return shallowClone;
	}
	
	function generateDefaultInitialState() {
	  return {
	    // These are the actual resources that the server sends back.
	    resources: [],
	    // This is metadata about _specific_ resources. For instance, if a DELETE
	    // is in flight for a book with ID 24, then you could find that here.
	    resourcesMeta: {},
	    // This is metadata about the entire collection of resources. For instance,
	    // on page load, you might fetch all of the resources. The XHR status for
	    // that request would live here.
	    resourcesListMeta: {
	      retrievingStatus: xhrStatuses.NULL,
	      creatingStatus: xhrStatuses.NULL
	    }
	  };
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.retrieveOne = retrieveOne;
	exports.retrieveOneFail = retrieveOneFail;
	exports.retrieveOneSucceed = retrieveOneSucceed;
	exports.retrieveOneAbort = retrieveOneAbort;
	exports.retrieveOneReset = retrieveOneReset;
	
	var _utils = __webpack_require__(4);
	
	function retrieveOne(idAttr, state, action) {
	  var resourcesMeta = (0, _utils.updateResourcesMeta)(state.resourcesMeta, {
	    retrievingStatus: _utils.xhrStatuses.PENDING
	  }, action[idAttr]);
	
	  return _extends({}, state, {
	    resourcesMeta: resourcesMeta
	  });
	}
	
	function retrieveOneFail(idAttr, state, action) {
	  var resourcesMeta = (0, _utils.updateResourcesMeta)(state.resourcesMeta, {
	    retrievingStatus: _utils.xhrStatuses.FAILED
	  }, action[idAttr]);
	
	  return _extends({}, state, {
	    resourcesMeta: resourcesMeta
	  });
	}
	
	function retrieveOneSucceed(idAttr, state, action) {
	  var resourcesMeta = (0, _utils.updateResourcesMeta)(state.resourcesMeta, {
	    retrievingStatus: _utils.xhrStatuses.SUCCEEDED
	  }, action[idAttr]);
	
	  var resources = (0, _utils.upsertResource)(state.resources, action.resource, action[idAttr], idAttr);
	
	  return _extends({}, state, {
	    resourcesMeta: resourcesMeta,
	    resources: resources
	  });
	}
	
	function retrieveOneAbort(idAttr, state, action) {
	  var resourcesMeta = (0, _utils.updateResourcesMeta)(state.resourcesMeta, {
	    retrievingStatus: _utils.xhrStatuses.ABORTED
	  }, action[idAttr]);
	
	  return _extends({}, state, {
	    resourcesMeta: resourcesMeta
	  });
	}
	
	function retrieveOneReset(idAttr, state, action) {
	  var resourcesMeta = (0, _utils.updateResourcesMeta)(state.resourcesMeta, {
	    retrievingStatus: _utils.xhrStatuses.NULL
	  }, action[idAttr]);
	
	  return _extends({}, state, {
	    resourcesMeta: resourcesMeta
	  });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.retrieveMany = retrieveMany;
	exports.retrieveManyFail = retrieveManyFail;
	exports.retrieveManySucceed = retrieveManySucceed;
	exports.retrieveManyAbort = retrieveManyAbort;
	exports.retrieveManyReset = retrieveManyReset;
	
	var _utils = __webpack_require__(4);
	
	function retrieveMany(idAttr, state) {
	  return _extends({}, state, {
	    resourcesListMeta: _extends({}, state.resourcesListMeta, {
	      retrievingStatus: _utils.xhrStatuses.PENDING
	    })
	  });
	}
	
	function retrieveManyFail(idAttr, state) {
	  return _extends({}, state, {
	    resourcesListMeta: _extends({}, state.resourcesListMeta, {
	      retrievingStatus: _utils.xhrStatuses.FAILED
	    })
	  });
	}
	
	function retrieveManySucceed(idAttr, state, action) {
	  var resources = action.resources;
	  // This needs to use `idAttr`.
	  var ids = resources.map(function (r) {
	    return r[idAttr];
	  });
	  return _extends({}, state, {
	    resources: resources,
	    // We have new resources, so we need to update their meta state with the
	    // initial meta state.
	    resourcesMeta: (0, _utils.updateManyResourcesMeta)(state.resourcesMeta, _utils.initialResourceMetaState, ids),
	    resourcesListMeta: _extends({}, state.resourcesListMeta, {
	      retrievingStatus: _utils.xhrStatuses.SUCCEEDED
	    })
	  });
	}
	
	function retrieveManyAbort(idAttr, state) {
	  return _extends({}, state, {
	    resourcesListMeta: _extends({}, state.resourcesListMeta, {
	      retrievingStatus: _utils.xhrStatuses.ABORTED
	    })
	  });
	}
	
	function retrieveManyReset(idAttr, state) {
	  return _extends({}, state, {
	    resourcesListMeta: _extends({}, state.resourcesListMeta, {
	      retrievingStatus: _utils.xhrStatuses.NULL
	    })
	  });
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.update = update;
	exports.updateFail = updateFail;
	exports.updateSucceed = updateSucceed;
	exports.updateAbort = updateAbort;
	exports.updateReset = updateReset;
	
	var _utils = __webpack_require__(4);
	
	function update(idAttr, state, action) {
	  var resourcesMeta = (0, _utils.updateResourcesMeta)(state.resourcesMeta, {
	    updatingStatus: _utils.xhrStatuses.PENDING
	  }, action[idAttr]);
	
	  return _extends({}, state, {
	    resourcesMeta: resourcesMeta
	  });
	}
	
	function updateFail(idAttr, state, action) {
	  var resourcesMeta = (0, _utils.updateResourcesMeta)(state.resourcesMeta, {
	    updatingStatus: _utils.xhrStatuses.FAILED
	  }, action[idAttr]);
	
	  return _extends({}, state, {
	    resourcesMeta: resourcesMeta
	  });
	}
	
	function updateSucceed(idAttr, state, action) {
	  var resourcesMeta = (0, _utils.updateResourcesMeta)(state.resourcesMeta, {
	    updatingStatus: _utils.xhrStatuses.SUCCEEDED
	  }, action[idAttr]);
	
	  var resources = (0, _utils.upsertResource)(state.resources, action.resource, action[idAttr], idAttr);
	
	  return _extends({}, state, {
	    resourcesMeta: resourcesMeta,
	    resources: resources
	  });
	}
	
	function updateAbort(idAttr, state, action) {
	  var resourcesMeta = (0, _utils.updateResourcesMeta)(state.resourcesMeta, {
	    updatingStatus: _utils.xhrStatuses.ABORTED
	  }, action[idAttr]);
	
	  return _extends({}, state, {
	    resourcesMeta: resourcesMeta
	  });
	}
	
	function updateReset(idAttr, state, action) {
	  var resourcesMeta = (0, _utils.updateResourcesMeta)(state.resourcesMeta, {
	    updatingStatus: _utils.xhrStatuses.NULL
	  }, action[idAttr]);
	
	  return _extends({}, state, {
	    resourcesMeta: resourcesMeta
	  });
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.del = del;
	exports.delFail = delFail;
	exports.delSucceed = delSucceed;
	exports.delAbort = delAbort;
	exports.delReset = delReset;
	
	var _utils = __webpack_require__(4);
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function del(idAttr, state, action) {
	  var resourcesMeta = (0, _utils.updateResourcesMeta)(state.resourcesMeta, {
	    deletingStatus: _utils.xhrStatuses.PENDING
	  }, action[idAttr]);
	
	  return _extends({}, state, {
	    resourcesMeta: resourcesMeta
	  });
	}
	
	function delFail(idAttr, state, action) {
	  var resourcesMeta = (0, _utils.updateResourcesMeta)(state.resourcesMeta, {
	    deletingStatus: _utils.xhrStatuses.FAILED
	  }, action[idAttr]);
	
	  return _extends({}, state, {
	    resourcesMeta: resourcesMeta
	  });
	}
	
	function delSucceed(idAttr, state, action) {
	  var id = action[idAttr];
	
	  // Remove this resource from the resources meta.
	  var resourcesMeta = _extends({}, state.resourcesMeta, _defineProperty({}, id, null));
	
	  // Shallow clone the existing resource array, removing the deleted resource
	  var resources = state.resources.filter(function (r) {
	    return r.id !== id;
	  });
	
	  return _extends({}, state, {
	    resourcesMeta: resourcesMeta,
	    resources: resources
	  });
	}
	
	function delAbort(idAttr, state, action) {
	  var resourcesMeta = (0, _utils.updateResourcesMeta)(state.resourcesMeta, {
	    deletingStatus: _utils.xhrStatuses.ABORTED
	  }, action[idAttr]);
	
	  return _extends({}, state, {
	    resourcesMeta: resourcesMeta
	  });
	}
	
	function delReset(idAttr, state, action) {
	  var resourcesMeta = (0, _utils.updateResourcesMeta)(state.resourcesMeta, {
	    deletingStatus: _utils.xhrStatuses.NULL
	  }, action[idAttr]);
	
	  return _extends({}, state, {
	    resourcesMeta: resourcesMeta
	  });
	}

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	// This function generates the five statuses from a single CRUD action.
	// For instance, you'd probably pass "CREATE", "RETRIEVE", "UPDATE", or "DELETE"
	// as `crudAction`.
	var mapConstant = function mapConstant(resourceName, crudAction) {
	  var _ref;
	
	  return _ref = {}, _defineProperty(_ref, crudAction + '_' + resourceName, crudAction + '_' + resourceName), _defineProperty(_ref, crudAction + '_' + resourceName + '_SUCCEED', crudAction + '_' + resourceName + '_SUCCEED'), _defineProperty(_ref, crudAction + '_' + resourceName + '_FAIL', crudAction + '_' + resourceName + '_FAIL'), _defineProperty(_ref, crudAction + '_' + resourceName + '_ABORT', crudAction + '_' + resourceName + '_ABORT'), _defineProperty(_ref, crudAction + '_' + resourceName + '_RESET', crudAction + '_' + resourceName + '_RESET'), _ref;
	};
	
	// This is a map of the four CRUD operations to the five async action types
	
	exports.default = function (resourceName, pluralForm, allowedOperations) {
	  var capitalResourceName = resourceName.toUpperCase();
	  var capitalPluralName = pluralForm.toUpperCase();
	  var create = allowedOperations.create,
	      readOne = allowedOperations.readOne,
	      readMany = allowedOperations.readMany,
	      update = allowedOperations.update,
	      del = allowedOperations.del;
	
	
	  var createTypes = create ? mapConstant(capitalResourceName, 'CREATE') : {};
	  var readOneTypes = readOne ? mapConstant(capitalResourceName, 'RETRIEVE') : {};
	  var readManyTypes = readMany ? mapConstant(capitalPluralName, 'RETRIEVE') : {};
	  var updateTypes = update ? mapConstant(capitalResourceName, 'UPDATE') : {};
	  var deleteTypes = del ? mapConstant(capitalResourceName, 'DELETE') : {};
	
	  return _extends({}, createTypes, readOneTypes, readManyTypes, updateTypes, deleteTypes);
	};
	
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (allowedCrudOperations) {
	  var create = allowedCrudOperations.create,
	      readOne = allowedCrudOperations.readOne,
	      readMany = allowedCrudOperations.readMany,
	      update = allowedCrudOperations.update,
	      del = allowedCrudOperations.del;
	
	  var actions = {};
	
	  if (create) {
	    actions.create = actionCreators.create;
	  }
	
	  if (readOne) {
	    actions.readOne = actionCreators.readOne;
	  }
	
	  if (readMany) {
	    actions.readMany = actionCreators.readMany;
	  }
	
	  if (update) {
	    actions.update = actionCreators.update;
	  }
	
	  if (del) {
	    actions.del = actionCreators.del;
	  }
	
	  return actions;
	};
	
	var _defaultActionCreators = __webpack_require__(11);
	
	var actionCreators = _interopRequireWildcard(_defaultActionCreators);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _create = __webpack_require__(12);
	
	Object.defineProperty(exports, 'create', {
	  enumerable: true,
	  get: function get() {
	    return _create.create;
	  }
	});
	
	var _readOne = __webpack_require__(13);
	
	Object.defineProperty(exports, 'readOne', {
	  enumerable: true,
	  get: function get() {
	    return _readOne.readOne;
	  }
	});
	
	var _readMany = __webpack_require__(14);
	
	Object.defineProperty(exports, 'readMany', {
	  enumerable: true,
	  get: function get() {
	    return _readMany.readMany;
	  }
	});
	
	var _update = __webpack_require__(15);
	
	Object.defineProperty(exports, 'update', {
	  enumerable: true,
	  get: function get() {
	    return _update.update;
	  }
	});
	
	var _delete = __webpack_require__(16);
	
	Object.defineProperty(exports, 'del', {
	  enumerable: true,
	  get: function get() {
	    return _delete.del;
	  }
	});

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function () {
	  return function () {
	    // Intentionally blank
	  };
	};
	
	module.exports = exports["default"];

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function () {
	  return function () {
	    // Intentionally blank
	  };
	};
	
	module.exports = exports["default"];

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function () {
	  return function () {
	    // Intentionally blank
	  };
	};
	
	module.exports = exports["default"];

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function () {
	  return function () {
	    // Intentionally blank
	  };
	};
	
	module.exports = exports["default"];

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function () {
	  return function () {
	    // Intentionally blank
	  };
	};
	
	module.exports = exports["default"];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=redux-simple-resource.js.map