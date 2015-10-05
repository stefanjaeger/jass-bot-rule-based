'use strict';

let _ = require('lodash');

class UndeufeObeabeStrategy {
    playCard(myCards, playedCards, gameState, cardDistribution) {
        // Böckli
        if (cardDistribution.boeckliColors.length > 0) {
            console.log('play böckli UNDEUFE/OBEABE');
            return _.filter(myCards, card => card.color === cardDistribution.boeckliColors[0])[0];
        }
    }
}

module.exports = UndeufeObeabeStrategy;