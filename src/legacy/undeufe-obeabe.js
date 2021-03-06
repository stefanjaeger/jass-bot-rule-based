'use strict';

let _ = require('lodash');

class UndeufeObeabeStrategy {
    playCard(myCards, playedCards, gameState, cardDistribution) {
        if (playedCards.length === 0) {
            return this.playfirstCard(myCards, playedCards, gameState, cardDistribution);
        }
    }

    playfirstCard(myCards, playedCards, gameState, cardDistribution) {
        // Rule: Böckli
        if (cardDistribution.boeckliColors.length > 0) {
            console.log('UNDEUFE/OBEABE: play böckli');
            return _.filter(myCards, card => card.color === cardDistribution.boeckliColors[0])[0];
        }
        
        // Rule: Ziehe mit bester Karte
        let highestCardPerColor = [];
        _.forEach(cardDistribution.unplayedCardsPerColor, unplayedCardsPerColor => {
            let order =
                (gameState.currentTrumpfMode === 'OBEABE') ? 'desc' : 'asc';
            let highestCard = _.sortByOrder(unplayedCardsPerColor, 'number', order)[0];
            if (highestCard) highestCardPerColor.push(highestCard);
        });

        var highestCardsInMyCards = [];
        _.each(highestCardPerColor, (highestCard) => {
            var card = _.find(myCards, (c) => c.color === highestCard.color && c.number === highestCard.number);
            if (card) highestCardsInMyCards.push(card);
        });
        if (highestCardsInMyCards.length > 0) {
            console.log('UNDEUFE/OBEABE: ziehe mit bester Karte');
            return highestCardsInMyCards[0];
        }
    }
}

module.exports = UndeufeObeabeStrategy;
