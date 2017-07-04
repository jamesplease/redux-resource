(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("prop-types"));
	else if(typeof define === 'function' && define.amd)
		define(["prop-types"], factory);
	else if(typeof exports === 'object')
		exports["resourcefulPropTypes"] = factory(require("prop-types"));
	else
		root["resourcefulPropTypes"] = factory(root["prop-types"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.statusPropType = exports.resourcesPropType = exports.resourceIdsPropType = exports.slicePropType = undefined;

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The state from a `resourceReducer` slice of your store. It's called a
// "slice" because most folks use `resourceReducer` alongside `combineReducers`,
// although it works just as well if you're not.
var slicePropType = _propTypes2.default.shape({
  resources: _propTypes2.default.object.isRequired,
  meta: _propTypes2.default.object.isRequired,
  labels: _propTypes2.default.object.isRequired
}).isRequired;

// An array of Resource IDs
var resourceIdsPropType = _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]));

// The return value from `getResources`
var resourcesPropType = _propTypes2.default.arrayOf(_propTypes2.default.shape({
  id: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
})).isRequired;

// The return value from `getStatus`
var statusPropType = _propTypes2.default.shape({
  null: _propTypes2.default.bool.isRequired,
  pending: _propTypes2.default.bool.isRequired,
  failed: _propTypes2.default.bool.isRequired,
  succeeded: _propTypes2.default.bool.isRequired
}).isRequired;

exports.slicePropType = slicePropType;
exports.resourceIdsPropType = resourceIdsPropType;
exports.resourcesPropType = resourcesPropType;
exports.statusPropType = statusPropType;

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map