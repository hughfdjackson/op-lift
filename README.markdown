# op-lift

Turn js operators into delicious first-class functions.

## Example

```javascript
var lift = require('op-lift')

;[1, 2, 3, 4].reduce(lift('+')) //= 10
```

## Install & Test

install via npm: `npm install op-lift`
test: `cd node_modules/op-lift && npm test`

## API 

### lift(String) -> Function

lift takes a string, representing an infix operator, and returns a function that performs the same job.

```javascript
var lift = require('op-lift')

;[1, 2, 3, 4].reduce(lift.infix('*')) //= 24

;[true, false, true].map(lift('!')) //= [ false, true, false ]
;[Object, Array, Function].map(lift('new')).map(lift('typeof')) //= [ 'object', 'object', 'function' ]
```

#### Supported operators:

The supported operators are: 

prefix: `void typeof ++ -- + - ~ ! new`
infix: `* / % + - << >> >>> < > <= >= instanceof in == != === !== & ^ | || && . ,`

### Tastes great with..

Since the primary difference between operators and functions is that functions are first class, *op-lift* works very well with libraries heavy on the higher-order functions, including:

* [tap](http://npmjs.org/package/tap-chain) - allows functions to be injected into the method chain
* [underscore](http://npmjs.org/package/underscore) - uses functional iterators, and has standard functional partial application & composition.
