#Framework agnostic function argument testing

##Install
```sh
$ npm install tesa
```

###Use

####with Mocha
```js

import { describe, it } from 'mocha';
import use, * as u from 'tesa';


describe("Foo", () => {
	describe("#bar", () => {
		const instance = new Foo();
		
		it("should require a positive integer as first and a nonempty string as second argument", () => {
			use([
				u.TYPE_NUMBER_INT_POS,
			], [
				u.TYPE_STRING_NONEMPTY
			], (first, second) => instance.bar(first, second));
		});
	});
});
```
