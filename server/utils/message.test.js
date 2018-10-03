const expect = require('expect');
const _ = require('underscore');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('Should generate correct message object', () => {
        const from = 'User1';
        const text = 'Text1';
        const message = generateMessage(from, text);

        expect(message.from).toMatch(from);
        expect(message.text).toMatch(text);
        expect(_.isNumber(message.createdAt)).toBeTruthy();
    });
});

describe('generateLocationMessage', () => {
    it('Should generate correct location object', () => {
        const from = 'User1';
        const latitude = 21;
        const longitude = 37;
        const coords = generateLocationMessage(from, latitude, longitude);

        expect(coords.from).toMatch(from);
        expect(coords.url).toMatch(`https://www.google.com/maps?q=${latitude},${longitude}`);
        expect(_.isNumber(coords.createdAt)).toBeTruthy();
    });
});