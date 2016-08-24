import assert from 'assert';

import { describe, it } from 'mocha';

import use, * as u from '../source/argumentGenerator';
import * as assertions from '../source/assertions';



function noop() {}


function testAssertType(type, ret, thr) {
	assertions.set(ret, thr);

	assert.doesNotThrow(() => use([ type ], noop));
}

function testAssertSpec(type) {
	assertions.set((fn, args) => {
		if (args[0] !== type.value) return;
		else if ('valid' in type && type.valid !== true) throw new Error();
	}, (fn, args) => {
		if (args[0] !== type.value) return;
		else if (!('valid' in type) || type.valid !== false) throw new Error();
	});

	assert.doesNotThrow(() => use([ u.registerSpec(type) ], noop));
}

function testUseTypes(...args) {
	const types = {};

	function afn(...args) {
		const spec = u.getCallSpec();

		for (let item of spec.specs) {
			const type = item.type;

			if (!(type in types)) types[type] = 1;
			else types[type] += 1;
		}
	}

	assertions.set(afn, afn);

	args.push(noop);

	use(...args);

	return types;
}



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

		assert.strictEqual(typeof u.TYPE_OBJECT, 'symbol');
		assert.strictEqual(typeof u.TYPE_OBJECT_LITERAL, 'symbol');
		assert.strictEqual(typeof u.TYPE_OBJECT_REGEXP, 'symbol');
		assert.strictEqual(typeof u.TYPE_OBJECT_ITERATOR, 'symbol');
		assert.strictEqual(typeof u.TYPE_OBJECT_ERROR, 'symbol');

		assert.strictEqual(typeof u.TYPE_ARRAY, 'symbol');

		assert.strictEqual(typeof u.TYPE_FUNCTION, 'symbol');
		assert.strictEqual(typeof u.TYPE_FUNCTION_GENERATOR, 'symbol');
	});

	describe("registerSpec", () => {
		it("should require an object as first argument");
		it("should return the original object");
	});

	describe("getCallSpec", () => {
		it("should return null outside of assertions", () => {
			assert.strictEqual(u.getCallSpec(), null);
		});
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

	it("should require all additional arguments to be arrays", () => {
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
		assert.doesNotThrow(() => use([], testfn), TypeError);
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
		assert.doesNotThrow(() => use([ null ], [], testfn), TypeError);
		assert.doesNotThrow(() => use([ null ], [ null], testfn));
	});

	it("should populate getCallSpec", () => {
		testAssertType(u.TYPE_UNDEFINED, (fn, args) => {
			const spec = u.getCallSpec();

			assert.strictEqual(typeof spec, 'object');
			assert.notStrictEqual(spec, null);
		}, (fn, args) => null);
	});

	it("should test all default argument types against each default argument", () => {
		let types = testUseTypes([]);
		let num = 0, used = 0;

		for (let id of Object.getOwnPropertySymbols(types)) num += 1, used += types[id];

		assert.strictEqual(num, used);

		types = testUseTypes([ u.TYPE_BOOLEAN ], [ u.TYPE_BOOLEAN ]);
		num = 0, used = 0;

		for (let id of Object.getOwnPropertySymbols(types)) num += 1, used += types[id];

		assert.strictEqual(used, num * 4);
	});

	it("should test injected arguments against each default argument and all injected arguments", () => {
		let types = testUseTypes([ "foo" ]);
		let num = 0, used = 0;

		for (let id of Object.getOwnPropertySymbols(types)) num += 1, used += types[id];

		assert.strictEqual(num, used);

		types = testUseTypes([ "bar" ], [ "baz" ]);
		num = 0, used = 0;

		for (let id of Object.getOwnPropertySymbols(types)) num += 1, used += types[id];

		assert.strictEqual(used, (num - 1) * 4);
	});

	it("should test spec object arguments against each default argument and all spec object arguments", () => {
		let types = testUseTypes([ u.registerSpec({ value : "foo" }) ]);
		let num = 0, used = 0;

		for (let id of Object.getOwnPropertySymbols(types)) num += 1, used += types[id];

		assert.strictEqual(num, used);

		types = testUseTypes([ u.registerSpec({ value : "bar" }) ], [ u.registerSpec({ value : "baz" }) ]);
		num = 0, used = 0;

		for (let id of Object.getOwnPropertySymbols(types)) num += 1, used += types[id];

		assert.strictEqual(used, (num - 1) * 4);
	});

	it("should only trigger the return assertion for boolean types if argument type is TYPE_BOOLEAN", () => {
		testAssertType(u.TYPE_BOOLEAN, (fn, args) => {
			if (typeof args[0] !== 'boolean') throw new Error();
		}, (fn, args) => {
			if (typeof args[0] === 'boolean') throw new Error();
		});
	});

	it("should only trigger the return assertion for number types if argument type is TYPE_NUMBER", () => {
		testAssertType(u.TYPE_NUMBER, (fn, args) => {
			if (typeof args[0] !== 'number') throw new Error();
		}, (fn, args) => {
			if (typeof args[0] === 'number') throw new Error();
		});
	});

	it("should only trigger the return assertion for positive numbers if argument type is TYPE_NUMBER_POS", () => {
		testAssertType(u.TYPE_NUMBER_POS, (fn, args) => {
			if (typeof args[0] !== 'number' || args[0] < 0) throw new Error();
		}, (fn, args) => {
			if (typeof args[0] === 'number' && args[0] >= 0) throw new Error();
		});
	});

	it("should only trigger the return assertion for negative numbers if argument type is TYPE_NUMBER_NEG", () => {
		testAssertType(u.TYPE_NUMBER_NEG, (fn, args) => {
			if (typeof args[0] !== 'number' || args[0] > 0) throw new Error();
		}, (fn, args) => {
			if (typeof args[0] === 'number' && args[0] <= 0) throw new Error();
		});
	});

	it("should only trigger the return assertion for integer numbers if argument type is TYPE_NUMBER_INT", () => {
		testAssertType(u.TYPE_NUMBER_INT, (fn, args) => {
			if (!Number.isSafeInteger(args[0])) throw new Error();
		}, (fn, args) => {
			if (Number.isSafeInteger(args[0])) throw new Error();
		});
	});

	it("should only trigger the return assertion for positive integer numbers if argument type is TYPE_NUMBER_INT_POS", () => {
		testAssertType(u.TYPE_NUMBER_INT_POS, (fn, args) => {
			if (!Number.isSafeInteger(args[0]) || args[0] < 0) throw new Error();
		}, (fn, args) => {
			if (Number.isSafeInteger(args[0]) && args[0] >= 0) throw new Error();
		});
	});

	it("should only trigger the return assertion for negative integer numbers if argument type is TYPE_NUMBER_INT_NEG", () => {
		testAssertType(u.TYPE_NUMBER_INT_NEG, (fn, args) => {
			if (!Number.isSafeInteger(args[0]) || args[0] > 0) throw new Error();
		}, (fn, args) => {
			if (Number.isSafeInteger(args[0]) && args[0] <= 0) throw new Error();
		});
	});

	it("should only trigger the return assertion for strings if argument type is TYPE_STRING", () => {
		testAssertType(u.TYPE_STRING, (fn, args) => {
			if (typeof args[0] !== 'string') throw new Error();
		}, (fn, args) => {
			if (typeof args[0] === 'string') throw new Error();
		});
	});

	it("should only trigger the return assertion for empty strings if argument type is TYPE_STRING_EMPTY", () => {
		testAssertType(u.TYPE_STRING_EMPTY, (fn, args) => {
			if (args[0] !== '') throw new Error();
		}, (fn, args) => {
			if (args[0] === '') throw new Error();
		});
	});

	it("should only trigger the return assertion for single character strings if argument type is TYPE_STRING_CHAR", () => {
		testAssertType(u.TYPE_STRING_CHAR, (fn, args) => {
			if (typeof args[0] !== 'string' || args[0].length !== 1) throw new Error();
		}, (fn, args) => {
			if (typeof args[0] === 'string' && args[0].length === 1) throw new Error();
		});
	});

	it("should only trigger the return assertion for nonempty strings if argument type is TYPE_STRING_NONEMPTY", () => {
		testAssertType(u.TYPE_STRING_NONEMPTY, (fn, args) => {
			if (typeof args[0] !== 'string' || args[0] === '') throw new Error();
		}, (fn, args) => {
			if (typeof args[0] === 'string' && args[0] !== '') throw new Error();
		});
	});

	it("should only trigger the return assertion for symbols if argument type is TYPE_SYMBOL", () => {
		testAssertType(u.TYPE_SYMBOL, (fn, args) => {
			if (typeof args[0] !== 'symbol') throw new Error();
		}, (fn, args) => {
			if (typeof args[0] === 'symbol') throw new Error();
		});
	});

	it("should only trigger the return assertion for objects if argument type is TYPE_OBJECT", () => {
		testAssertType(u.TYPE_OBJECT, (fn, args) => {
			if (typeof args[0] !== 'object' || args[0] === null) throw new Error();
		}, (fn, args) => {
			if (typeof args[0] === 'object' && args[0] !== null) throw new Error();
		});
	});

	it("should only trigger the return assertion for Object instances of argument type is TYPE_OBJECT_LITERAL", () => {
		testAssertType(u.TYPE_OBJECT_LITERAL, (fn, args) => {
			if (!(args[0] instanceof Object) || args[0].constructor !== Object) throw new Error();
		}, (fn, args) => {
			if (args[0] instanceof Object && args[0].constructor === Object) throw new Error();
		});
	});

	it("should only trigger the return assertion for regular expressions if argument type is TYPE_OBJECT_REGEXP", () => {
		testAssertType(u.TYPE_OBJECT_REGEXP, (fn, args) => {
			if (!(args[0] instanceof RegExp)) throw new Error();
		}, (fn, args) => {
			if (args[0] instanceof RegExp) throw new Error();
		});
	});

	it("should only trigger the return assertion for error instances if argument type is TYPE_OBJECT_ERROR", () => {
		testAssertType(u.TYPE_OBJECT_ERROR, (fn, args) => {
			if (!(args[0] instanceof Error)) throw new Error();
		}, (fn, args) => {
			if (args[0] instanceof Error) throw new Error();
		});
	});

	it("should only trigger the return assertion for objects implementing the iterator interface if argument type is TYPE_OBJECT_ITERATOR", () => {
		testAssertType(u.TYPE_OBJECT_ITERATOR, (fn, args) => {
			if (!(args[0] instanceof Object) || !(Symbol.iterator in args[0])) throw new Error();
		}, (fn, args) => {
			if (args[0] instanceof Object && Symbol.iterator in args[0]) throw new Error();
		});
	});

	it("should only trigger the return assertion for arrays if argument type is TYPE_ARRAY", () => {
		testAssertType(u.TYPE_ARRAY, (fn, args) => {
			if (!Array.isArray(args[0])) throw new Error();
		}, (fn, args) => {
			if (Array.isArray(args[0])) throw new Error();
		});
	});

	it("should only trigger the return assertion for functions if argument type is TYPE_FUNCTION", () => {
		testAssertType(u.TYPE_FUNCTION, (fn, args) => {
			if (typeof args[0] !== 'function') throw new Error();
		}, (fn, args) => {
			if (typeof args[0] === 'function') throw new Error();
		});
	});

	it("should only trigger the return assertion for generator functions is argument type is TYPE_FUNCTION_GENERATOR", () => {
		testAssertType(u.TYPE_FUNCTION_GENERATOR, (fn, args) => {
			if (typeof args[0] !== 'function' || args[0].constructor.name !== 'GeneratorFunction') throw new Error();
		}, (fn, args) => {
			if (typeof args[0] === 'function' && args[0].constructor.name === 'GeneratorFunction') throw new Error();
		});
	});

	it("should only trigger the return assertion for spec objects if the argument is a spec object", () => {
		testAssertSpec({
			value : "foo"
		});

		testAssertSpec({
			value : "bar",
			valid : true
		});

		testAssertSpec({
			value : "baz",
			valid : false
		});
	});

	it("should only trigger the return assertion for injected objects for other arguments", () => {
		const args = [
			1234567890,
			"1234567890",
			Symbol("1234567890"),
			{},
			/^$/,
			new Error(),
			(function* () {
				yield null;
			})(),
			[],
			() => null,
			function* () {
				yield null;
			}
		];

		for (let arg of args) testAssertType(arg, (fn, args) => {
			if (args[0] !== arg) throw new Error();
		}, (fn, args) => {
			if (args[0] === arg) throw new Error();
		});
	});
});
