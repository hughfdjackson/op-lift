var opsToObj = function(genFn, ops){
    var makeOp = function(o, op){ o[op] = genFn(op); return o }
    return ops.reduce(makeOp, {})
}

// infix
var infixOps = '* / % + - << >> >>> < > <= >= instanceof in == != === !== & ^ | || && . ,'.split(' ')

var makeInfix = function(op){
    if ( infixOps.indexOf(op) === -1 ) return null

    if ( op === '.' )  op = 'a[b]'
    else               op = 'a ' + op + ' b'

    return Function('a', 'b', 'return ' + op)
}

var infix = opsToObj(makeInfix, infixOps)


// prefix
var prefixOps = 'void typeof ++ -- + - ~ ! new'.split(' ')

var makePrefix = function(op){
    if ( prefixOps.indexOf(op) === -1 ) return null 
    return Function('a', 'return ' + op + ' a')
}

var prefix = opsToObj(makePrefix, prefixOps)

// postfix
var postfixOps = '()'.split(' ')

var makePostfix = function(op){
    return Function('a', 'return a ' + op);
}

var postfix = opsToObj(makePostfix, postfixOps)

// ternary-if operator ?:. does not short-circuit.
var ternary = function(condVal, ifVal, elseVal) {
    return condVal ? ifVal : elseVal
}

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
    else if ( op === '?:' ) return ternary
    else                    return prefix[op] || infix[op] || postfix[op]
}

// export
module.exports = lift
