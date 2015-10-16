'use strict';

let ColorConversion = require('../../src/common/colors-conversion');
let TrumpfRequestor = require('../../src/announcement/trumpf-requestor');
let assert = require('chai').assert;

describe('TrumpfRequestor', function () {
    describe('siColorConversionere Ansagen', function () {
        let trumpfRequestor = new TrumpfRequestor();
        it('Trumpf ansagen bei Bauer zu viert', function () {
            let result = trumpfRequestor.requestTrumpf(ColorConversion.toCards(['♦7', '♠14', '♦6', '♦8', '♥13', '♦11', '♥8', '♥6', '♠12']));
            assert.equal('TRUMPF', result.mode);
            assert.equal('♦', ColorConversion.toUtf8Color(result.trumpfColor));
        });

        it('Trumpf ansagen bei Nell zu fünft', function () {
            let result = trumpfRequestor.requestTrumpf(ColorConversion.toCards(['♦6', '♠14', '♦9', '♦7', '♥13', '♦8', '♦10', '♥6', '♦12']));
            assert.equal('TRUMPF', result.mode);
            assert.equal('♦', ColorConversion.toUtf8Color(result.trumpfColor));
        });

        it('Trumpf ansagen bei Ass zu fünft', function () {
            let result = trumpfRequestor.requestTrumpf(ColorConversion.toCards(['♦6', '♠14', '♦7', '♦8', '♥13', '♦10', '♦12', '♥6', '♦14']));
            assert.equal('TRUMPF', result.mode);
            assert.equal('♦', ColorConversion.toUtf8Color(result.trumpfColor));
        });

        it('Trumpf ansagen bei Bauer, Nell und Ass', function () {
            let result = trumpfRequestor.requestTrumpf(ColorConversion.toCards(['♦9', '♠14', '♦11', '♥8', '♥13', '♥12', '♥10', '♥6', '♦14']));
            assert.equal('TRUMPF', result.mode);
            assert.equal('♦', ColorConversion.toUtf8Color(result.trumpfColor));
        });

        it('Trumpf ansagen bei Bauer, Nell und 2 Asse in fremden Farben', function () {
            let result = trumpfRequestor.requestTrumpf(ColorConversion.toCards(['♦9', '♠14', '♠11', '♥9', '♣13', '♥11', '♣12', '♣6', '♦14']));
            assert.equal('TRUMPF', result.mode);
            assert.equal('♥', ColorConversion.toUtf8Color(result.trumpfColor));
        });

        it('OBEABE ansagen bei 3 Assen und 2 Königen', function () {
            let result = trumpfRequestor.requestTrumpf(ColorConversion.toCards(['♦9', '♠14', '♠13', '♥9', '♣13', '♥13', '♣14', '♣6', '♦14']));
            assert.equal('OBEABE', result.mode);
        });

        it('UNDEUFE ansagen bei 3 SeColorConversionser und 2 Siebner', function () {
            let result = trumpfRequestor.requestTrumpf(ColorConversion.toCards(['♦9', '♠6', '♠13', '♥9', '♣7', '♥7', '♣6', '♣14', '♦6']));
            assert.equal('UNDEUFE', result.mode);
        });

        it('TRUMPF ansagen mit Bauer', function () {
            let result = trumpfRequestor.requestTrumpf(ColorConversion.toCards(['♦9', '♠6', '♠13', '♥9', '♣10', '♥11', '♣6', '♣14', '♦6']));
            assert.equal('TRUMPF', result.mode);
            assert.equal('♥', ColorConversion.toUtf8Color(result.trumpfColor));
        });

        it('TRUMPF ansagen mit höColorConversionster Anzahl Karten', function () {
            let result = trumpfRequestor.requestTrumpf(ColorConversion.toCards(['♦9', '♠6', '♠13', '♥9', '♣10', '♥10', '♣6', '♣14', '♦6']));
            assert.equal('TRUMPF', result.mode);
            assert.equal('♣', ColorConversion.toUtf8Color(result.trumpfColor));
        });
    });
});