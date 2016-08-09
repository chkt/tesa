'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set = set;
exports.get = get;
exports.reset = reset;

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var assertions = {
  return: _defaultReturnAssertion,
  throw: _defaultThrowAssertion
};

/**
 * The default return assertion
 * @private
 * @param {Function} fn - The test function
 * @param {Array} args - The test arguments
 */
function _defaultReturnAssertion(fn, args) {
  _assert2.default.doesNotThrow(function () {
    return fn.apply(undefined, _toConsumableArray(args));
  });
}

/**
 * The default throws assertion
 * @private
 * @param {Function} fn - The test function
 * @param {Array} args - The test arguments
 */
function _defaultThrowAssertion(fn, args) {
  _assert2.default.throws(function () {
    return fn.apply(undefined, _toConsumableArray(args));
  });
}

/**
 * Sets the throws and return assertion
 * @param {Function} returnAssertion
 * @param {Function} throwAssertion
 * @throws {TypeError} if returnAssertion is not a function
 * @throws {TypeError} if throwAssertion is not a function
 */
function set(returnAssertion, throwAssertion) {
  if (typeof throwAssertion !== 'function' || typeof returnAssertion !== 'function') throw new TypeError();

  assertions.throw = throwAssertion;
  assertions.return = returnAssertion;
}

/**
 * Returns the throws and return assertion
 * @returns {Object}
 */
function get() {
  return {
    return: assertions.return,
    throw: assertions.throw
  };
}

/**
 * Resets the throw and return assertions
 */
function reset() {
  assertions.return = _defaultReturnAssertion;
  assertions.throw = _defaultThrowAssertion;
}