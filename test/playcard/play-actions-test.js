'use strict';

let ColorConversion = require('../../src/common/colors-conversion');
let JassPlayActions = require('../../src/playcard/play-actions');
let assert = require('chai').assert;

describe('JassPlayActions', function () {
    describe('play best card', function () {
        let gameState = {};
        let strategyState = {};

        it('play best card with trumpf Bauer, Nell, Ass', function () {
            gameState.currentTrumpfColor = ColorConversion.toColor('♥');
            let result = ColorConversion.toUtf8Card(JassPlayActions.playBestCard(ColorConversion.toCards(['♥14', '♠6', '♠11', '♥11', '♣7', '♥9', '♣6', '♣14', '♦6']), [], gameState, strategyState));
            assert.equal('♥11', result);
        });
        
        it('play best card with trumpf Nell, Ass', function () {
            gameState.currentTrumpfColor = ColorConversion.toColor('♥');
            let result = ColorConversion.toUtf8Card(JassPlayActions.playBestCard(ColorConversion.toCards(['♥14', '♠6', '♠11', '♥10', '♣7', '♥9', '♣6', '♣14', '♦6']), [], gameState, strategyState));
            assert.equal('♥9', result);
        });
        
        it('play best card with trumpf Ass', function () {
            gameState.currentTrumpfColor = ColorConversion.toColor('♥');
            let result = ColorConversion.toUtf8Card(JassPlayActions.playBestCard(ColorConversion.toCards(['♥14', '♠6', '♠11', '♥10', '♣7', '♥8', '♣6', '♣14', '♦6']), [], gameState, strategyState));
            assert.equal('♥14', result);
        });
        
        it('play best card with simple trumpf', function () {
            gameState.currentTrumpfColor = ColorConversion.toColor('♥');
            let result = ColorConversion.toUtf8Card(JassPlayActions.playBestCard(ColorConversion.toCards(['♥6', '♠6', '♠11', '♥10', '♣7', '♥8', '♣6', '♣14', '♦6']), [], gameState, strategyState));
            assert.equal('♥10', result);
        });
        
        it('play best card without trumpf', function () {
            gameState.currentTrumpfColor = ColorConversion.toColor('♥');
            let result = ColorConversion.toUtf8Card(JassPlayActions.playBestCard(ColorConversion.toCards(['♠6', '♠6', '♠11', '♣10', '♣7', '♣8', '♣6', '♣14', '♦6']), [], gameState, strategyState));
            assert.equal('♣14', result);
        });
    });
    
    describe('play weakest card', function () {
        let gameState = {};
        let strategyState = {};

        it('play best card with trumpf Bauer, Nell, Ass', function () {
            gameState.currentTrumpfColor = ColorConversion.toColor('♥');
            let result = ColorConversion.toUtf8Card(JassPlayActions.playWeakestCard(ColorConversion.toCards(['♥14', '♠6', '♠11', '♥11', '♣7', '♥9', '♣6', '♣14', '♦6']), [], gameState, strategyState));
            assert.equal('♠6', result);
        });
        
        it('play best card with trumpf Nell, Ass', function () {
            gameState.currentTrumpfColor = ColorConversion.toColor('♥');
            let result = ColorConversion.toUtf8Card(JassPlayActions.playWeakestCard(ColorConversion.toCards(['♥14', '♠6', '♠11', '♥10', '♣7', '♥9', '♣6', '♣14', '♦6']), [], gameState, strategyState));
            assert.equal('♠6', result);
        });
        
        it('play best card with trumpf Ass', function () {
            gameState.currentTrumpfColor = ColorConversion.toColor('♥');
            let result = ColorConversion.toUtf8Card(JassPlayActions.playWeakestCard(ColorConversion.toCards(['♥14', '♠6', '♠11', '♥10', '♣7', '♥8', '♣6', '♣14', '♦6']), [], gameState, strategyState));
            assert.equal('♠6', result);
        });
        
        it('play best card with simple trumpf', function () {
            gameState.currentTrumpfColor = ColorConversion.toColor('♥');
            let result = ColorConversion.toUtf8Card(JassPlayActions.playWeakestCard(ColorConversion.toCards(['♥6', '♠6', '♠11', '♥10', '♣7', '♥8', '♣6', '♣14', '♦6']), [], gameState, strategyState));
            assert.equal('♠6', result);
        });
        
        it('play best card without trumpf', function () {
            gameState.currentTrumpfColor = ColorConversion.toColor('♥');
            let result = ColorConversion.toUtf8Card(JassPlayActions.playWeakestCard(ColorConversion.toCards(['♠6', '♠6', '♠11', '♣10', '♣7', '♣8', '♣6', '♣14', '♦6']), [], gameState, strategyState));
            assert.equal('♠6', result);
        });
    });
});