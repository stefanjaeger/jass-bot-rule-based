'use strict';

let Bot = require('../../javascript-jass-bot/index');
let _ = require('lodash');
let TrumpfRequestor = require('./trumpf-requestor');
let CardDistributionCalculator = require('./card-distribution-calculator');

class BotStrategy {
    requestTrumpf(cards) {
        let strategy = new TrumpfRequestor();
        return strategy.requestTrumpf(cards);
    }

    playCard(myCards, playedCards, gameState) {
        let cardDistributionCalculator = new CardDistributionCalculator();
        let cardDistribution = cardDistributionCalculator.estimateCardDistribution(myCards, playedCards, gameState);

        //console.log(cardDistribution);

        if (gameState.currentTrumpfMode === 'UNDEUFE' || gameState.currentTrumpfMode === 'OBEABE') {
            // Böckli
            if (cardDistribution.boeckliColors.length > 0) {
                console.log('play böckli UNDEUFE/OBEABE');
                return _.filter(myCards, card => card.color === cardDistribution.boeckliColors[0])[0];
            }
        }
        if (gameState.currentTrumpfMode === 'TRUMPF') {
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

        // e.g. play random
        return myCards[Math.floor(Math.random() * myCards.length)];
    }

    gameFinished(data) {
        let ownBotIndex = (data[0].name.indexOf('complex') > 0) ? 0 : 1;
        let otherBotIndex = (ownBotIndex === 0) ? 1 : 0;
        let winner = (data[ownBotIndex].points > data[otherBotIndex].points) ? data[ownBotIndex].name : data[otherBotIndex].name;

        console.log(`${data[ownBotIndex].points} vs. ${data[otherBotIndex].points}. Winner: ${winner}`);
    }

    notifyError(error) {
        // console.log(error);
    }
}

module.exports = BotStrategy;

new Bot('complex').withStrategy(new BotStrategy()).connect('localhost:3000');