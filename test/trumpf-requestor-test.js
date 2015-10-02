'use strict';

var TrumpfRequestor = require('../src/trumpf-requestor');
var assert = require('assert');

describe('TrumpfRequestor', function () {
    describe('sichere Ansagen', function () {
        let trumpfRequestor = new TrumpfRequestor();
        it('Trumpf ansagen bei Bauer zu viert', function () {
            let result = trumpfRequestor.requestTrumpf([{
                    number: 7,
                    color: 'DIAMONDS'
                },
                {
                    number: 14,
                    color: 'CLUBS'
                },
                {
                    number: 6,
                    color: 'DIAMONDS'
                },
                {
                    number: 8,
                    color: 'DIAMONDS'
                },
                {
                    number: 13,
                    color: 'HEARTS'
                },
                {
                    number: 11,
                    color: 'DIAMONDS'
                },
                {
                    number: 8,
                    color: 'HEARTS'
                },
                {
                    number: 6,
                    color: 'HEARTS'
                },
                {
                    number: 12,
                    color: 'CLUBS'
                }]);
            assert.equal('TRUMPF', result.mode);
            assert.equal('DIAMONDS', result.trumpfColor);
        });
        
        it('Trumpf ansagen bei Nell zu fünft', function () {
            let result = trumpfRequestor.requestTrumpf([{
                    number: 6,
                    color: 'DIAMONDS'
                },
                {
                    number: 14,
                    color: 'CLUBS'
                },
                {
                    number: 9,
                    color: 'DIAMONDS'
                },
                {
                    number: 7,
                    color: 'DIAMONDS'
                },
                {
                    number: 13,
                    color: 'HEARTS'
                },
                {
                    number: 8,
                    color: 'DIAMONDS'
                },
                {
                    number: 10,
                    color: 'DIAMONDS'
                },
                {
                    number: 6,
                    color: 'HEARTS'
                },
                {
                    number: 12,
                    color: 'DIAMONDS'
                }]);
            assert.equal('TRUMPF', result.mode);
            assert.equal('DIAMONDS', result.trumpfColor);
        });
        
        it('Trumpf ansagen bei Ass zu fünft', function () {
            let result = trumpfRequestor.requestTrumpf([{
                    number: 6,
                    color: 'DIAMONDS'
                },
                {
                    number: 14,
                    color: 'CLUBS'
                },
                {
                    number: 7,
                    color: 'DIAMONDS'
                },
                {
                    number: 8,
                    color: 'DIAMONDS'
                },
                {
                    number: 13,
                    color: 'HEARTS'
                },
                {
                    number: 10,
                    color: 'DIAMONDS'
                },
                {
                    number: 12,
                    color: 'DIAMONDS'
                },
                {
                    number: 6,
                    color: 'HEARTS'
                },
                {
                    number: 14,
                    color: 'DIAMONDS'
                }]);
            assert.equal('TRUMPF', result.mode);
            assert.equal('DIAMONDS', result.trumpfColor);
        });
        
        it('Trumpf ansagen bei Bauer, Nell und Ass', function () {
            let result = trumpfRequestor.requestTrumpf([{
                    number: 9,
                    color: 'DIAMONDS'
                },
                {
                    number: 14,
                    color: 'CLUBS'
                },
                {
                    number: 11,
                    color: 'DIAMONDS'
                },
                {
                    number: 8,
                    color: 'HEARTS'
                },
                {
                    number: 13,
                    color: 'HEARTS'
                },
                {
                    number: 10,
                    color: 'HEARTS'
                },
                {
                    number: 12,
                    color: 'HEARTS'
                },
                {
                    number: 6,
                    color: 'HEARTS'
                },
                {
                    number: 14,
                    color: 'DIAMONDS'
                }]);
            assert.equal('TRUMPF', result.mode);
            assert.equal('DIAMONDS', result.trumpfColor);
        });
        
        it('Trumpf ansagen bei Bauer, Nell und 2 Asse in fremden Farben', function () {
            let result = trumpfRequestor.requestTrumpf([{
                    number: 9,
                    color: 'DIAMONDS'
                },
                {
                    number: 14,
                    color: 'CLUBS'
                },
                {
                    number: 11,
                    color: 'CLUBS'
                },
                {
                    number: 9,
                    color: 'HEARTS'
                },
                {
                    number: 13,
                    color: 'SPADES'
                },
                {
                    number: 11,
                    color: 'HEARTS'
                },
                {
                    number: 12,
                    color: 'SPADES'
                },
                {
                    number: 6,
                    color: 'SPADES'
                },
                {
                    number: 14,
                    color: 'DIAMONDS'
                }]);
            assert.equal('TRUMPF', result.mode);
            assert.equal('HEARTS', result.trumpfColor);
        });
        
        it('OBEABE ansagen bei 3 Assen und 2 Königen', function () {
            let result = trumpfRequestor.requestTrumpf([{
                    number: 9,
                    color: 'DIAMONDS'
                },
                {
                    number: 14,
                    color: 'CLUBS'
                },
                {
                    number: 13,
                    color: 'CLUBS'
                },
                {
                    number: 9,
                    color: 'HEARTS'
                },
                {
                    number: 13,
                    color: 'SPADES'
                },
                {
                    number: 13,
                    color: 'HEARTS'
                },
                {
                    number: 14,
                    color: 'SPADES'
                },
                {
                    number: 6,
                    color: 'SPADES'
                },
                {
                    number: 14,
                    color: 'DIAMONDS'
                }]);
            assert.equal('OBEABE', result.mode);
        });
        
        it('UNDEUFE ansagen bei 3 Sechser und 2 Siebner', function () {
            let result = trumpfRequestor.requestTrumpf([{
                    number: 9,
                    color: 'DIAMONDS'
                },
                {
                    number: 6,
                    color: 'CLUBS'
                },
                {
                    number: 13,
                    color: 'CLUBS'
                },
                {
                    number: 9,
                    color: 'HEARTS'
                },
                {
                    number: 7,
                    color: 'SPADES'
                },
                {
                    number: 7,
                    color: 'HEARTS'
                },
                {
                    number: 6,
                    color: 'SPADES'
                },
                {
                    number: 14,
                    color: 'SPADES'
                },
                {
                    number: 6,
                    color: 'DIAMONDS'
                }]);
            assert.equal('UNDEUFE', result.mode);
        });
    });
});
