'use strict';

let _ = require('lodash');

class TrumpfStrategy {
    playCard(myCards, playedCards, gameState, cardDistribution) {
        if (playedCards.length === 0) {
            return this.playfirstCard(myCards, playedCards, gameState, cardDistribution);
        }

        if (playedCards.length === 3) {
            return this.playlastCard(myCards, playedCards, gameState, cardDistribution);
        }
    }

    playfirstCard(myCards, playedCards, gameState, cardDistribution) {
        // Rule Böckli
        if (cardDistribution.playedCardsPerColor[gameState.currentTrumpfColor] === 9 && cardDistribution.boeckliColors.length > 0) {
            console.log('TRUMPF: play böckli');
            return _.filter(myCards, card => card.color === cardDistribution.boeckliColors[0])[0];
        }
    }

    playlastCard(myCards, playedCards, gameState, cardDistribution) {
        // Rule: if last player and Trumpf left and points > 10, take it
        if (playedCards[0].color !== gameState.currentTrumpfColor && playedCards[1].color !== gameState.currentTrumpfColor && playedCards[2].color !== gameState.currentTrumpfColor && cardDistribution.myCountOfCardsPerColor[gameState.currentTrumpfColor] > 0) {
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
                console.log('TRUMPF: stechen on big points');
                return _.filter(myCards, card => card.color === gameState.currentTrumpfColor)[0];
            }
        }
        
        // Rule: if last player and can't "färben" --> "verwerfe" lowest card
        let canFaerben = _.filter(myCards, (c) => c.color === playedCards[0].color);
        if (canFaerben.length === 0) {
            // play low points
            // TODO: filter also Böckli Colors
            let myNotTrumpfCards = _.filter(myCards, (card) => card.color !== gameState.currentTrumpfColor);
            let lowPoints = _.filter(myNotTrumpfCards, (c) => c.number === 6 || c.number === 7 || c.number === 8 || c.number === 9);
            let lowPointsOrdered = _.sortByOrder(lowPoints, 'number', 'asc');
            if (lowPointsOrdered.length > 0) {
                console.log('TRUMPF: verwerfe Karte');
                return lowPointsOrdered[0];
            }
        }
    }
}

module.exports = TrumpfStrategy;