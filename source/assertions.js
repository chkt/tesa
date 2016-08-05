import assert from 'assert';



const assertions = {
	return : _defaultReturnAssertion,
	throw : _defaultThrowAssertion
};



/**
 * The default return assertion
 * @private
 * @param {Function} fn - The test function
 * @param {Array} args - The test arguments
 */
function _defaultReturnAssertion(fn, args) {
	assert.doesNotThrow(() => fn(...args));
}

/**
 * The default throws assertion
 * @private
 * @param {Function} fn - The test function
 * @param {Array} args - The test arguments
 */
function _defaultThrowAssertion(fn, args) {
	assert.throws(() => fn(...args));
}


/**
 * Sets the throws and return assertion
 * @param {Function} returnAssertion
 * @param {Function} throwAssertion
 * @throws {TypeError} if returnAssertion is not a function
 * @throws {TypeError} if throwAssertion is not a function
 */
export function set(returnAssertion, throwAssertion) {
	if (
		typeof throwAssertion !== 'function' ||
		typeof returnAssertion !== 'function'
	) throw new TypeError();

	assertions.throw = throwAssertion;
	assertions.return = returnAssertion;
}

/**
 * Returns the throws and return assertion
 * @returns {Object}
 */
export function get() {
	return {
		return : assertions.return,
		throw : assertions.throw
	};
}
