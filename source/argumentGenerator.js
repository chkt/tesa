import * as assertions from './assertions';



export const TYPE_UNDEFINED = Symbol("undefined");
export const TYPE_NULL = Symbol("null");

export const TYPE_BOOLEAN = Symbol("boolean");

export const TYPE_NUMBER = Symbol("number");
export const TYPE_NUMBER_NAN = Symbol("NaN");
export const TYPE_NUMBER_POS = Symbol("number: n>=0");
export const TYPE_NUMBER_NEG = Symbol("number: n<=0");
export const TYPE_NUMBER_INT = Symbol("number: n%1==0");
export const TYPE_NUMBER_INT_POS = Symbol("number: n%1==0&&n>=0");
export const TYPE_NUMBER_INT_POS_8 = Symbol("number: n%1==0%%n>=0&&n<(1<<7)");
export const TYPE_NUMBER_INT_POS_16 = Symbol("number: n%1==0&&n>=0&&n<(1<<15)");
export const TYPE_NUMBER_INT_POS_24 = Symbol("number: n%1==0&&n>=0&&n<(1<<23)");
export const TYPE_NUMBER_INT_POS_32 = Symbol("number: n%1==0&&n>=0&&n<(1<<31)");
export const TYPE_NUMBER_INT_POS_MAX = Symbol("number: n%1==0&&n>=0");
export const TYPE_NUMBER_INT_NEG = Symbol("number: n%1==0&&n<=0");

export const TYPE_STRING = Symbol("string");
export const TYPE_STRING_EMPTY = Symbol("string: ^$");
export const TYPE_STRING_CHAR = Symbol("string: ^.$");
export const TYPE_STRING_NONEMPTY = Symbol("string: ^.+$");

export const TYPE_SYMBOL = Symbol("symbol");

export const TYPE_OBJECT = Symbol("object");
export const TYPE_OBJECT_LITERAL = Symbol("object: {}");
export const TYPE_OBJECT_REGEXP = Symbol("object: RegExp");
export const TYPE_OBJECT_ITERATOR = Symbol("object: #next()");
export const TYPE_OBJECT_ERROR = Symbol("object: Error");

export const TYPE_ARRAY = Symbol("object: array");

export const TYPE_FUNCTION = Symbol("function");
export const TYPE_FUNCTION_GENERATOR = Symbol("function*");

export const TYPE_SPEC = Symbol("client");


const FLAG_TYPE_VALID = 0x80000;

const FLAG_TYPE_UNDEFINED = 0x01;
const FLAG_TYPE_NULL = 0x02;
const FLAG_TYPE_BOOLEAN = 0x04;
const FLAG_TYPE_NUMBER = 0x08;
const FLAG_TYPE_STRING = 0x10;
const FLAG_TYPE_SYMBOL = 0x20;
const FLAG_TYPE_OBJ = 0x80;
const FLAG_TYPE_FUNCTION = 0x4000;

const FLAG_NUM_NAN = 0x00100;
const FLAG_NUM_INT = 0x00200;
const FLAG_NUM_POS = 0x00400;
const FLAG_NUM_NEG = 0x200000;
const FLAG_NUM_8 = 0x1000000;
const FLAG_NUM_16 = 0x2000000;
const FLAG_NUM_24 = 0x100000;
const FLAG_NUM_32 = 0x400000;
const FLAG_NUM_MAX = 0x800000;
const FLAG_STR_EMPTY = 0x00800;
const FLAG_STR_CHARACTER = 0x01000;
const FLAG_STR_NONEMPTY = 0x02000;
const FLAG_OBJ_LITERAL = 0x4000000;
const FLAG_OBJ_REGEXP = 0x40;
const FLAG_OBJ_ARR = 0x08000;
const FLAG_OBJ_ERR = 0x10000;
const FLAG_OBJ_IT = 0x20000;
const FLAG_FN_GEN = 0x40000;


const map = new Map([
	[ TYPE_UNDEFINED, FLAG_TYPE_UNDEFINED ],
	[ TYPE_NULL, FLAG_TYPE_NULL ],
	[ TYPE_BOOLEAN, FLAG_TYPE_BOOLEAN ],
	[ TYPE_NUMBER, FLAG_TYPE_NUMBER ],
	[ TYPE_NUMBER_NAN, FLAG_TYPE_NUMBER | FLAG_NUM_NAN ],
	[ TYPE_NUMBER_POS, FLAG_TYPE_NUMBER | FLAG_NUM_POS ],
	[ TYPE_NUMBER_NEG, FLAG_TYPE_NUMBER | FLAG_NUM_NEG ],
	[ TYPE_NUMBER_INT, FLAG_TYPE_NUMBER | FLAG_NUM_INT ],
	[ TYPE_NUMBER_INT_POS, FLAG_TYPE_NUMBER | FLAG_NUM_INT | FLAG_NUM_POS ],
	[ TYPE_NUMBER_INT_NEG, FLAG_TYPE_NUMBER | FLAG_NUM_INT | FLAG_NUM_NEG ],
	[ TYPE_NUMBER_INT_POS_8, FLAG_TYPE_NUMBER | FLAG_NUM_INT | FLAG_NUM_POS | FLAG_NUM_8 | FLAG_NUM_16 | FLAG_NUM_24 | FLAG_NUM_32 | FLAG_NUM_MAX ],
	[ TYPE_NUMBER_INT_POS_16, FLAG_TYPE_NUMBER | FLAG_NUM_INT | FLAG_NUM_POS | FLAG_NUM_16 | FLAG_NUM_24 | FLAG_NUM_32 | FLAG_NUM_MAX ],
	[ TYPE_NUMBER_INT_POS_24, FLAG_TYPE_NUMBER | FLAG_NUM_INT | FLAG_NUM_POS | FLAG_NUM_24 | FLAG_NUM_32 | FLAG_NUM_MAX ],
	[ TYPE_NUMBER_INT_POS_32, FLAG_TYPE_NUMBER | FLAG_NUM_INT | FLAG_NUM_POS | FLAG_NUM_32 | FLAG_NUM_MAX ],
	[ TYPE_NUMBER_INT_POS_MAX, FLAG_TYPE_NUMBER | FLAG_NUM_INT | FLAG_NUM_POS | FLAG_NUM_MAX ],
	[ TYPE_STRING, FLAG_TYPE_STRING ],
	[ TYPE_STRING_EMPTY, FLAG_TYPE_STRING | FLAG_STR_EMPTY ],
	[ TYPE_STRING_CHAR, FLAG_TYPE_STRING | FLAG_STR_CHARACTER | FLAG_STR_NONEMPTY ],
	[ TYPE_STRING_NONEMPTY, FLAG_TYPE_STRING | FLAG_STR_NONEMPTY ],
	[ TYPE_SYMBOL, FLAG_TYPE_SYMBOL ],
	[ TYPE_OBJECT, FLAG_TYPE_OBJ ],
	[ TYPE_OBJECT_LITERAL, FLAG_TYPE_OBJ | FLAG_OBJ_LITERAL ],
	[ TYPE_OBJECT_REGEXP, FLAG_TYPE_OBJ | FLAG_OBJ_REGEXP ],
	[ TYPE_OBJECT_ERROR, FLAG_TYPE_OBJ | FLAG_OBJ_ERR ],
	[ TYPE_OBJECT_ITERATOR, FLAG_TYPE_OBJ | FLAG_OBJ_IT ],
	[ TYPE_ARRAY, FLAG_TYPE_OBJ | FLAG_OBJ_ARR | FLAG_OBJ_IT ],
	[ TYPE_FUNCTION, FLAG_TYPE_FUNCTION ],
	[ TYPE_FUNCTION_GENERATOR, FLAG_TYPE_FUNCTION | FLAG_FN_GEN ]
]);


const TYPES = Object.freeze([
	TYPE_UNDEFINED,
	TYPE_NULL,
	TYPE_BOOLEAN,
	TYPE_NUMBER,
	TYPE_NUMBER_NAN,
	TYPE_NUMBER_POS,
	TYPE_NUMBER_NEG,
	TYPE_NUMBER_INT,
	TYPE_NUMBER_INT_POS,
	TYPE_NUMBER_INT_NEG,
	TYPE_NUMBER_INT_POS_8,
	TYPE_NUMBER_INT_POS_16,
	TYPE_NUMBER_INT_POS_24,
	TYPE_NUMBER_INT_POS_32,
	TYPE_NUMBER_INT_POS_MAX,
	TYPE_STRING,
	TYPE_STRING_EMPTY,
	TYPE_STRING_CHAR,
	TYPE_STRING_NONEMPTY,
	TYPE_SYMBOL,
	TYPE_OBJECT,
	TYPE_OBJECT_LITERAL,
	TYPE_OBJECT_REGEXP,
	TYPE_OBJECT_ERROR,
	TYPE_OBJECT_ITERATOR,
	TYPE_ARRAY,
	TYPE_FUNCTION,
	TYPE_FUNCTION_GENERATOR
]);



let nextSymbol = 0;

const clientSymbol = [];
const clientValue = [];



function _buildDescriptor(props) {
	const res = {};

	for (let prop in props) res[prop] = {
		value : props[prop],
		writable : true,
		enumerable : true
	};

	return res;
}



function _isType(type) {
	return TYPES.indexOf(type) !== -1;
}


function _isSpec(arg) {
	return typeof arg === 'object' && arg !== null && TYPE_SPEC in arg;
}

function _buildSpec(item, validTypes) {
	const type = _isType(item) ? item : _getClientType(item);
	const flags = _getFlags(item);
	const valid = _isValidArgument(validTypes, flags);

	return {
		[ TYPE_SPEC ] : true,
		type : type,
		valid : valid,
		value : _getArgument(type)
	};
}

function _extendSpec(item) {
	if (!('value' in item)) throw new Error();

	const desc  = _buildDescriptor({
		type : _getClientType(item.value),
		valid : 'valid' in item ? item.valid : true
	});

	return Object.create(item, desc);
}


function _getClientType(item) {
	let index = clientValue.indexOf(item);

	if (index === -1) {
		index = clientSymbol.length;

		clientSymbol.push(Symbol(`client#${ index }`));
		clientValue.push(item);
	}

	return clientSymbol[index];
}

function _getClientValue(symbol) {
	const index = clientSymbol.indexOf(symbol);

	if (index === -1) throw new Error();

	return clientValue[index];
}

function _clearClientCache() {
	clientValue.splice(0, clientValue.length);
	clientSymbol.splice(0, clientSymbol.length);
}


function _isValid(args) {
	try {
		args.forEach((item, index, source) => {
			if (!Array.isArray(item)) throw new TypeError();
		});
	}
	catch (err) {
		return false;
	}

	return true;
}

function _getFlags(item) {
	return _isType(item) ? map.get(item) : FLAG_TYPE_VALID;
}


function _getFilteredSpecs(list) {
	const types = TYPES.slice(0);

	const filter = [
		TYPE_NUMBER,
		TYPE_NUMBER_INT,
		TYPE_NUMBER_INT_POS,
		TYPE_STRING,
		TYPE_OBJECT
	];

	list.forEach((item, index, source) => {
		if (!_isType(item)) types.push(item);
	});

	return types
		.filter((item, index, source) => filter.indexOf(item) === -1)
		.map((item, index, source) => _isSpec(item) ? _extendSpec(item) : _buildSpec(item, list));
}

function _getDefaultSpecs(args) {
	return args.map((item, index, source) => {
		if (item.length === 0) return _buildSpec(TYPE_UNDEFINED, []);

		const first = item[0];

		return Object.create(_isSpec(first) ? _extendSpec(first) : _buildSpec(first, item));
	});
}


function _getNumber(positive, integer, min, max) {
	const range = Math.max(max - min, 0);

	let n = Math.abs(Math.random() * range) * (positive ? 1 : -1);

	return integer ? Math.trunc(n) : n;
}


function _isValidArgument(list, flags) {
	if (flags === FLAG_TYPE_VALID) return true;

	return list.some((item, index, source) => {
		const itemFlags = _getFlags(item);

		return (itemFlags & flags) === itemFlags;
	});
}


function _getArgument(type) {
	switch (type) {
		case TYPE_UNDEFINED : return undefined;
		case TYPE_NULL : return null;
		case TYPE_BOOLEAN : return Boolean(Math.random());
		case TYPE_NUMBER : return _getNumber(true, false, 0, Number.MAX_VALUE);
		case TYPE_NUMBER_NAN : return NaN;
		case TYPE_NUMBER_POS : return _getNumber(true, false, 0, Number.MAX_VALUE);
		case TYPE_NUMBER_NEG : return _getNumber(false, false, -Number.MAX_VALUE, 0);
		case TYPE_NUMBER_INT : return _getNumber(true, true, 0, Number.MAX_SAFE_INTEGER);
		case TYPE_NUMBER_INT_NEG : return _getNumber(false, true, 0, Number.MAX_SAFE_INTEGER);
		case TYPE_NUMBER_INT_POS : return _getNumber(true, true, 0, Number.MAX_SAFE_INTEGER);
		case TYPE_NUMBER_INT_POS_8 : return _getNumber(true, true, 0, 0xff);
		case TYPE_NUMBER_INT_POS_16 : return _getNumber(true, true, 0x0100, 0xffff);
		case TYPE_NUMBER_INT_POS_24 : return _getNumber(true, true, 0x010000, 0xffffff);
		case TYPE_NUMBER_INT_POS_32 : return _getNumber(true, true, 0x01000000, 0xffffffff);
		case TYPE_NUMBER_INT_POS_MAX : return _getNumber(true, true, 0x100000000, Number.MAX_SAFE_INTEGER);
		case TYPE_STRING : return 'abc';
		case TYPE_STRING_EMPTY : return '';
		case TYPE_STRING_CHAR : return 'a';
		case TYPE_STRING_NONEMPTY : return 'abc';
		case TYPE_SYMBOL : return Symbol(`Symbol#${ ++nextSymbol }`);
		case TYPE_OBJECT :
		case TYPE_OBJECT_LITERAL : return {};
		case TYPE_OBJECT_REGEXP : return /^$/;
		case TYPE_OBJECT_ERROR : return new Error();
		case TYPE_OBJECT_ITERATOR : return (function*() {})();
		case TYPE_ARRAY : return [];
		case TYPE_FUNCTION : return () => null;
		case TYPE_FUNCTION_GENERATOR : return function* () {};
		default : return _getClientValue(type);
	}
}


function* generator(...validTypes) {
	if (!_isValid(validTypes)) throw new TypeError();

	_clearClientCache();

	const defaults = _getDefaultSpecs(validTypes);
	const defValid = defaults.every((item, index, source) => item.valid);

	for (let i = validTypes.length - 1; i > -1; i -= 1) {
		const specs = defaults.slice(0);
		const list = validTypes[i];

		for (let spec of _getFilteredSpecs(list)) {
			specs.splice(i, 1, spec);

			yield {
				valid : defValid && spec.valid,
				specs,
				values : specs.map((item, index, source) => item.value)
			};
		}
	}
}


let _spec = null;


/**
 * Creates a list of arguments and tests against the last argument
 * @param {...*} args
 * @throws {TypeError} if the last argument is not a function
 */
export default function use(...args) {
	const fn = args.pop();

	if (typeof fn !== 'function') throw new TypeError();

	const assert = assertions.get();

	for (let spec of generator(...args)) {
		_spec = spec;

		const args = spec.values.slice(0);

		if (spec.valid) assert.return(fn, args);
		else assert.throw(fn, args);
	}

	_spec = null;
}


/**
 * Registers obj for use as a spec object
 * @param {Object} obj - The source object
 * @returns {Object}
 * @throws {TypeError} if obj is not an object
 */
export function registerSpec(obj) {
	if (obj.constructor !== Object) throw new TypeError();

	return Object.assign(obj, {
		[ TYPE_SPEC ] : true
	});
}


/**
 * Returns the specification of the current assertion call or null
 * @returns {Object|null}
 */
export function getCallSpec() {
	return _spec;
}


export const setAssertions = assertions.set;
