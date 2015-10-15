'use strict';

let Bot = require('../../javascript-jass-bot/index');
let _ = require('lodash');
let TrumpfRequestor = require('./trumpf-requestor');
let UndeufeObeabeStrategy = require('./monika/undeufe-obeabe');
let TrumpfStrategy = require('./monika/trumpf');

class BotStrategy {
    requestTrumpf(cards) {
        let strategy = new TrumpfRequestor();
        return strategy.requestTrumpf(cards);
    }

    playCard(myCards, playedCards, gameState) {
        let strategy = this.getPlayStrategy(gameState.currentTrumpfMode);
        
        let cardToPlay = strategy.playCard(myCards, playedCards, gameState);

        if (cardToPlay) {
            return cardToPlay;
        }
        return myCards[Math.floor(Math.random() * myCards.length)];
    }
    
    getPlayStrategy(trumpfMode) {
        switch(trumpfMode) {
            case 'UNDEUFE':
            case 'OBEABE':
                return new UndeufeObeabeStrategy();
            case 'TRUMPF':
                return new TrumpfStrategy();
        }
    }

    gameFinished(data) {
        let ownBotIndex = (data[0].name.indexOf('monika') > 0) ? 0 : 1;
        let otherBotIndex = (ownBotIndex === 0) ? 1 : 0;
        let winner = (data[ownBotIndex].points > data[otherBotIndex].points) ? data[ownBotIndex].name : data[otherBotIndex].name;

        console.log(`${data[ownBotIndex].points} vs. ${data[otherBotIndex].points}. Winner: ${winner}`);
    }

    notifyError(error) {
        // console.log(error);
    }
}

module.exports = BotStrategy;

//new Bot('monika').withStrategy(new BotStrategy()).connect('sleepy-garden-3994.herokuapp.com');
new Bot('monika').withStrategy(new BotStrategy()).connect('localhost:3000');
