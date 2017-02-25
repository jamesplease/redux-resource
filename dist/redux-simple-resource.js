(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["createResource"] = factory();
	else
		root["createResource"] = factory();
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
	exports.upsertManyResources = exports.upsertResource = exports.updateManyResourcesMeta = exports.updateResourcesMeta = exports.xhrStatuses = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _lodash = __webpack_require__(1);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	var _generateReducer = __webpack_require__(2);
	
	var _generateReducer2 = _interopRequireDefault(_generateReducer);
	
	var _generateActionTypes = __webpack_require__(10);
	
	var _generateActionTypes2 = _interopRequireDefault(_generateActionTypes);
	
	var _utils = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var supportAllActions = {
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
	function createResource(resourceName) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var initialState = options.initialState,
	      idAttribute = options.idAttribute,
	      actionReducers = options.actionReducers,
	      pluralForm = options.pluralForm,
	      supportedActions = options.supportedActions;
	
	  var initial = Object.assign({}, (0, _utils.generateDefaultInitialState)(), initialState);
	  var idAttr = idAttribute || 'id';
	  var reducers = actionReducers || [];
	  var snakeCaseName = (0, _lodash2.default)(resourceName);
	  var pluralName = pluralForm ? pluralForm : resourceName + 's';
	  var snakeCasePluralName = (0, _lodash2.default)(pluralName);
	  var supportedCrudActions = _extends({}, supportAllActions, supportedActions);
	
	  var mappedReducers = reducers.reduce(function (memo, actionReducer) {
	    memo[actionReducer.actionType] = actionReducer.reducer;
	    return memo;
	  }, {});
	
	  var types = (0, _generateActionTypes2.default)(snakeCaseName, snakeCasePluralName, supportedCrudActions, Object.keys(mappedReducers));
	  return {
	    actionTypes: types,
	    initialState: initial,
	    reducer: (0, _generateReducer2.default)({
	      pluralForm: pluralName,
	      supportedActions: supportedCrudActions,
	      initialState: initial,
	      actionReducers: mappedReducers,
	      idAttr: idAttr, types: types, resourceName: resourceName
	    }),
	    pluralForm: pluralName
	  };
	}
	
	exports.xhrStatuses = _utils.xhrStatuses;
	exports.updateResourcesMeta = _utils.updateResourcesMeta;
	exports.updateManyResourcesMeta = _utils.updateManyResourcesMeta;
	exports.upsertResource = _utils.upsertResource;
	exports.upsertManyResources = _utils.upsertManyResources;
	exports.default = createResource;

/***/ },
/* 1 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;
	
	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';
	
	/** Used to match words composed of alphanumeric characters. */
	var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
	
	/** Used to match Latin Unicode letters (excluding mathematical operators). */
	var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
	
	/** Used to compose unicode character classes. */
	var rsAstralRange = '\\ud800-\\udfff',
	    rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
	    rsComboSymbolsRange = '\\u20d0-\\u20f0',
	    rsDingbatRange = '\\u2700-\\u27bf',
	    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
	    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
	    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
	    rsPunctuationRange = '\\u2000-\\u206f',
	    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
	    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
	    rsVarRange = '\\ufe0e\\ufe0f',
	    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
	
	/** Used to compose unicode capture groups. */
	var rsApos = "['\u2019]",
	    rsBreak = '[' + rsBreakRange + ']',
	    rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']',
	    rsDigits = '\\d+',
	    rsDingbat = '[' + rsDingbatRange + ']',
	    rsLower = '[' + rsLowerRange + ']',
	    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
	    rsFitz = '\\ud83c[\\udffb-\\udfff]',
	    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
	    rsNonAstral = '[^' + rsAstralRange + ']',
	    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
	    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
	    rsUpper = '[' + rsUpperRange + ']',
	    rsZWJ = '\\u200d';
	
	/** Used to compose unicode regexes. */
	var rsLowerMisc = '(?:' + rsLower + '|' + rsMisc + ')',
	    rsUpperMisc = '(?:' + rsUpper + '|' + rsMisc + ')',
	    rsOptLowerContr = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
	    rsOptUpperContr = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
	    reOptMod = rsModifier + '?',
	    rsOptVar = '[' + rsVarRange + ']?',
	    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
	    rsSeq = rsOptVar + reOptMod + rsOptJoin,
	    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;
	
	/** Used to match apostrophes. */
	var reApos = RegExp(rsApos, 'g');
	
	/**
	 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
	 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
	 */
	var reComboMark = RegExp(rsCombo, 'g');
	
	/** Used to match complex or compound words. */
	var reUnicodeWord = RegExp([
	  rsUpper + '?' + rsLower + '+' + rsOptLowerContr + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
	  rsUpperMisc + '+' + rsOptUpperContr + '(?=' + [rsBreak, rsUpper + rsLowerMisc, '$'].join('|') + ')',
	  rsUpper + '?' + rsLowerMisc + '+' + rsOptLowerContr,
	  rsUpper + '+' + rsOptUpperContr,
	  rsDigits,
	  rsEmoji
	].join('|'), 'g');
	
	/** Used to detect strings that need a more robust regexp to match words. */
	var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
	
	/** Used to map Latin Unicode letters to basic Latin letters. */
	var deburredLetters = {
	  // Latin-1 Supplement block.
	  '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
	  '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
	  '\xc7': 'C',  '\xe7': 'c',
	  '\xd0': 'D',  '\xf0': 'd',
	  '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
	  '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
	  '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
	  '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
	  '\xd1': 'N',  '\xf1': 'n',
	  '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
	  '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
	  '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
	  '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
	  '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
	  '\xc6': 'Ae', '\xe6': 'ae',
	  '\xde': 'Th', '\xfe': 'th',
	  '\xdf': 'ss',
	  // Latin Extended-A block.
	  '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
	  '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
	  '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
	  '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
	  '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
	  '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
	  '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
	  '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
	  '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
	  '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
	  '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
	  '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
	  '\u0134': 'J',  '\u0135': 'j',
	  '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
	  '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
	  '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
	  '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
	  '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
	  '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
	  '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
	  '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
	  '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
	  '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
	  '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
	  '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
	  '\u0163': 't',  '\u0165': 't', '\u0167': 't',
	  '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
	  '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
	  '\u0174': 'W',  '\u0175': 'w',
	  '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
	  '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
	  '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
	  '\u0132': 'IJ', '\u0133': 'ij',
	  '\u0152': 'Oe', '\u0153': 'oe',
	  '\u0149': "'n", '\u017f': 'ss'
	};
	
	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
	
	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
	
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();
	
	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as
	 *  the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array ? array.length : 0;
	
	  if (initAccum && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}
	
	/**
	 * Splits an ASCII `string` into an array of its words.
	 *
	 * @private
	 * @param {string} The string to inspect.
	 * @returns {Array} Returns the words of `string`.
	 */
	function asciiWords(string) {
	  return string.match(reAsciiWord) || [];
	}
	
	/**
	 * The base implementation of `_.propertyOf` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyOf(object) {
	  return function(key) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	/**
	 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
	 * letters to basic Latin letters.
	 *
	 * @private
	 * @param {string} letter The matched letter to deburr.
	 * @returns {string} Returns the deburred letter.
	 */
	var deburrLetter = basePropertyOf(deburredLetters);
	
	/**
	 * Checks if `string` contains a word composed of Unicode symbols.
	 *
	 * @private
	 * @param {string} string The string to inspect.
	 * @returns {boolean} Returns `true` if a word is found, else `false`.
	 */
	function hasUnicodeWord(string) {
	  return reHasUnicodeWord.test(string);
	}
	
	/**
	 * Splits a Unicode `string` into an array of its words.
	 *
	 * @private
	 * @param {string} The string to inspect.
	 * @returns {Array} Returns the words of `string`.
	 */
	function unicodeWords(string) {
	  return string.match(reUnicodeWord) || [];
	}
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Built-in value references. */
	var Symbol = root.Symbol;
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;
	
	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}
	
	/**
	 * Creates a function like `_.camelCase`.
	 *
	 * @private
	 * @param {Function} callback The function to combine each word.
	 * @returns {Function} Returns the new compounder function.
	 */
	function createCompounder(callback) {
	  return function(string) {
	    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
	  };
	}
	
	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}
	
	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}
	
	/**
	 * Deburrs `string` by converting
	 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
	 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
	 * letters to basic Latin letters and removing
	 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to deburr.
	 * @returns {string} Returns the deburred string.
	 * @example
	 *
	 * _.deburr('déjà vu');
	 * // => 'deja vu'
	 */
	function deburr(string) {
	  string = toString(string);
	  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
	}
	
	/**
	 * Converts `string` to
	 * [snake case](https://en.wikipedia.org/wiki/Snake_case).
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to convert.
	 * @returns {string} Returns the snake cased string.
	 * @example
	 *
	 * _.snakeCase('Foo Bar');
	 * // => 'foo_bar'
	 *
	 * _.snakeCase('fooBar');
	 * // => 'foo_bar'
	 *
	 * _.snakeCase('--FOO-BAR--');
	 * // => 'foo_bar'
	 */
	var snakeCase = createCompounder(function(result, word, index) {
	  return result + (index ? '_' : '') + word.toLowerCase();
	});
	
	/**
	 * Splits `string` into an array of its words.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to inspect.
	 * @param {RegExp|string} [pattern] The pattern to match words.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	 * @returns {Array} Returns the words of `string`.
	 * @example
	 *
	 * _.words('fred, barney, & pebbles');
	 * // => ['fred', 'barney', 'pebbles']
	 *
	 * _.words('fred, barney, & pebbles', /[^, ]+/g);
	 * // => ['fred', 'barney', '&', 'pebbles']
	 */
	function words(string, pattern, guard) {
	  string = toString(string);
	  pattern = guard ? undefined : pattern;
	
	  if (pattern === undefined) {
	    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
	  }
	  return string.match(pattern) || [];
	}
	
	module.exports = snakeCase;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = generateReducers;
	
	var _defaultReducers = __webpack_require__(3);
	
	var defaultReducers = _interopRequireWildcard(_defaultReducers);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	// "action reducers" are the functions that compute the new state given the
	// existin state and the action.
	// They are called "action reducers" because they are associated with a given
	// action type. It's sort of like `combineReducers()` in Redux, which associates
	// a reducer with a particular "slice" of the store. In redux-simple-resource,
	// the reducers are further split up into reducers for individual action types.
	//
	// This function merges in the default reducers, which handle basic CRUD
	// actions, with your passed-in actionReducers, which you may pass in as an
	// option when creating a resource.
	function getActionReducers(_ref) {
	  var _ref2, _ref3, _ref4, _ref5, _ref6;
	
	  var actionReducers = _ref.actionReducers,
	      resourceName = _ref.resourceName,
	      pluralForm = _ref.pluralForm,
	      supportedActions = _ref.supportedActions,
	      idAttr = _ref.idAttr;
	
	  var capitalResourceName = resourceName.toUpperCase();
	  var capitalPluralName = pluralForm.toUpperCase();
	  var create = supportedActions.create,
	      readOne = supportedActions.readOne,
	      readMany = supportedActions.readMany,
	      update = supportedActions.update,
	      del = supportedActions.del;
	
	
	  var createReducers = create ? (_ref2 = {}, _defineProperty(_ref2, 'CREATE_' + capitalResourceName, defaultReducers.create.bind(null, idAttr)), _defineProperty(_ref2, 'CREATE_' + capitalResourceName + '_FAIL', defaultReducers.createFail.bind(null, idAttr)), _defineProperty(_ref2, 'CREATE_' + capitalResourceName + '_SUCCEED', defaultReducers.createSucceed.bind(null, idAttr)), _defineProperty(_ref2, 'CREATE_' + capitalResourceName + '_ABORT', defaultReducers.createAbort.bind(null, idAttr)), _defineProperty(_ref2, 'CREATE_' + capitalResourceName + '_RESET', defaultReducers.createReset.bind(null, idAttr)), _ref2) : {};
	
	  var readOneReducers = readOne ? (_ref3 = {}, _defineProperty(_ref3, 'READ_ONE_' + capitalResourceName, defaultReducers.retrieveOne.bind(null, idAttr)), _defineProperty(_ref3, 'READ_ONE_' + capitalResourceName + '_FAIL', defaultReducers.retrieveOneFail.bind(null, idAttr)), _defineProperty(_ref3, 'READ_ONE_' + capitalResourceName + '_SUCCEED', defaultReducers.retrieveOneSucceed.bind(null, idAttr)), _defineProperty(_ref3, 'READ_ONE_' + capitalResourceName + '_ABORT', defaultReducers.retrieveOneAbort.bind(null, idAttr)), _defineProperty(_ref3, 'READ_ONE_' + capitalResourceName + '_RESET', defaultReducers.retrieveOneReset.bind(null, idAttr)), _ref3) : {};
	
	  var readManyReducers = readMany ? (_ref4 = {}, _defineProperty(_ref4, 'READ_MANY_' + capitalPluralName, defaultReducers.retrieveMany.bind(null, idAttr)), _defineProperty(_ref4, 'READ_MANY_' + capitalPluralName + '_FAIL', defaultReducers.retrieveManyFail.bind(null, idAttr)), _defineProperty(_ref4, 'READ_MANY_' + capitalPluralName + '_SUCCEED', defaultReducers.retrieveManySucceed.bind(null, idAttr)), _defineProperty(_ref4, 'READ_MANY_' + capitalPluralName + '_ABORT', defaultReducers.retrieveManyAbort.bind(null, idAttr)), _defineProperty(_ref4, 'READ_MANY_' + capitalPluralName + '_RESET', defaultReducers.retrieveManyReset.bind(null, idAttr)), _ref4) : {};
	
	  var updateReducers = update ? (_ref5 = {}, _defineProperty(_ref5, 'UPDATE_' + capitalResourceName, defaultReducers.update.bind(null, idAttr)), _defineProperty(_ref5, 'UPDATE_' + capitalResourceName + '_FAIL', defaultReducers.updateFail.bind(null, idAttr)), _defineProperty(_ref5, 'UPDATE_' + capitalResourceName + '_SUCCEED', defaultReducers.updateSucceed.bind(null, idAttr)), _defineProperty(_ref5, 'UPDATE_' + capitalResourceName + '_ABORT', defaultReducers.updateAbort.bind(null, idAttr)), _defineProperty(_ref5, 'UPDATE_' + capitalResourceName + '_RESET', defaultReducers.updateReset.bind(null, idAttr)), _ref5) : {};
	
	  var deleteReducers = del ? (_ref6 = {}, _defineProperty(_ref6, 'DELETE_' + capitalResourceName, defaultReducers.del.bind(null, idAttr)), _defineProperty(_ref6, 'DELETE_' + capitalResourceName + '_FAIL', defaultReducers.delFail.bind(null, idAttr)), _defineProperty(_ref6, 'DELETE_' + capitalResourceName + '_SUCCEED', defaultReducers.delSucceed.bind(null, idAttr)), _defineProperty(_ref6, 'DELETE_' + capitalResourceName + '_ABORT', defaultReducers.delAbort.bind(null, idAttr)), _defineProperty(_ref6, 'DELETE_' + capitalResourceName + '_RESET', defaultReducers.delReset.bind(null, idAttr)), _ref6) : {};
	
	  // Default reducers manage the five states of CRUD.
	  var allDefaultActionReducers = _extends({}, createReducers, readOneReducers, readManyReducers, updateReducers, deleteReducers);
	
	  return _extends({}, allDefaultActionReducers, actionReducers);
	}
	
	function generateReducers(options) {
	  var idAttr = options.idAttr,
	      initialState = options.initialState,
	      actionReducers = options.actionReducers,
	      resourceName = options.resourceName,
	      pluralForm = options.pluralForm,
	      supportedActions = options.supportedActions;
	
	  var allActionReducers = getActionReducers({ actionReducers: actionReducers, resourceName: resourceName, pluralForm: pluralForm, supportedActions: supportedActions, idAttr: idAttr });
	
	  return function reducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	    var action = arguments[1];
	
	    var actionReducer = allActionReducers[action.type];
	    if (!actionReducer) {
	      return state;
	    }
	    var result = actionReducer(state, action);
	    return result ? result : state;
	  };
	}
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _create = __webpack_require__(4);
	
	Object.keys(_create).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _create[key];
	    }
	  });
	});
	
	var _readOne = __webpack_require__(6);
	
	Object.keys(_readOne).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _readOne[key];
	    }
	  });
	});
	
	var _readMany = __webpack_require__(7);
	
	Object.keys(_readMany).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _readMany[key];
	    }
	  });
	});
	
	var _update = __webpack_require__(8);
	
	Object.keys(_update).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _update[key];
	    }
	  });
	});
	
	var _delete = __webpack_require__(9);
	
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
/* 4 */
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
	
	var _utils = __webpack_require__(5);
	
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
	
	function createSucceed(idAttribute, state, action) {
	  var newResourceId = action.resource[idAttribute];
	  var resources = (0, _utils.upsertResource)({
	    resources: state.resources,
	    resource: action.resource,
	    id: action[idAttribute],
	    idAttribute: idAttribute
	  });
	  var resourcesMeta = (0, _utils.updateResourcesMeta)({
	    resourcesMeta: state.resourcesMeta,
	    newMeta: _utils.initialResourceMetaState,
	    id: newResourceId
	  });
	
	  return _extends({}, state, {
	    resources: resources,
	    resourcesMeta: resourcesMeta,
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
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.updateResourcesMeta = updateResourcesMeta;
	exports.updateManyResourcesMeta = updateManyResourcesMeta;
	exports.upsertResource = upsertResource;
	exports.upsertManyResources = upsertManyResources;
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
	function updateResourcesMeta(_ref) {
	  var resourcesMeta = _ref.resourcesMeta,
	      newMeta = _ref.newMeta,
	      id = _ref.id;
	
	  return _extends({}, resourcesMeta, _defineProperty({}, id, _extends({}, resourcesMeta[id], newMeta)));
	}
	
	// Similar to `updateResourcesMeta`, but it accepts an array of IDs instead of
	// a single ID.
	function updateManyResourcesMeta(_ref2) {
	  var resourcesMeta = _ref2.resourcesMeta,
	      newMeta = _ref2.newMeta,
	      ids = _ref2.ids,
	      replace = _ref2.replace;
	
	  var next = replace ? {} : _extends({}, resourcesMeta);
	
	  ids.forEach(function (id) {
	    var current = next[id];
	    next[id] = _extends({}, current, newMeta);
	  });
	
	  return next;
	}
	
	// resources: the Array of resources
	// resource: the new resource object to be added or updated
	// id: the ID of the resource being updated
	function upsertResource(_ref3) {
	  var resources = _ref3.resources,
	      resource = _ref3.resource,
	      id = _ref3.id,
	      idAttribute = _ref3.idAttribute,
	      replace = _ref3.replace;
	
	  // Attempt to find the resource by its ID. If the ID doesn't exist, or if
	  // no resource by that ID exists, then we append it to the end as a new
	  // resource.
	  var resourceIndex = id && resources.findIndex(function (item) {
	    return item[idAttribute] === id;
	  });
	  if (!id || resourceIndex === -1) {
	    return [].concat(_toConsumableArray(resources), [resource]);
	  }
	
	  var shallowClone = [].concat(_toConsumableArray(resources));
	
	  var resourceToInsert = void 0;
	  if (!replace) {
	    var currentResource = shallowClone[resourceIndex];
	    resourceToInsert = _extends({}, currentResource, resource);
	  } else {
	    resourceToInsert = resource;
	  }
	
	  // Otherwise, it does exist and we add it to the list at the appropriate
	  // location
	  shallowClone.splice(resourceIndex, 1, resourceToInsert);
	  return shallowClone;
	}
	
	function upsertManyResources(_ref4) {
	  var resources = _ref4.resources,
	      newResources = _ref4.newResources,
	      idAttribute = _ref4.idAttribute,
	      replace = _ref4.replace;
	
	  var shallowClone = [].concat(_toConsumableArray(resources));
	
	  newResources.forEach(function (resource) {
	    var id = resource[idAttribute];
	    var resourceIndex = id && resources.findIndex(function (item) {
	      return item[idAttribute] === id;
	    });
	
	    if (!id || resourceIndex === -1) {
	      return shallowClone.push(resource);
	    }
	
	    var resourceToInsert = void 0;
	    if (!replace) {
	      var currentResource = shallowClone[resourceIndex];
	      resourceToInsert = _extends({}, currentResource, resource);
	    } else {
	      resourceToInsert = resource;
	    }
	
	    shallowClone.splice(resourceIndex, 1, resourceToInsert);
	  });
	
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
/* 6 */
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
	
	var _utils = __webpack_require__(5);
	
	function retrieveOne(idAttr, state, action) {
	  var resourcesMeta = (0, _utils.updateResourcesMeta)({
	    resourcesMeta: state.resourcesMeta,
	    newMeta: { retrievingStatus: _utils.xhrStatuses.PENDING },
	    id: action[idAttr]
	  });
	
	  return _extends({}, state, {
	    resourcesMeta: resourcesMeta
	  });
	}
	
	function retrieveOneFail(idAttr, state, action) {
	  var resourcesMeta = (0, _utils.updateResourcesMeta)({
	    resourcesMeta: state.resourcesMeta,
	    newMeta: { retrievingStatus: _utils.xhrStatuses.FAILED },
	    id: action[idAttr]
	  });
	
	  return _extends({}, state, {
	    resourcesMeta: resourcesMeta
	  });
	}
	
	function retrieveOneSucceed(idAttribute, state, action) {
	  var resourcesMeta = (0, _utils.updateResourcesMeta)({
	    resourcesMeta: state.resourcesMeta,
	    newMeta: { retrievingStatus: _utils.xhrStatuses.SUCCEEDED },
	    id: action[idAttribute]
	  });
	
	  var replace = typeof action.replace !== 'undefined' ? action.replace : true;
	  var resources = (0, _utils.upsertResource)({
	    resources: state.resources,
	    resource: action.resource,
	    id: action[idAttribute],
	    idAttribute: idAttribute, replace: replace
	  });
	
	  return _extends({}, state, {
	    resourcesMeta: resourcesMeta,
	    resources: resources
	  });
	}
	
	function retrieveOneAbort(idAttr, state, action) {
	  var resourcesMeta = (0, _utils.updateResourcesMeta)({
	    resourcesMeta: state.resourcesMeta,
	    newMeta: { retrievingStatus: _utils.xhrStatuses.ABORTED },
	    id: action[idAttr]
	  });
	
	  return _extends({}, state, {
	    resourcesMeta: resourcesMeta
	  });
	}
	
	function retrieveOneReset(idAttr, state, action) {
	  var resourcesMeta = (0, _utils.updateResourcesMeta)({
	    resourcesMeta: state.resourcesMeta,
	    newMeta: { retrievingStatus: _utils.xhrStatuses.NULL },
	    id: action[idAttr]
	  });
	
	  return _extends({}, state, {
	    resourcesMeta: resourcesMeta
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
	
	exports.retrieveMany = retrieveMany;
	exports.retrieveManyFail = retrieveManyFail;
	exports.retrieveManySucceed = retrieveManySucceed;
	exports.retrieveManyAbort = retrieveManyAbort;
	exports.retrieveManyReset = retrieveManyReset;
	
	var _utils = __webpack_require__(5);
	
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
	
	function retrieveManySucceed(idAttribute, state, action) {
	  var resources = action.resources;
	  var ids = resources.map(function (r) {
	    return r[idAttribute];
	  });
	  var replace = typeof action.replace !== 'undefined' ? action.replace : true;
	
	  var newResources = void 0;
	  if (!replace) {
	    newResources = (0, _utils.upsertManyResources)({
	      resources: state.resources,
	      replace: false,
	      newResources: resources,
	      idAttribute: idAttribute
	    });
	  } else {
	    newResources = resources;
	  }
	
	  return _extends({}, state, {
	    resources: newResources,
	    // We have new resources, so we need to update their meta state with the
	    // initial meta state.
	    resourcesMeta: (0, _utils.updateManyResourcesMeta)({
	      resourcesMeta: state.resourcesMeta,
	      newMeta: _utils.initialResourceMetaState,
	      ids: ids, replace: replace
	    }),
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
/* 8 */
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
	
	var _utils = __webpack_require__(5);
	
	function update(idAttr, state, action) {
	  var resourcesMeta = (0, _utils.updateResourcesMeta)({
	    resourcesMeta: state.resourcesMeta,
	    newMeta: { updatingStatus: _utils.xhrStatuses.PENDING },
	    id: action[idAttr]
	  });
	
	  return _extends({}, state, {
	    resourcesMeta: resourcesMeta
	  });
	}
	
	function updateFail(idAttr, state, action) {
	  var resourcesMeta = (0, _utils.updateResourcesMeta)({
	    resourcesMeta: state.resourcesMeta,
	    newMeta: { updatingStatus: _utils.xhrStatuses.FAILED },
	    id: action[idAttr]
	  });
	
	  return _extends({}, state, {
	    resourcesMeta: resourcesMeta
	  });
	}
	
	function updateSucceed(idAttribute, state, action) {
	  var resourcesMeta = (0, _utils.updateResourcesMeta)({
	    resourcesMeta: state.resourcesMeta,
	    newMeta: { updatingStatus: _utils.xhrStatuses.SUCCEEDED },
	    id: action[idAttribute]
	  });
	
	  var replace = typeof action.replace !== 'undefined' ? action.replace : true;
	  var resources = (0, _utils.upsertResource)({
	    resources: state.resources,
	    resource: action.resource,
	    id: action[idAttribute],
	    idAttribute: idAttribute, replace: replace
	  });
	
	  return _extends({}, state, {
	    resourcesMeta: resourcesMeta,
	    resources: resources
	  });
	}
	
	function updateAbort(idAttr, state, action) {
	  var resourcesMeta = (0, _utils.updateResourcesMeta)({
	    resourcesMeta: state.resourcesMeta,
	    newMeta: { updatingStatus: _utils.xhrStatuses.ABORTED },
	    id: action[idAttr]
	  });
	
	  return _extends({}, state, {
	    resourcesMeta: resourcesMeta
	  });
	}
	
	function updateReset(idAttr, state, action) {
	  var resourcesMeta = (0, _utils.updateResourcesMeta)({
	    resourcesMeta: state.resourcesMeta,
	    newMeta: { updatingStatus: _utils.xhrStatuses.NULL },
	    id: action[idAttr]
	  });
	
	  return _extends({}, state, {
	    resourcesMeta: resourcesMeta
	  });
	}

/***/ },
/* 9 */
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
	
	var _utils = __webpack_require__(5);
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function del(idAttr, state, action) {
	  var resourcesMeta = (0, _utils.updateResourcesMeta)({
	    resourcesMeta: state.resourcesMeta,
	    newMeta: { deletingStatus: _utils.xhrStatuses.PENDING },
	    id: action[idAttr]
	  });
	
	  return _extends({}, state, {
	    resourcesMeta: resourcesMeta
	  });
	}
	
	function delFail(idAttr, state, action) {
	  var resourcesMeta = (0, _utils.updateResourcesMeta)({
	    resourcesMeta: state.resourcesMeta,
	    newMeta: { deletingStatus: _utils.xhrStatuses.FAILED },
	    id: action[idAttr]
	  });
	
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
	    return r[idAttr] !== id;
	  });
	
	  return _extends({}, state, {
	    resourcesMeta: resourcesMeta,
	    resources: resources
	  });
	}
	
	function delAbort(idAttr, state, action) {
	  var resourcesMeta = (0, _utils.updateResourcesMeta)({
	    resourcesMeta: state.resourcesMeta,
	    newMeta: { deletingStatus: _utils.xhrStatuses.ABORTED },
	    id: action[idAttr]
	  });
	
	  return _extends({}, state, {
	    resourcesMeta: resourcesMeta
	  });
	}
	
	function delReset(idAttr, state, action) {
	  var resourcesMeta = (0, _utils.updateResourcesMeta)({
	    resourcesMeta: state.resourcesMeta,
	    newMeta: { deletingStatus: _utils.xhrStatuses.NULL },
	    id: action[idAttr]
	  });
	
	  return _extends({}, state, {
	    resourcesMeta: resourcesMeta
	  });
	}

/***/ },
/* 10 */
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
	
	// This is a map of the four CRUD actions to the five async action types
	
	exports.default = function (resourceName, pluralForm, supportedActions, customTypes) {
	  var capitalResourceName = resourceName.toUpperCase();
	  var capitalPluralName = pluralForm.toUpperCase();
	  var create = supportedActions.create,
	      readOne = supportedActions.readOne,
	      readMany = supportedActions.readMany,
	      update = supportedActions.update,
	      del = supportedActions.del;
	
	
	  var createTypes = create ? mapConstant(capitalResourceName, 'CREATE') : {};
	  var readOneTypes = readOne ? mapConstant(capitalResourceName, 'READ_ONE') : {};
	  var readManyTypes = readMany ? mapConstant(capitalPluralName, 'READ_MANY') : {};
	  var updateTypes = update ? mapConstant(capitalResourceName, 'UPDATE') : {};
	  var deleteTypes = del ? mapConstant(capitalResourceName, 'DELETE') : {};
	
	  var custom = {};
	  customTypes.forEach(function (value) {
	    return custom[value] = value;
	  });
	
	  return _extends({}, createTypes, readOneTypes, readManyTypes, updateTypes, deleteTypes, custom);
	};
	
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=redux-simple-resource.js.map