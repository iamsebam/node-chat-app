const expect = require('expect');
const _ = require('underscore');
const {generateMessage} = require('./message');

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