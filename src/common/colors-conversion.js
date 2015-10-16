'use strict';

const COLORS = {
    'HEARTS': '♥',
    'SPADES': '♣',
    'CLUBS': '♠',
    'DIAMONDS': '♦'
};

class ColorsHelper {
    static toColor(color) {
        for (var k in COLORS) {
            if (COLORS[k] === color) {
                return k;
            }
        };
    }

    static toUtf8Color(color) {
        return COLORS[color];
    }

    static toCard(card) {
        return {
            number: parseInt(card.substr(1)),
            color: ColorsHelper.toColor(card.charAt(0))
        };
    }

    static toUtf8Card(card) {
        return ColorsHelper.toUtf8Color(card.color) + card.number;
    }

    static toCards(cards) {
        return cards.map(ColorsHelper.toCard);
    }

    static toUtf8Cards(cards) {
        return cards.map(ColorsHelper.toUtf8Card);
    }
}

module.exports = ColorsHelper;