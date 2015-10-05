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
            if (cardDistribution.boeckliColors.length > 0) {
                console.log('play böckli UNDEUFE/OBEABE');
                return _.filter(myCards, card => card.color === cardDistribution.boeckliColors[0])[0];
            }
        }
        if (gameState.currentTrumpfMode === 'TRUMPF') {
            if (cardDistribution.playedCardsPerColor[gameState.currentTrumpfColor] === 9 && cardDistribution.boeckliColors.length > 0) {
                console.log('play böckli TRUMPF');
                return _.filter(myCards, card => card.color === cardDistribution.boeckliColors[0])[0];
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