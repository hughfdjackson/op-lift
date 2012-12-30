# op-lift

Turn js operators into delicious first-class functions.

## Example

```javascript
var lift = require('op-lift')

;[1, 2, 3, 4].reduce(lift.infix('+')) //= 10
```

## Install & Test

install via npm: `npm install op-lift`
test: `cd node_modules/op-lift && npm test`

## API 

### lift.infix(String) -> Function

lift takes a string, representing an infix operator, and returns a function that performs the same job.

```javascript
var lift = require('op-lift')

;[1, 2, 3, 4].reduce(lift.infix('*')) //= 24
```

#### Supported operators:

The supported operators are: `* / % + - << >> >>> < > <= >= instanceof in == != === !== & ^ | || && . ,`

### lift.prefix(String) -> Function

Identical to *lift.infix*, except it returns functions taking a single argument:

```javascript
var neg = lift.prefix('!')

;[true, false, true].map(neg) //= [ false, true, false ]
```

```javascript
var instantiate = lift.prefix('new'),
    type        = lift.prefix('typeof')

;[Object, Array, Function].map(instantiate).map(type) //= [ 'object', 'object', 'function' ]
```

#### Supported operators:

The supported operators are: `void typeof ++ -- + - ~ ! new`

### lift.postfix(String) -> Function

Just for the sake of completeness, the postfix operators are included; neither of which do anything useful, since the 'magic' they do is sandboxed:

```javascript
var i       = 0,
    postInc = lift.postfix('++')
    
postInc(i) //= 0
i          //= 0
```

#### Supported operators:

The supported operators are: `++ --`

### Tastes great with..

Since the primary difference between operators and functions is that functions are first class, *op-lift* works very well with libraries heavy on the higher-order functions, including:

* [tap](http://npmjs.org/package/tap-chain) - allows functions to be injected into the method chain
* [underscore](http://npmjs.org/package/underscore) - uses functional iterators, and has standard functional partial application & composition.
