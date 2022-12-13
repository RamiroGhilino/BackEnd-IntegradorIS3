
const add = require("../funciones/add");
const sub = require("../funciones/sub");
const restart = require("../funciones/restart");

test('suma 1 al número actual', () => {
    let count = 0;
    expect(add(count)).toBe(1);
})

test('resta 1 al número actual', () => {
    let count = 0;
    expect(sub(count)).toBe(-1);
})

test('vuelve a 0 el contador', () => {
    let count = 10;
    expect(restart(count)).toBe(0);
})