// infix
var infixOps = '* / % + - << >> >>> < > <= >= instanceof in == != === !== & ^ | || && . ,'.split(' ')

var makeInfix = function(op){
    if ( infixOps.indexOf(op) === -1 ) return null

    if ( op === '.' )  op = 'a[b]'
    else               op = 'a ' + op + ' b'

    return Function('a', 'b', 'return ' + op)
}

var infix = infixOps.reduce(function(infix, op) {
	infix[op] = makeInfix(op)
	return infix
}, {})


// prefix
var prefixOps = 'void typeof ++ -- + - ~ ! new'.split(' ')

var makePrefix = function(op){
    if ( prefixOps.indexOf(op) === -1 ) return null 
    return Function('a', 'return ' + op + ' a')
}

var prefix = prefixOps.reduce(function(prefix, op) {
	prefix[op] = makePrefix(op)
	return prefix
}, {})

// postfix omitted because they're useless in this form

// special cases '+' and '-'
var plus = function(a, b){
    if ( b ) return a + b
    else     return +a
}

var minus = function(a, b){
    if ( b ) return a - b
    else     return -a
}

var lift = function(op){
    if ( op === '+' )       return plus
    else if ( op === '-' )  return minus
    else                    return prefix[op] || infix[op]
}

// export
module.exports = lift
