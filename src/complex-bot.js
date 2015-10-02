'use strict';

let Bot = require('javascript-jass-bot');
let TrumpfRequestor = require('./trumpf-requestor');

class BotStrategy {
    requestTrumpf(cards) {
        let strategy = new TrumpfRequestor();
        return strategy.requestTrumpf(cards);
    }

    playCard(myCards, playedCards, gameState) {
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
