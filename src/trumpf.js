'use strict';

let _ = require('lodash');

class TrumpfStrategy {
    playCard(myCards, playedCards, gameState, cardDistribution) {
        // Böckli
        if (cardDistribution.playedCardsPerColor[gameState.currentTrumpfColor] === 9 && cardDistribution.boeckliColors.length > 0) {
            console.log('play böckli TRUMPF');
            return _.filter(myCards, card => card.color === cardDistribution.boeckliColors[0])[0];
        }

        // if last player and Trumpf left and points > 10, take it
        if (playedCards.length === 3 && playedCards[0].color !== gameState.currentTrumpfColor && playedCards[1].color !== gameState.currentTrumpfColor && playedCards[2].color !== gameState.currentTrumpfColor && cardDistribution.myCountOfCardsPerColor[gameState.currentTrumpfColor] > 0) {
            let sumOfPlayedCards = _.sum(playedCards, (card) => {
                switch (card.number) {
                    case 14:
                        return 11;
                    case 13:
                        return 4;
                    case 12:
                        return 3;
                    case 11:
                        return 2;
                    case 10:
                        return 10;
                    case 9:
                        return 0;
                    case 8:
                        return 0;
                    case 7:
                        return 0;
                    case 6:
                        return 0;
                }
            });

            if (sumOfPlayedCards > 10) {
                console.log('play TRUMPF on big points');
                return _.filter(myCards, card => card.color === gameState.currentTrumpfColor)[0];
            }
        }
    }
}

module.exports = TrumpfStrategy;
