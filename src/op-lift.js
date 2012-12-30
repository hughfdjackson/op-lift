var lift = {}

// infix
var infixOps = '* / % + - << >> >>> < > <= >= instanceof in == != === !== & ^ | || && . ,'

lift.infix = function(op){
    if ( infixOps.indexOf(op) === -1 ) return null

    if ( op === '.' )  op = 'a[b]' 
    else               op = 'a ' + op + ' b'

    return Function('a', 'b', 'return ' + op)
}

// prefix
var prefixOps = 'void typeof ++ -- + - ~ ! new'

lift.prefix = function(op){
    if ( prefixOps.indexOf(op) === -1 ) return null 
    return Function('a', 'return ' + op + ' a')
}

// postfix
var postfixOps = '++ --'

lift.postfix = function(op){
    if ( postfixOps.indexOf(op) === -1 ) return null
    return Function('a', 'return a ' + op)
}

// export
module.exports = lift
