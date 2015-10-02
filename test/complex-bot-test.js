'use strict';

var BotStrategy = require('../src/complex-bot');
var assert = require("assert");

describe('Bot', function () {
    describe('ansagen', function () {
        it('should always return Trumpf Spades', function () {
            let botStrategy = new BotStrategy();
            let result = botStrategy.requestTrumpf();
            assert.equal('TRUMPF', result.mode);
            assert.equal('SPADES', result.trumpfColor);
        });
    });
});
