const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('Should reject non-string values', () => {
        expect(isRealString(Math.random())).toBeFalsy;
        expect(isRealString(null)).toBeFalsy;
        expect(isRealString(NaN)).toBeFalsy;
        expect(isRealString({})).toBeFalsy;
    });
    it('Should reject string with only spaces', () => {
        expect(isRealString('       ')).toBeFalsy;
    });
    it('Should allow string with non-space characters', () => {
        expect(isRealString('Legit string')).toBeTruthy;
    });
});