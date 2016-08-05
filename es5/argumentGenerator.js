"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TYPE_OBJ_GENERATOR = exports.TYPE_OBJ_ITERATOR = exports.TYPE_OBJ_ERR = exports.TYPE_OBJ_ARR = exports.TYPE_OBJ_FN = exports.TYPE_OBJ = exports.TYPE_REGEXP = exports.TYPE_SYMBOL = exports.TYPE_STRING_NONEMPTY = exports.TYPE_STRING_CHAR = exports.TYPE_STRING_EMPTY = exports.TYPE_STRING = exports.TYPE_NUMBER_INT_POS_MAX = exports.TYPE_NUMBER_INT_POS_32 = exports.TYPE_NUMBER_INT_POS_24 = exports.TYPE_NUMBER_INT_POS_16 = exports.TYPE_NUMBER_INT_POS_8 = exports.TYPE_NUMBER_INT_NEG = exports.TYPE_NUMBER_INT_POS = exports.TYPE_NUMBER_INT = exports.TYPE_NUMBER_NEG = exports.TYPE_NUMBER_POS = exports.TYPE_NUMBER_NAN = exports.TYPE_NUMBER = exports.TYPE_BOOLEAN = exports.TYPE_NULL = exports.TYPE_UNDEFINED = undefined;
exports.default = generator;
exports.test = test;

var _assert2 = require("assert");

var _assert3 = _interopRequireDefault(_assert2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _marked = [generator].map(regeneratorRuntime.mark);

var TYPE_UNDEFINED = exports.TYPE_UNDEFINED = Symbol("undefined");
var TYPE_NULL = exports.TYPE_NULL = Symbol("null");
var TYPE_BOOLEAN = exports.TYPE_BOOLEAN = Symbol("boolean");
var TYPE_NUMBER = exports.TYPE_NUMBER = Symbol("number");
var TYPE_NUMBER_NAN = exports.TYPE_NUMBER_NAN = Symbol("NaN");
var TYPE_NUMBER_POS = exports.TYPE_NUMBER_POS = Symbol("number: n>=0");
var TYPE_NUMBER_NEG = exports.TYPE_NUMBER_NEG = Symbol("number: n<=0");
var TYPE_NUMBER_INT = exports.TYPE_NUMBER_INT = Symbol("number: n%1==0");
var TYPE_NUMBER_INT_POS = exports.TYPE_NUMBER_INT_POS = Symbol("number: n%1==0&&n>=0");
var TYPE_NUMBER_INT_NEG = exports.TYPE_NUMBER_INT_NEG = Symbol("number: n%1==0&&n<=0");
var TYPE_NUMBER_INT_POS_8 = exports.TYPE_NUMBER_INT_POS_8 = Symbol("number: n%1==0%%n>=0&&n<(1<<7)");
var TYPE_NUMBER_INT_POS_16 = exports.TYPE_NUMBER_INT_POS_16 = Symbol("number: n%1==0&&n>=0&&n<(1<<15)");
var TYPE_NUMBER_INT_POS_24 = exports.TYPE_NUMBER_INT_POS_24 = Symbol("number: n%1==0&&n>=0&&n<(1<<23)");
var TYPE_NUMBER_INT_POS_32 = exports.TYPE_NUMBER_INT_POS_32 = Symbol("number: n%1==0&&n>=0&&n<(1<<31)");
var TYPE_NUMBER_INT_POS_MAX = exports.TYPE_NUMBER_INT_POS_MAX = Symbol("number: n%1==0&&n>=0");
var TYPE_STRING = exports.TYPE_STRING = Symbol("string");
var TYPE_STRING_EMPTY = exports.TYPE_STRING_EMPTY = Symbol("string: ^$");
var TYPE_STRING_CHAR = exports.TYPE_STRING_CHAR = Symbol("string: ^.$");
var TYPE_STRING_NONEMPTY = exports.TYPE_STRING_NONEMPTY = Symbol("string: ^.+$");
var TYPE_SYMBOL = exports.TYPE_SYMBOL = Symbol("symbol");
var TYPE_REGEXP = exports.TYPE_REGEXP = Symbol("regexp");
var TYPE_OBJ = exports.TYPE_OBJ = Symbol("object");
var TYPE_OBJ_FN = exports.TYPE_OBJ_FN = Symbol("function");
var TYPE_OBJ_ARR = exports.TYPE_OBJ_ARR = Symbol("object: array");
var TYPE_OBJ_ERR = exports.TYPE_OBJ_ERR = Symbol("object: error");
var TYPE_OBJ_ITERATOR = exports.TYPE_OBJ_ITERATOR = Symbol("object: #next()");
var TYPE_OBJ_GENERATOR = exports.TYPE_OBJ_GENERATOR = Symbol("function*");

var FLAG_TYPE_NONE = 0x80000;
var FLAG_TYPE_UNDEFINED = 0x01;
var FLAG_TYPE_NULL = 0x02;
var FLAG_TYPE_BOOLEAN = 0x04;
var FLAG_TYPE_NUMBER = 0x08;
var FLAG_TYPE_STRING = 0x10;
var FLAG_TYPE_SYMBOL = 0x20;
var FLAG_TYPE_REGEXP = 0x40;
var FLAG_TYPE_OBJ = 0x80;

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
var FLAG_OBJ_FN = 0x04000;
var FLAG_OBJ_ARR = 0x08000;
var FLAG_OBJ_ERR = 0x10000;
var FLAG_OBJ_IT = 0x20000;
var FLAG_OBJ_GEN = 0x40000;

var map = new Map([[TYPE_UNDEFINED, FLAG_TYPE_UNDEFINED], [TYPE_NULL, FLAG_TYPE_NULL], [TYPE_BOOLEAN, FLAG_TYPE_BOOLEAN], [TYPE_NUMBER, FLAG_TYPE_NUMBER], [TYPE_NUMBER_NAN, FLAG_TYPE_NUMBER | FLAG_NUM_NAN], [TYPE_NUMBER_POS, FLAG_TYPE_NUMBER | FLAG_NUM_POS], [TYPE_NUMBER_NEG, FLAG_TYPE_NUMBER | FLAG_NUM_NEG], [TYPE_NUMBER_INT, FLAG_TYPE_NUMBER | FLAG_NUM_INT], [TYPE_NUMBER_INT_POS, FLAG_TYPE_NUMBER | FLAG_NUM_INT | FLAG_NUM_POS], [TYPE_NUMBER_INT_NEG, FLAG_TYPE_NUMBER | FLAG_NUM_INT | FLAG_NUM_NEG], [TYPE_NUMBER_INT_POS_8, FLAG_TYPE_NUMBER | FLAG_NUM_INT | FLAG_NUM_POS | FLAG_NUM_8 | FLAG_NUM_16 | FLAG_NUM_24 | FLAG_NUM_32 | FLAG_NUM_MAX], [TYPE_NUMBER_INT_POS_16, FLAG_TYPE_NUMBER | FLAG_NUM_INT | FLAG_NUM_POS | FLAG_NUM_16 | FLAG_NUM_24 | FLAG_NUM_32 | FLAG_NUM_MAX], [TYPE_NUMBER_INT_POS_24, FLAG_TYPE_NUMBER | FLAG_NUM_INT | FLAG_NUM_POS | FLAG_NUM_24 | FLAG_NUM_32 | FLAG_NUM_MAX], [TYPE_NUMBER_INT_POS_32, FLAG_TYPE_NUMBER | FLAG_NUM_INT | FLAG_NUM_POS | FLAG_NUM_32 | FLAG_NUM_MAX], [TYPE_NUMBER_INT_POS_MAX, FLAG_TYPE_NUMBER | FLAG_NUM_INT | FLAG_NUM_POS | FLAG_NUM_MAX], [TYPE_STRING, FLAG_TYPE_STRING], [TYPE_STRING_EMPTY, FLAG_TYPE_STRING | FLAG_STR_EMPTY], [TYPE_STRING_CHAR, FLAG_TYPE_STRING | FLAG_STR_CHARACTER | FLAG_STR_NONEMPTY], [TYPE_STRING_NONEMPTY, FLAG_TYPE_STRING | FLAG_STR_NONEMPTY], [TYPE_SYMBOL, FLAG_TYPE_SYMBOL], [TYPE_REGEXP, FLAG_TYPE_REGEXP], [TYPE_OBJ, FLAG_TYPE_OBJ], [TYPE_OBJ_FN, FLAG_TYPE_OBJ | FLAG_OBJ_FN], [TYPE_OBJ_ARR, FLAG_TYPE_OBJ | FLAG_OBJ_ARR], [TYPE_OBJ_ERR, FLAG_TYPE_OBJ | FLAG_OBJ_ERR], [TYPE_OBJ_ITERATOR, FLAG_TYPE_OBJ | FLAG_OBJ_IT], [TYPE_OBJ_GENERATOR, FLAG_TYPE_OBJ | FLAG_OBJ_GEN]]);

var TYPES = Object.freeze([TYPE_UNDEFINED, TYPE_NULL, TYPE_BOOLEAN, TYPE_NUMBER, TYPE_NUMBER_NAN, TYPE_NUMBER_POS, TYPE_NUMBER_NEG, TYPE_NUMBER_INT, TYPE_NUMBER_INT_POS, TYPE_NUMBER_INT_NEG, TYPE_NUMBER_INT_POS_8, TYPE_NUMBER_INT_POS_16, TYPE_NUMBER_INT_POS_24, TYPE_NUMBER_INT_POS_32, TYPE_NUMBER_INT_POS_MAX, TYPE_STRING, TYPE_STRING_EMPTY, TYPE_STRING_CHAR, TYPE_STRING_NONEMPTY, TYPE_SYMBOL, TYPE_REGEXP, TYPE_OBJ, TYPE_OBJ_FN, TYPE_OBJ_ARR, TYPE_OBJ_ERR, TYPE_OBJ_ITERATOR, TYPE_OBJ_GENERATOR]);

var nextSymbol = 0;

function _isType(type) {
	return TYPES.indexOf(type) !== -1;
}

function _isDefaultType(type) {
	return !_isType(type) || [TYPE_BOOLEAN, TYPE_NUMBER, TYPE_NUMBER_POS, TYPE_NUMBER_NEG, TYPE_NUMBER_INT, TYPE_NUMBER_INT_POS, TYPE_NUMBER_INT_NEG, TYPE_NUMBER_INT_POS_8, TYPE_NUMBER_INT_POS_16, TYPE_NUMBER_INT_POS_24, TYPE_NUMBER_INT_POS_32, TYPE_NUMBER_INT_POS_MAX, TYPE_STRING, TYPE_STRING_EMPTY, TYPE_STRING_NONEMPTY, TYPE_SYMBOL, TYPE_REGEXP, TYPE_OBJ, TYPE_OBJ_FN, TYPE_OBJ_ARR, TYPE_OBJ_ERR].indexOf(type) !== -1;
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
	return _isType(item) ? map.get(item) : FLAG_TYPE_NONE;
}

function _getFilteredTypes(list) {
	var types = TYPES.slice(0);

	var filter = [TYPE_NUMBER, TYPE_NUMBER_INT, TYPE_NUMBER_INT_POS, TYPE_STRING];

	list.forEach(function (item, index, source) {
		if (!_isType(item)) types.push(item);
	});

	return types.filter(function (item, index, source) {
		return filter.indexOf(item) === -1;
	});
}

function _getDefaultArguments(args) {
	return args.map(function (item, index, source) {
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = item[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var type = _step.value;

				if (_isDefaultType(type)) return _getArgument(type);
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		throw new TypeError();
	});
}

function _getNumber(positive, integer, min, max) {
	var range = Math.max(max - min, 0);

	var n = Math.abs(Math.random() * range) * (positive ? 1 : -1);

	return integer ? Math.trunc(n) : n;
}

function _isValidArgument(list, flags) {
	if (flags === FLAG_TYPE_NONE) return true;

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
		case TYPE_NUMBER_NAN:
			return NaN;
		case TYPE_NUMBER_POS:
			return _getNumber(true, false, 0, Number.MAX_VALUE);
		case TYPE_NUMBER_NEG:
			return _getNumber(false, false, -Number.MAX_VALUE, 0);
		case TYPE_NUMBER_INT_NEG:
			return _getNumber(false, true, 0, Number.MAX_SAFE_INTEGER);
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
		case TYPE_REGEXP:
			return (/^$/
			);
		case TYPE_OBJ:
			return {};
		case TYPE_OBJ_FN:
			return function () {
				return null;
			};
		case TYPE_OBJ_ARR:
			return [];
		case TYPE_OBJ_ERR:
			return new Error();
		case TYPE_OBJ_ITERATOR:
			return {}; //IMPLEMENT
		case TYPE_OBJ_GENERATOR:
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
			});
		default:
			return type;
	}
}

function generator() {
	for (var _len = arguments.length, validTypes = Array(_len), _key = 0; _key < _len; _key++) {
		validTypes[_key] = arguments[_key];
	}

	var defaultArgs, i, args, list, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, type, flags, value;

	return regeneratorRuntime.wrap(function generator$(_context2) {
		while (1) {
			switch (_context2.prev = _context2.next) {
				case 0:
					if (_isValid(validTypes)) {
						_context2.next = 2;
						break;
					}

					throw new TypeError();

				case 2:
					defaultArgs = _getDefaultArguments(validTypes);
					i = validTypes.length - 1;

				case 4:
					if (!(i > -1)) {
						_context2.next = 38;
						break;
					}

					args = defaultArgs.slice(0);
					list = validTypes[i];
					_iteratorNormalCompletion2 = true;
					_didIteratorError2 = false;
					_iteratorError2 = undefined;
					_context2.prev = 10;
					_iterator2 = _getFilteredTypes(list)[Symbol.iterator]();

				case 12:
					if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
						_context2.next = 21;
						break;
					}

					type = _step2.value;
					flags = _getFlags(type), value = _getArgument(type);


					args.splice(i, 1, value);

					_context2.next = 18;
					return {
						valid: _isValidArgument(list, flags),
						items: args.slice(0)
					};

				case 18:
					_iteratorNormalCompletion2 = true;
					_context2.next = 12;
					break;

				case 21:
					_context2.next = 27;
					break;

				case 23:
					_context2.prev = 23;
					_context2.t0 = _context2["catch"](10);
					_didIteratorError2 = true;
					_iteratorError2 = _context2.t0;

				case 27:
					_context2.prev = 27;
					_context2.prev = 28;

					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}

				case 30:
					_context2.prev = 30;

					if (!_didIteratorError2) {
						_context2.next = 33;
						break;
					}

					throw _iteratorError2;

				case 33:
					return _context2.finish(30);

				case 34:
					return _context2.finish(27);

				case 35:
					i -= 1;
					_context2.next = 4;
					break;

				case 38:
				case "end":
					return _context2.stop();
			}
		}
	}, _marked[0], this, [[10, 23, 27, 35], [28,, 30, 34]]);
}

function test() {
	for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
		args[_key2] = arguments[_key2];
	}

	var fn = args.pop();

	if (typeof fn !== 'function') throw new TypeError();

	var _iteratorNormalCompletion3 = true;
	var _didIteratorError3 = false;
	var _iteratorError3 = undefined;

	try {
		var _loop = function _loop() {
			var arg = _step3.value;

			if (arg.valid) _assert3.default.doesNotThrow(function () {
				return fn.apply(undefined, _toConsumableArray(arg.items));
			});else _assert3.default.throws(function () {
				return fn.apply(undefined, _toConsumableArray(arg.items));
			});
		};

		for (var _iterator3 = generator.apply(undefined, args)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
			_loop();
		}
	} catch (err) {
		_didIteratorError3 = true;
		_iteratorError3 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion3 && _iterator3.return) {
				_iterator3.return();
			}
		} finally {
			if (_didIteratorError3) {
				throw _iteratorError3;
			}
		}
	}
}