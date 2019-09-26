

const { sum } = require('../script');
describe('Функция sum()', () => {
    it('должна возвращать 8 при аргументах 2 и 6', () => {
        expect(sum(2, 6)).toBe(8);
    });
    it('должна возвращать не число при аргументах 2 и строка', () => {
        expect(sum(2, 'строка')).toBe('аргумент не число');
    });
    it('должна возвращать не число при аргументах 2 и undefined', () => {
        expect(sum(2, undefined)).toBe('аргумент не число');
    });
    it('должна возвращать один из аргументов null при аргументах 2 и null', () => {
        expect(sum(2, null)).toBe('аргумент не число');
    });
});

const { sub } = require('../script');
describe('Функция sub()', () => {
    it('должна возвращать -2 при аргументах 2 и 6', () => {
        expect(sub(2, 6)).toBe(-4);
    });
    it('должна возвращать не число при аргументах 2 и строка', () => {
        expect(sub(2, 'строка')).toBe('аргумент не число');
    });
    it('должна возвращать не число при аргументах 2 и undefined', () => {
        expect(sub(2, undefined)).toBe('аргумент не число');
    });
    it('должна возвращать один из аргументов null при аргументах 2 и null', () => {
        expect(sub(2, null)).toBe('аргумент не число');
    });
})

const { mul } = require('../script');
describe('Функция mul()', () => {
    it('должна возвращать 8 при аргументах 2 и 6', () => {
        expect(mul(2, 6)).toBe(12);
    });
    it('должна возвращать 0 при аргументах 0 и 6', () => {
        expect(mul(0, 6)).toBe(0);
    });
    it('должна возвращать не число при аргументах 2 и строка', () => {
        expect(mul(2, 'строка')).toBe('аргумент не число');
    });
    it('должна возвращать не число при аргументах 2 и undefined', () => {
        expect(mul(2, undefined)).toBe('аргумент не число');
    });
    it('должна возвращать один из аргументов null при аргументах 2 и null', () => {
        expect(mul(2, null)).toBe('аргумент не число');
    });
})

const { div } = require('../script');
describe('Функция div()', () => {
    it('должна возвращать 2 при аргументах 4 и 2', () => {
        expect(div(4, 2)).toBe(2);
    });
    it('должна возвращать 0 при аргументах 0 и 6', () => {
        expect(div(0, 6)).toBe(0);
    });
    it('должна возвращать делить нельзя при аргументах 6 и 0', () => {
        expect(div(6, 0)).toBe('На ноль делить нельзя');
    });
    it('должна возвращать не число при аргументах 2 и строка', () => {
        expect(div(2, 'строка')).toBe('аргумент не число');
    });
    it('должна возвращать не число при аргументах 2 и undefined', () => {
        expect(div(2, undefined)).toBe('аргумент не число');
    });
    it('должна возвращать один из аргументов null при аргументах 2 и null', () => {
        expect(div(2, null)).toBe('аргумент не число');
    });
})