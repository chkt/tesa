import assert from 'assert';

import { describe, it } from 'mocha';

import use, * as u from '../source/argumentGenerator';
import * as assertions from '../source/assertions';



describe("u", () => {
	it("should contain all TYPE_* constants", () => {
		assert.strictEqual(typeof u.TYPE_UNDEFINED, 'symbol');
		assert.strictEqual(typeof u.TYPE_NULL, 'symbol');

		assert.strictEqual(typeof u.TYPE_BOOLEAN, 'symbol');

		assert.strictEqual(typeof u.TYPE_NUMBER, 'symbol');
		assert.strictEqual(typeof u.TYPE_NUMBER_NAN, 'symbol');
		assert.strictEqual(typeof u.TYPE_NUMBER_POS, 'symbol');
		assert.strictEqual(typeof u.TYPE_NUMBER_NEG, 'symbol');
		assert.strictEqual(typeof u.TYPE_NUMBER_INT, 'symbol');
		assert.strictEqual(typeof u.TYPE_NUMBER_INT_POS, 'symbol');
		assert.strictEqual(typeof u.TYPE_NUMBER_INT_POS_8, 'symbol');
		assert.strictEqual(typeof u.TYPE_NUMBER_INT_POS_16, 'symbol');
		assert.strictEqual(typeof u.TYPE_NUMBER_INT_POS_24, 'symbol');
		assert.strictEqual(typeof u.TYPE_NUMBER_INT_POS_32, 'symbol');
		assert.strictEqual(typeof u.TYPE_NUMBER_INT_POS_MAX, 'symbol');
		assert.strictEqual(typeof u.TYPE_NUMBER_INT_NEG, 'symbol');

		assert.strictEqual(typeof u.TYPE_STRING, 'symbol');
		assert.strictEqual(typeof u.TYPE_STRING_EMPTY, 'symbol');
		assert.strictEqual(typeof u.TYPE_STRING_CHAR, 'symbol');
		assert.strictEqual(typeof u.TYPE_STRING_NONEMPTY, 'symbol');

		assert.strictEqual(typeof u.TYPE_SYMBOL, 'symbol');

		assert.strictEqual(typeof u.TYPE_REGEXP, 'symbol');

		assert.strictEqual(typeof u.TYPE_OBJECT, 'symbol');
		assert.strictEqual(typeof u.TYPE_OBJECT_ITERATOR, 'symbol');
		assert.strictEqual(typeof u.TYPE_OBJECT_ERROR, 'symbol');

		assert.strictEqual(typeof u.TYPE_ARRAY, 'symbol');

		assert.strictEqual(typeof u.TYPE_FUNCTION, 'symbol');
		assert.strictEqual(typeof u.TYPE_FUNCTION_GENERATOR, 'symbol');
	});
});


describe("use", () => {
	it("should require its last argument to be a function", () => {
		const arg = [ null ];
		const fn = (fn, args) => null;

		assertions.set(fn, fn);

		assert.throws(() => use(), TypeError);
		assert.throws(() => use(null), TypeError);
		assert.throws(() => use(true), TypeError);
		assert.throws(() => use(1), TypeError);
		assert.throws(() => use("1"), TypeError);
		assert.throws(() => use(Symbol("1")), TypeError);
		assert.throws(() => use(/^1$/), TypeError);
		assert.throws(() => use({ "1" : 1 }), TypeError);
		assert.throws(() => use([ 1 ]), TypeError);
		assert.doesNotThrow(() => use(() => 1));
		assert.throws(() => use(arg, null), TypeError);
		assert.throws(() => use(arg, true), TypeError);
		assert.throws(() => use(arg, 1), TypeError);
		assert.throws(() => use(arg, "1"), TypeError);
		assert.throws(() => use(arg, Symbol("1")), TypeError);
		assert.throws(() => use(arg, /^1$/), TypeError);
		assert.throws(() => use(arg, { "1" : 1 }), TypeError);
		assert.throws(() => use(arg, [ 1 ]), TypeError);
		assert.doesNotThrow(() => use(arg, () => 1));
	});

	it("should require all additional arguments to be nonempty arrays", () => {
		const assertfn = (fn, args) => null;
		const testfn = () => 1;

		assertions.set(assertfn, assertfn);

		assert.throws(() => use(undefined, testfn), TypeError);
		assert.throws(() => use(null, testfn), TypeError);
		assert.throws(() => use(true, testfn), TypeError);
		assert.throws(() => use(1, testfn), TypeError);
		assert.throws(() => use("1", testfn), TypeError);
		assert.throws(() => use(/^1$/, testfn), TypeError);
		assert.throws(() => use(Symbol("1"), testfn), TypeError);
		assert.throws(() => use(() => 1, testfn), TypeError);
		assert.throws(() => use({ "1" : 1 }, testfn), TypeError);
		assert.throws(() => use([], testfn), TypeError);
		assert.doesNotThrow(() => use([ null], testfn));
		assert.throws(() => use([ null ], undefined, testfn), TypeError);
		assert.throws(() => use([ null ], null, testfn), TypeError);
		assert.throws(() => use([ null ], true, testfn), TypeError);
		assert.throws(() => use([ null ], 1, testfn), TypeError);
		assert.throws(() => use([ null ], "1", testfn), TypeError);
		assert.throws(() => use([ null ], /^1$/, testfn), TypeError);
		assert.throws(() => use([ null ], Symbol("1"), testfn), TypeError);
		assert.throws(() => use([ null ], () => 1, testfn), TypeError);
		assert.throws(() => use([ null ], { "1" : 1 }, testfn), TypeError);
		assert.throws(() => use([ null ], [], testfn), TypeError);
		assert.doesNotThrow(() => use([ null ], [ null], testfn));
	});
});
