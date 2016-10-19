"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.setAssertions = exports.TYPE_SPEC = exports.TYPE_FUNCTION_GENERATOR = exports.TYPE_FUNCTION = exports.TYPE_ARRAY = exports.TYPE_OBJECT_ERROR = exports.TYPE_OBJECT_ITERATOR = exports.TYPE_OBJECT_REGEXP = exports.TYPE_OBJECT_LITERAL = exports.TYPE_OBJECT = exports.TYPE_SYMBOL = exports.TYPE_STRING_NONEMPTY = exports.TYPE_STRING_CHAR = exports.TYPE_STRING_EMPTY = exports.TYPE_STRING = exports.TYPE_NUMBER_INT_NEG = exports.TYPE_NUMBER_INT_POS_MAX = exports.TYPE_NUMBER_INT_POS_32 = exports.TYPE_NUMBER_INT_POS_24 = exports.TYPE_NUMBER_INT_POS_16 = exports.TYPE_NUMBER_INT_POS_8 = exports.TYPE_NUMBER_INT_POS = exports.TYPE_NUMBER_INT = exports.TYPE_NUMBER_NEG = exports.TYPE_NUMBER_POS = exports.TYPE_NUMBER_NAN = exports.TYPE_NUMBER = exports.TYPE_BOOLEAN = exports.TYPE_NULL = exports.TYPE_UNDEFINED = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = use;
exports.registerSpec = registerSpec;
exports.getCallSpec = getCallSpec;

var _assertions = require("./assertions");

var assertions = _interopRequireWildcard(_assertions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var _marked = [generator].map(regeneratorRuntime.mark);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TYPE_UNDEFINED = exports.TYPE_UNDEFINED = Symbol("undefined");
var TYPE_NULL = exports.TYPE_NULL = Symbol("null");

var TYPE_BOOLEAN = exports.TYPE_BOOLEAN = Symbol("boolean");

var TYPE_NUMBER = exports.TYPE_NUMBER = Symbol("number");
var TYPE_NUMBER_NAN = exports.TYPE_NUMBER_NAN = Symbol("NaN");
var TYPE_NUMBER_POS = exports.TYPE_NUMBER_POS = Symbol("number: n>=0");
var TYPE_NUMBER_NEG = exports.TYPE_NUMBER_NEG = Symbol("number: n<=0");
var TYPE_NUMBER_INT = exports.TYPE_NUMBER_INT = Symbol("number: n%1==0");
var TYPE_NUMBER_INT_POS = exports.TYPE_NUMBER_INT_POS = Symbol("number: n%1==0&&n>=0");
var TYPE_NUMBER_INT_POS_8 = exports.TYPE_NUMBER_INT_POS_8 = Symbol("number: n%1==0%%n>=0&&n<(1<<7)");
var TYPE_NUMBER_INT_POS_16 = exports.TYPE_NUMBER_INT_POS_16 = Symbol("number: n%1==0&&n>=0&&n<(1<<15)");
var TYPE_NUMBER_INT_POS_24 = exports.TYPE_NUMBER_INT_POS_24 = Symbol("number: n%1==0&&n>=0&&n<(1<<23)");
var TYPE_NUMBER_INT_POS_32 = exports.TYPE_NUMBER_INT_POS_32 = Symbol("number: n%1==0&&n>=0&&n<(1<<31)");
var TYPE_NUMBER_INT_POS_MAX = exports.TYPE_NUMBER_INT_POS_MAX = Symbol("number: n%1==0&&n>=0");
var TYPE_NUMBER_INT_NEG = exports.TYPE_NUMBER_INT_NEG = Symbol("number: n%1==0&&n<=0");

var TYPE_STRING = exports.TYPE_STRING = Symbol("string");
var TYPE_STRING_EMPTY = exports.TYPE_STRING_EMPTY = Symbol("string: ^$");
var TYPE_STRING_CHAR = exports.TYPE_STRING_CHAR = Symbol("string: ^.$");
var TYPE_STRING_NONEMPTY = exports.TYPE_STRING_NONEMPTY = Symbol("string: ^.+$");

var TYPE_SYMBOL = exports.TYPE_SYMBOL = Symbol("symbol");

var TYPE_OBJECT = exports.TYPE_OBJECT = Symbol("object");
var TYPE_OBJECT_LITERAL = exports.TYPE_OBJECT_LITERAL = Symbol("object: {}");
var TYPE_OBJECT_REGEXP = exports.TYPE_OBJECT_REGEXP = Symbol("object: RegExp");
var TYPE_OBJECT_ITERATOR = exports.TYPE_OBJECT_ITERATOR = Symbol("object: #next()");
var TYPE_OBJECT_ERROR = exports.TYPE_OBJECT_ERROR = Symbol("object: Error");

var TYPE_ARRAY = exports.TYPE_ARRAY = Symbol("object: array");

var TYPE_FUNCTION = exports.TYPE_FUNCTION = Symbol("function");
var TYPE_FUNCTION_GENERATOR = exports.TYPE_FUNCTION_GENERATOR = Symbol("function*");

var TYPE_SPEC = exports.TYPE_SPEC = Symbol("client");

var FLAG_TYPE_VALID = 0x80000;

var FLAG_TYPE_UNDEFINED = 0x01;
var FLAG_TYPE_NULL = 0x02;
var FLAG_TYPE_BOOLEAN = 0x04;
var FLAG_TYPE_NUMBER = 0x08;
var FLAG_TYPE_STRING = 0x10;
var FLAG_TYPE_SYMBOL = 0x20;
var FLAG_TYPE_OBJ = 0x80;
var FLAG_TYPE_FUNCTION = 0x4000;

var FLAG_NUM_NAN = 0x00100;
var FLAG_NUM_INT = 0x00200;
var FLAG_NUM_POS = 0x00400;
var FLAG_NUM_NEG = 0x200000;
var FLAG_NUM_8 = 0x1000000;
var FLAG_NUM_16 = 0x2000000;
var FLAG_NUM_24 = 0x100000;
var FLAG_NUM_32 = 0x400000;
var FLAG_NUM_MAX = 0x800000;
var FLAG_STR_EMPTY = 0x00800;
var FLAG_STR_CHARACTER = 0x01000;
var FLAG_STR_NONEMPTY = 0x02000;
var FLAG_OBJ_LITERAL = 0x4000000;
var FLAG_OBJ_REGEXP = 0x40;
var FLAG_OBJ_ARR = 0x08000;
var FLAG_OBJ_ERR = 0x10000;
var FLAG_OBJ_IT = 0x20000;
var FLAG_FN_GEN = 0x40000;

var map = new Map([[TYPE_UNDEFINED, FLAG_TYPE_UNDEFINED], [TYPE_NULL, FLAG_TYPE_NULL], [TYPE_BOOLEAN, FLAG_TYPE_BOOLEAN], [TYPE_NUMBER, FLAG_TYPE_NUMBER], [TYPE_NUMBER_NAN, FLAG_TYPE_NUMBER | FLAG_NUM_NAN], [TYPE_NUMBER_POS, FLAG_TYPE_NUMBER | FLAG_NUM_POS], [TYPE_NUMBER_NEG, FLAG_TYPE_NUMBER | FLAG_NUM_NEG], [TYPE_NUMBER_INT, FLAG_TYPE_NUMBER | FLAG_NUM_INT], [TYPE_NUMBER_INT_POS, FLAG_TYPE_NUMBER | FLAG_NUM_INT | FLAG_NUM_POS], [TYPE_NUMBER_INT_NEG, FLAG_TYPE_NUMBER | FLAG_NUM_INT | FLAG_NUM_NEG], [TYPE_NUMBER_INT_POS_8, FLAG_TYPE_NUMBER | FLAG_NUM_INT | FLAG_NUM_POS | FLAG_NUM_8 | FLAG_NUM_16 | FLAG_NUM_24 | FLAG_NUM_32 | FLAG_NUM_MAX], [TYPE_NUMBER_INT_POS_16, FLAG_TYPE_NUMBER | FLAG_NUM_INT | FLAG_NUM_POS | FLAG_NUM_16 | FLAG_NUM_24 | FLAG_NUM_32 | FLAG_NUM_MAX], [TYPE_NUMBER_INT_POS_24, FLAG_TYPE_NUMBER | FLAG_NUM_INT | FLAG_NUM_POS | FLAG_NUM_24 | FLAG_NUM_32 | FLAG_NUM_MAX], [TYPE_NUMBER_INT_POS_32, FLAG_TYPE_NUMBER | FLAG_NUM_INT | FLAG_NUM_POS | FLAG_NUM_32 | FLAG_NUM_MAX], [TYPE_NUMBER_INT_POS_MAX, FLAG_TYPE_NUMBER | FLAG_NUM_INT | FLAG_NUM_POS | FLAG_NUM_MAX], [TYPE_STRING, FLAG_TYPE_STRING], [TYPE_STRING_EMPTY, FLAG_TYPE_STRING | FLAG_STR_EMPTY], [TYPE_STRING_CHAR, FLAG_TYPE_STRING | FLAG_STR_CHARACTER | FLAG_STR_NONEMPTY], [TYPE_STRING_NONEMPTY, FLAG_TYPE_STRING | FLAG_STR_NONEMPTY], [TYPE_SYMBOL, FLAG_TYPE_SYMBOL], [TYPE_OBJECT, FLAG_TYPE_OBJ], [TYPE_OBJECT_LITERAL, FLAG_TYPE_OBJ | FLAG_OBJ_LITERAL], [TYPE_OBJECT_REGEXP, FLAG_TYPE_OBJ | FLAG_OBJ_REGEXP], [TYPE_OBJECT_ERROR, FLAG_TYPE_OBJ | FLAG_OBJ_ERR], [TYPE_OBJECT_ITERATOR, FLAG_TYPE_OBJ | FLAG_OBJ_IT], [TYPE_ARRAY, FLAG_TYPE_OBJ | FLAG_OBJ_ARR | FLAG_OBJ_IT], [TYPE_FUNCTION, FLAG_TYPE_FUNCTION], [TYPE_FUNCTION_GENERATOR, FLAG_TYPE_FUNCTION | FLAG_FN_GEN]]);

var TYPES = Object.freeze([TYPE_UNDEFINED, TYPE_NULL, TYPE_BOOLEAN, TYPE_NUMBER, TYPE_NUMBER_NAN, TYPE_NUMBER_POS, TYPE_NUMBER_NEG, TYPE_NUMBER_INT, TYPE_NUMBER_INT_POS, TYPE_NUMBER_INT_NEG, TYPE_NUMBER_INT_POS_8, TYPE_NUMBER_INT_POS_16, TYPE_NUMBER_INT_POS_24, TYPE_NUMBER_INT_POS_32, TYPE_NUMBER_INT_POS_MAX, TYPE_STRING, TYPE_STRING_EMPTY, TYPE_STRING_CHAR, TYPE_STRING_NONEMPTY, TYPE_SYMBOL, TYPE_OBJECT, TYPE_OBJECT_LITERAL, TYPE_OBJECT_REGEXP, TYPE_OBJECT_ERROR, TYPE_OBJECT_ITERATOR, TYPE_ARRAY, TYPE_FUNCTION, TYPE_FUNCTION_GENERATOR]);

var nextSymbol = 0;

var clientSymbol = [];
var clientValue = [];

function _buildDescriptor(props) {
	var res = {};

	for (var prop in props) {
		res[prop] = {
			value: props[prop],
			writable: true,
			enumerable: true
		};
	}return res;
}

function _isType(type) {
	return TYPES.indexOf(type) !== -1;
}

function _isSpec(arg) {
	return (typeof arg === "undefined" ? "undefined" : _typeof(arg)) === 'object' && arg !== null && TYPE_SPEC in arg;
}

function _buildSpec(item, validTypes) {
	var _ref;

	var type = _isType(item) ? item : _getClientType(item);
	var flags = _getFlags(item);
	var valid = _isValidArgument(validTypes, flags);

	return _ref = {}, _defineProperty(_ref, TYPE_SPEC, true), _defineProperty(_ref, "type", type), _defineProperty(_ref, "valid", valid), _defineProperty(_ref, "value", _getArgument(type)), _ref;
}

function _extendSpec(item) {
	if (!('value' in item)) throw new Error();

	var desc = _buildDescriptor({
		type: _getClientType(item.value),
		valid: 'valid' in item ? item.valid : true
	});

	return Object.create(item, desc);
}

function _getClientType(item) {
	var index = clientValue.indexOf(item);

	if (index === -1) {
		index = clientSymbol.length;

		clientSymbol.push(Symbol("client#" + index));
		clientValue.push(item);
	}

	return clientSymbol[index];
}

function _getClientValue(symbol) {
	var index = clientSymbol.indexOf(symbol);

	if (index === -1) throw new Error();

	return clientValue[index];
}

function _clearClientCache() {
	clientValue.splice(0, clientValue.length);
	clientSymbol.splice(0, clientSymbol.length);
}

function _isValid(args) {
	try {
		args.forEach(function (item, index, source) {
			if (!Array.isArray(item)) throw new TypeError();
		});
	} catch (err) {
		return false;
	}

	return true;
}

function _getFlags(item) {
	return _isType(item) ? map.get(item) : FLAG_TYPE_VALID;
}

function _getFilteredSpecs(list) {
	var types = TYPES.slice(0);

	var filter = [TYPE_NUMBER, TYPE_NUMBER_INT, TYPE_NUMBER_INT_POS, TYPE_STRING, TYPE_OBJECT];

	list.forEach(function (item, index, source) {
		if (!_isType(item)) types.push(item);
	});

	return types.filter(function (item, index, source) {
		return filter.indexOf(item) === -1;
	}).map(function (item, index, source) {
		return _isSpec(item) ? _extendSpec(item) : _buildSpec(item, list);
	});
}

function _getDefaultSpecs(args) {
	return args.map(function (item, index, source) {
		if (item.length === 0) return _buildSpec(TYPE_UNDEFINED, []);

		var first = item[0];

		return Object.create(_isSpec(first) ? _extendSpec(first) : _buildSpec(first, item));
	});
}

function _getNumber(positive, integer, min, max) {
	var range = Math.max(max - min, 0);

	var n = Math.abs(Math.random() * range) * (positive ? 1 : -1);

	return integer ? Math.trunc(n) : n;
}

function _isValidArgument(list, flags) {
	if (flags === FLAG_TYPE_VALID) return true;

	return list.some(function (item, index, source) {
		var itemFlags = _getFlags(item);

		return (itemFlags & flags) === itemFlags;
	});
}

function _getArgument(type) {
	switch (type) {
		case TYPE_UNDEFINED:
			return undefined;
		case TYPE_NULL:
			return null;
		case TYPE_BOOLEAN:
			return Boolean(Math.random());
		case TYPE_NUMBER:
			return _getNumber(true, false, 0, Number.MAX_VALUE);
		case TYPE_NUMBER_NAN:
			return NaN;
		case TYPE_NUMBER_POS:
			return _getNumber(true, false, 0, Number.MAX_VALUE);
		case TYPE_NUMBER_NEG:
			return _getNumber(false, false, -Number.MAX_VALUE, 0);
		case TYPE_NUMBER_INT:
			return _getNumber(true, true, 0, Number.MAX_SAFE_INTEGER);
		case TYPE_NUMBER_INT_NEG:
			return _getNumber(false, true, 0, Number.MAX_SAFE_INTEGER);
		case TYPE_NUMBER_INT_POS:
			return _getNumber(true, true, 0, Number.MAX_SAFE_INTEGER);
		case TYPE_NUMBER_INT_POS_8:
			return _getNumber(true, true, 0, 0xff);
		case TYPE_NUMBER_INT_POS_16:
			return _getNumber(true, true, 0x0100, 0xffff);
		case TYPE_NUMBER_INT_POS_24:
			return _getNumber(true, true, 0x010000, 0xffffff);
		case TYPE_NUMBER_INT_POS_32:
			return _getNumber(true, true, 0x01000000, 0xffffffff);
		case TYPE_NUMBER_INT_POS_MAX:
			return _getNumber(true, true, 0x100000000, Number.MAX_SAFE_INTEGER);
		case TYPE_STRING:
			return 'abc';
		case TYPE_STRING_EMPTY:
			return '';
		case TYPE_STRING_CHAR:
			return 'a';
		case TYPE_STRING_NONEMPTY:
			return 'abc';
		case TYPE_SYMBOL:
			return Symbol("Symbol#" + ++nextSymbol);
		case TYPE_OBJECT:
		case TYPE_OBJECT_LITERAL:
			return {};
		case TYPE_OBJECT_REGEXP:
			return (/^$/
			);
		case TYPE_OBJECT_ERROR:
			return new Error();
		case TYPE_OBJECT_ITERATOR:
			return regeneratorRuntime.mark(function _callee() {
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
							case "end":
								return _context.stop();
						}
					}
				}, _callee, this);
			})();
		case TYPE_ARRAY:
			return [];
		case TYPE_FUNCTION:
			return function () {
				return null;
			};
		case TYPE_FUNCTION_GENERATOR:
			return regeneratorRuntime.mark(function _callee2() {
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
							case "end":
								return _context2.stop();
						}
					}
				}, _callee2, this);
			});
		default:
			return _getClientValue(type);
	}
}

function generator() {
	for (var _len = arguments.length, validTypes = Array(_len), _key = 0; _key < _len; _key++) {
		validTypes[_key] = arguments[_key];
	}

	var defaults, defValid, i, specs, list, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, spec;

	return regeneratorRuntime.wrap(function generator$(_context3) {
		while (1) {
			switch (_context3.prev = _context3.next) {
				case 0:
					if (_isValid(validTypes)) {
						_context3.next = 2;
						break;
					}

					throw new TypeError();

				case 2:

					_clearClientCache();

					defaults = _getDefaultSpecs(validTypes);
					defValid = defaults.every(function (item, index, source) {
						return item.valid;
					});
					i = validTypes.length - 1;

				case 6:
					if (!(i > -1)) {
						_context3.next = 39;
						break;
					}

					specs = defaults.slice(0);
					list = validTypes[i];
					_iteratorNormalCompletion = true;
					_didIteratorError = false;
					_iteratorError = undefined;
					_context3.prev = 12;
					_iterator = _getFilteredSpecs(list)[Symbol.iterator]();

				case 14:
					if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
						_context3.next = 22;
						break;
					}

					spec = _step.value;

					specs.splice(i, 1, spec);

					_context3.next = 19;
					return {
						valid: defValid && spec.valid,
						specs: specs,
						values: specs.map(function (item, index, source) {
							return item.value;
						})
					};

				case 19:
					_iteratorNormalCompletion = true;
					_context3.next = 14;
					break;

				case 22:
					_context3.next = 28;
					break;

				case 24:
					_context3.prev = 24;
					_context3.t0 = _context3["catch"](12);
					_didIteratorError = true;
					_iteratorError = _context3.t0;

				case 28:
					_context3.prev = 28;
					_context3.prev = 29;

					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}

				case 31:
					_context3.prev = 31;

					if (!_didIteratorError) {
						_context3.next = 34;
						break;
					}

					throw _iteratorError;

				case 34:
					return _context3.finish(31);

				case 35:
					return _context3.finish(28);

				case 36:
					i -= 1;
					_context3.next = 6;
					break;

				case 39:
				case "end":
					return _context3.stop();
			}
		}
	}, _marked[0], this, [[12, 24, 28, 36], [29,, 31, 35]]);
}

var _spec = null;

/**
 * Creates a list of arguments and tests against the last argument
 * @param {...*} args
 * @throws {TypeError} if the last argument is not a function
 */
function use() {
	for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
		args[_key2] = arguments[_key2];
	}

	var fn = args.pop();

	if (typeof fn !== 'function') throw new TypeError();

	var assert = assertions.get();

	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;

	try {
		for (var _iterator2 = generator.apply(undefined, args)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
			var spec = _step2.value;

			_spec = spec;

			var _args4 = spec.values.slice(0);

			if (spec.valid) assert.return(fn, _args4);else assert.throw(fn, _args4);
		}
	} catch (err) {
		_didIteratorError2 = true;
		_iteratorError2 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion2 && _iterator2.return) {
				_iterator2.return();
			}
		} finally {
			if (_didIteratorError2) {
				throw _iteratorError2;
			}
		}
	}

	_spec = null;
}

/**
 * Registers obj for use as a spec object
 * @param {Object} obj - The source object
 * @returns {Object}
 * @throws {TypeError} if obj is not an object
 */
function registerSpec(obj) {
	if (obj.constructor !== Object) throw new TypeError();

	return Object.assign(obj, _defineProperty({}, TYPE_SPEC, true));
}

/**
 * Returns the specification of the current assertion call or null
 * @returns {Object|null}
 */
function getCallSpec() {
	return _spec;
}

var setAssertions = exports.setAssertions = assertions.set;