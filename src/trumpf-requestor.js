'use strict';

let _ = require('lodash');

class TrumpfRequestor {
    constructor() {
        this.possibilites = [
            {
                mode: 'TRUMPF',
                trumpfColor: 'SPADES'
            },
            {
                mode: 'TRUMPF',
                trumpfColor: 'HEARTS'
            },
            {
                mode: 'TRUMPF',
                trumpfColor: 'DIAMONDS'
            },
            {
                mode: 'TRUMPF',
                trumpfColor: 'CLUBS'
            },
            {
                mode: 'UNDEUFE'
            },
            {
                mode: 'OBEABE'
            }
        ];
    }

    trumpf(color) {
        return {
            mode: 'TRUMPF',
            trumpfColor: color
        };
    }

    obeabe() {
        return {
            mode: 'OBEABE'
        };
    }

    undeufe() {
        return {
            mode: 'UNDEUFE'
        };
    }

    requestTrumpf(cards) {
        let ca = this.calculateAnalytics(cards);

        // Rule 1: Bauer zu viert
        let bauerZuViert = _.intersection(ca.colorsWithNumberOfCardsLargerEqualThan(4), ca.colorsContainingCard(11));
        if (bauerZuViert.length > 0) return this.trumpf(bauerZuViert[0]);

        // Rule 2: Nell zu fünft
        let nellZuFuenft = _.intersection(ca.colorsWithNumberOfCardsLargerEqualThan(5), ca.colorsContainingCard(9));
        if (nellZuFuenft.length > 0) return this.trumpf(nellZuFuenft[0]);

        // Rule 3: Ass zu fünft
        let assZuFuenft = _.intersection(ca.colorsWithNumberOfCardsLargerEqualThan(5), ca.colorsContainingCard(14));
        if (assZuFuenft.length > 0) return this.trumpf(assZuFuenft[0]);

        // Rule 4: Bauer, Nell, Ass
        let bauerNellAss = ca.colorsContainingCards([9, 11, 14]);
        if (bauerNellAss.length > 0) return this.trumpf(bauerNellAss[0]);

        // Rule 5: Bauer, Nell und 2 Asse in fremder Farbe
        let bauerNell = ca.colorsContainingCards([9, 11]);
        if (bauerNell.length > 0 && ca.asse().length >= 2) {
            return this.trumpf(bauerNell[0]);
        }

        // Rule 6: 3 Asse, 2 Könige
        if (ca.asse().length >= 3 && ca.koenige().length >= 2) {
            return this.obeabe();
        }

        // Rule 7: 3 Sechser, 2 Siebner
        if (ca.sechser().length >= 3 && ca.siebner().length >= 2) {
            return this.undeufe();
        }

        // Rule 8: Trumpf ansagen mit Bauer
        if (ca.bauer().length >= 1) {
            return this.trumpf(ca.bauer()[0]);
        }

        // Rule 9: Trumpf mit höchsten Anzahl Karten
        return this.trumpf(ca.colorsWithLength()[0].color);

        // return this.possibilites[Math.floor(Math.random() * this.possibilites.length)];
    }

    calculateAnalytics(cards) {
        return {
            colors: ['SPADES', 'HEARTS', 'DIAMONDS', 'CLUBS'],
            cards: cards,
            cardsOfColor: function (color) {
                return _.filter(cards, (card) => card.color === color);
            },
            colorsContainingCard: function (number) {
                return _.map(_.filter(this.cards, (card) => card.number === number), (card) => card.color);
            },
            colorsContainingCards: function (numbers) {
                return _.filter(this.colors, (color) => {
                    return _.every(numbers, (number) => _.some(this.cardsOfColor(color), (c) => c.number === number));
                });
            },
            numberOfCardsForColor: function (color) {
                return _.filter(cards, (card) => card.color === color).length;
            },
            colorsWithNumberOfCardsLargerEqualThan: function (n) {
                return _.filter(this.colors, (color) => this.numberOfCardsForColor(color) >= n);
            },
            colorsWithLength: function () {
                return _.sortByOrder(_.map(_.groupBy(cards, 'color'), (v, k) => {
                    return {
                        color: k,
                        numberOfCards: v.length
                    };
                }), 'numberOfCards', 'DESC');
            },
            asse: function () {
                return this.colorsContainingCard(14);
            },
            koenige: function () {
                return this.colorsContainingCard(13);
            },
            bauer: function () {
                return this.colorsContainingCard(11);
            },
            siebner: function () {
                return this.colorsContainingCard(7);
            },
            sechser: function () {
                return this.colorsContainingCard(6);
            }
        };
    }
}

module.exports = TrumpfRequestor;
