var a       = require('assert'),
    lift    = require('../')
    infix   = lift.infix,
    prefix  = lift.prefix,
    postfix = lift.postfix

suite('lift.infix')

test('multiplicative operators', function(){
    a.equal(infix('*')(1, 2), 1 * 2)
    a.equal(infix('/')(1, 2), 1 / 2)
    a.equal(infix('%')(1, 2), 1 % 2)
    
})

test('additive operators', function(){
    a.equal(infix('+')(1, 2), 1 + 2)
    a.equal(infix('-')(1, 2), 1 - 2)
})

test('bitwise shift operators', function(){
    a.equal(infix('<<')(1, 2), 1 << 2)
    a.equal(infix('>>')(1, 2), 1 >> 2)
    a.equal(infix('>>>')(1, 2), 1 >>> 2)
})

test('relational operators', function(){
    a.equal(infix('<')(1, 2), 1 < 2)
    a.equal(infix('>')(1, 2), 1 > 2)
    a.equal(infix('<=')(1, 2), 1 <= 2)
    a.equal(infix('>=')(1, 2), 1 >= 2)
    a.equal(infix('instanceof')({}, Object), {} instanceof Object)
    a.equal(infix('in')('a', { a: 1 }), 'a' in { a: 1 })
})


test('equality operators', function(){
    a.equal(infix('==')(1, '1'), 1 == '1')
    a.equal(infix('!=')(1, '1'), 1 != '1')
    a.equal(infix('===')(1, '1'), 1 === '1')
    a.equal(infix('!==')(1, '1'), 1 !== '1')
})

test('infixary bitwise operators', function(){
    a.equal(infix('&')(1, 2), 1 & 2)
    a.equal(infix('^')(1, 2), 1 ^ 2)
    a.equal(infix('|')(1, 2), 1 | 2)
})

test('infixary logic operators', function(){
    a.equal(infix('||')(0, '1'), 0 || '1')
    a.equal(infix('&&')(0, '1'), 0 && '1')
})

test('comma operator', function(){
    a.equal(infix(',')(0, '1'), (0, '1'))
})

test('. accessor', function(){
    a.equal(infix('.')({ a: 1 }, 'a'), {a: 1}.a)
})

test('reject injection', function(){
    a.equal(infix('+ a +'), null)
})

suite('lift.prefix')

test('unary', function(){
    a.equal(prefix('void')(3), void 3)
    a.equal(prefix('typeof')(3), typeof 3)
    a.equal(prefix('++')(3), 4)
    a.equal(prefix('--')(3), 2)
    a.equal(prefix('+')(-3), + -3)
    a.equal(prefix('-')(3), -3)
    a.equal(prefix('~')(3), ~3)
    a.equal(prefix('!')(3), !3)

    var F = function(){ this.x = 3 }
    a.deepEqual(prefix('new')(F), new F)
})

test('reject injection', function(){
    a.equal(prefix('a, void'), null)
})


suite('lift.postfix')

test('postfix expressions', function(){
    a.equal(postfix('++')(4), 4)
    a.equal(postfix('--')(4), 4)
})

test('reject injection', function(){
    a.equal(postfix('; console.log(a)'), null)
})
