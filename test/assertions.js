import assert from 'assert';
import { describe, it } from 'mocha';

import * as assertions from '../source/assertions';



describe("assertions", () => {
	describe("get", () => {
		it("should return an object containing a throw and a return property", () => {
			const ret = assertions.get();

			assert.strictEqual(typeof ret.return, 'function');
			assert.strictEqual(typeof ret.throw, 'function');
		});

		it("should contain the default assertion functions if unchanged", () => {
			assertions.reset();

			const ret = assertions.get();

			ret.return(() => true, []);

			ret.throw(() => {
				throw new Error();
			}, []);
		});
	});

	describe("set", () => {
		it("should require two functions as arguments", () => {
			const set = assertions.set;
			const fn = () => 1;

			assert.throws(() => set());
			assert.throws(() => set(null));
			assert.throws(() => set(true));
			assert.throws(() => set(1));
			assert.throws(() => set("1"));
			assert.throws(() => set(Symbol(1)));
			assert.throws(() => set(/^1$/));
			assert.throws(() => set({ "1" : 1 }));
			assert.throws(() => set([1]));
			assert.throws(() => set(fn));
			assert.throws(() => set(fn, null));
			assert.throws(() => set(fn, true));
			assert.throws(() => set(fn, 1));
			assert.throws(() => set(fn, "1"));
			assert.throws(() => set(fn, Symbol(1)));
			assert.throws(() => set(fn, /^1$/));
			assert.throws(() => set(fn, { "1" : 1 }));
			assert.throws(() => set(fn, [1]));
			assert.doesNotThrow(() => set(fn, fn));
		});

		it("should set the return and the throw assertion functions", () => {
			const fnA = (fn, args) => 1;
			const fnB = (fn, args) => 1;

			assertions.set(fnA, fnB);

			let ret = assertions.get();

			assert.strictEqual(ret.return, fnA);
			assert.strictEqual(ret.throw, fnB);

			assertions.set(fnB, fnA);

			ret = assertions.get();

			assert.strictEqual(ret.return, fnB);
			assert.strictEqual(ret.throw, fnA);
		});
	});

	describe("reset", () => {
		it("should reenable the default assertions", () => {
			const fnA = (fn, args) => 1;
			const fnB = (fn, args) => 1;

			assertions.set(fnA, fnB),
			assertions.reset();

			const ret = assertions.get();

			assert.notStrictEqual(fnA, ret.return);
			assert.notStrictEqual(fnB, ret.throw);

			ret.return(() => true, []);
			ret.throw(() => {
				throw new Error();
			}, []);
		});
	});
});
