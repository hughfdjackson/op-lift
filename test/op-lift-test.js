var a       = require('assert'),
    lift    = require('../')

suite('lift')

test('multiplicative operators', function(){
    a.equal(lift('*')(1, 2), 1 * 2)
    a.equal(lift('/')(1, 2), 1 / 2)
    a.equal(lift('%')(1, 2), 1 % 2)
})

test('additive operators', function(){
    a.equal(lift('+')(1, 2), 1 + 2)
    a.equal(lift('-')(1, 2), 1 - 2)
})

test('bitwise shift operators', function(){
    a.equal(lift('<<')(1, 2), 1 << 2)
    a.equal(lift('>>')(1, 2), 1 >> 2)
    a.equal(lift('>>>')(1, 2), 1 >>> 2)
})

test('relational operators', function(){
    a.equal(lift('<')(1, 2), 1 < 2)
    a.equal(lift('>')(1, 2), 1 > 2)
    a.equal(lift('<=')(1, 2), 1 <= 2)
    a.equal(lift('>=')(1, 2), 1 >= 2)
    a.equal(lift('instanceof')({}, Object), {} instanceof Object)
    a.equal(lift('in')('a', { a: 1 }), 'a' in { a: 1 })
})

test('equality operators', function(){
    a.equal(lift('==')(1, '1'), 1 == '1')
    a.equal(lift('!=')(1, '1'), 1 != '1')
    a.equal(lift('===')(1, '1'), 1 === '1')
    a.equal(lift('!==')(1, '1'), 1 !== '1')
})

test('liftary bitwise operators', function(){
    a.equal(lift('&')(1, 2), 1 & 2)
    a.equal(lift('^')(1, 2), 1 ^ 2)
    a.equal(lift('|')(1, 2), 1 | 2)
})

test('binary logic operators', function(){
    a.equal(lift('||')(0, '1'), 0 || '1')
    a.equal(lift('&&')(0, '1'), 0 && '1')
})

test('comma operator', function(){
    a.equal(lift(',')(0, '1'), (0, '1'))
})

test('. accessor', function(){
    a.equal(lift('.')({ a: 1 }, 'a'), {a: 1}.a)
})

test('unary', function(){
    a.equal(lift('void')(3), void 3)
    a.equal(lift('typeof')(3), typeof 3)
    a.equal(lift('++')(3), 4)
    a.equal(lift('--')(3), 2)
    a.equal(lift('+')(-3), + -3)
    a.equal(lift('-')(3), -3)
    a.equal(lift('~')(3), ~3)
    a.equal(lift('!')(3), !3)

    var F = function(){ this.x = 3 }
    a.deepEqual(lift('new')(F), new F)
})

test('ternary', function() {
    a.equal(lift('?:')(true, 1, 2), 1)
    a.equal(lift('?:')(false, 1, 2), 2)
})

test('reject injection', function(){
    a.equal(lift('a, void'), null)
    a.equal(lift('++ --'), null)
    a.equal(lift('+ a +'), null)
    a.equal(lift('<< >>'), null)
})

test('caching', function() {
    a.equal(lift('void'), lift('void'))
    a.equal(lift('++'), lift('++'))
    a.equal(lift('+'), lift('+'))
    a.equal(lift('-'), lift('-'))
    a.equal(lift('typeof'), lift('typeof'))
})
