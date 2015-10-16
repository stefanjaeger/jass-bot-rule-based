'use strict';

let ColorConversion = require('../../src/common/colors-conversion');
let TrumpfStrategy = require('../../src/playcard/trumpf');
let assert = require('chai').assert;

describe('TrumpfStrategy', function () {
    describe('get playable cards', function () {
        let gameState = {};
        let strategyState = {};

        it('on first position all cards are playable', function () {
            let strategy = new TrumpfStrategy();
            let result = strategy.getPlayableCards(ColorConversion.toCards(['♦9', '♠6', '♠13', '♥9', '♣7', '♥7', '♣6', '♣14', '♦6']), [], gameState, strategyState);
            assert.equal(9, result.length);
        });

        it('player needs to play same color or trumpf', function () {
            let strategy = new TrumpfStrategy();
            gameState.currentTrumpfColor = ColorConversion.toColor('♣');
            let result = ColorConversion.toUtf8Cards(strategy.getPlayableCards(ColorConversion.toCards(['♦9', '♠6', '♠13', '♥9', '♣7', '♥7', '♣6', '♣14', '♦6']), ColorConversion.toCards(['♦7']), gameState, strategyState));
            assert.equal(5, result.length);
            assert.include(result, '♦9');
            assert.include(result, '♣7');
            assert.include(result, '♣6');
            assert.include(result, '♣14');
            assert.include(result, '♦6');
        });

        it('player can play anything if he can\'t "färben"', function () {
            let strategy = new TrumpfStrategy();
            gameState.currentTrumpfColor = ColorConversion.toColor('♣');
            let result = ColorConversion.toUtf8Cards(strategy.getPlayableCards(ColorConversion.toCards(['♦9', '♥6', '♥13', '♥9', '♣7', '♥7', '♣6', '♣14', '♦6']), ColorConversion.toCards(['♠7']), gameState, strategyState));
            assert.equal(9, result.length);
        });
    });
});