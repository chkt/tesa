import assert from 'assert';

import { describe, it } from 'mocha';
import use, * as u from '../source/argumentGenerator';



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
