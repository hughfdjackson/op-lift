// infix
var infixOps = '* / % + - << >> >>> < > <= >= instanceof in == != === !== & ^ | || && . ,'.split(' ')

var infix = function(op){
    if ( infixOps.indexOf(op) === -1 ) return null

    if ( op === '.' )  op = 'a[b]' 
    else               op = 'a ' + op + ' b'

    return Function('a', 'b', 'return ' + op)
}

// prefix
var prefixOps = 'void typeof ++ -- + - ~ ! new'.split(' ')

var prefix = function(op){
    if ( prefixOps.indexOf(op) === -1 ) return null 
    return Function('a', 'return ' + op + ' a')
}

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
    else                    return prefix(op) || infix(op)
}

// export
module.exports = lift
