'use strict';

let Bot = require('../../javascript-jass-bot/index');
let _ = require('lodash');
let TrumpfRequestor = require('./announcement/trumpf-requestor');
let UndeufeObeabeStrategy = require('./playcard/undeufe-obeabe');
let TrumpfStrategy = require('./playcard/trumpf');
let ColorConversion = require('./common/colors-conversion');

class BotStrategy {
    constructor() {
        this.strategyState = {
            angesagt: false,
            partnerAngesagt: false
        };
    }

    requestTrumpf(cards) {
        let strategy = new TrumpfRequestor();
        return strategy.requestTrumpf(cards);
    }

    playCard(myCards, playedCards, gameState) {
        if (myCards.length === 9) {
            this.strategyState.angesagt = playedCards.length === 0;
            this.strategyState.partnerAngesagt = playedCards.length === 2;
        }

        let strategy = this.getPlayStrategy(gameState.currentTrumpfMode);

        let cardToPlay = strategy.playCard(myCards, playedCards, gameState, this.strategyState) || myCards[Math.floor(Math.random() * myCards.length)];

        console.log(`Play ${this.printAnsage(gameState)} ${this.strategyState.angesagt || this.strategyState.partnerAngesagt ? 'A' : ' '} -> ${playedCards.map(c => this.printCard(c, gameState)).join(" ")}${(playedCards.length > 0) ? ' ' : ''}[${this.printCard(cardToPlay, gameState)}] / ${myCards.map(c => this.printCard(c, gameState)).join(" ")}`);

        return cardToPlay;
    }

    getPlayStrategy(trumpfMode) {
        switch (trumpfMode) {
        case 'UNDEUFE':
        case 'OBEABE':
            return new UndeufeObeabeStrategy();
        case 'TRUMPF':
            return new TrumpfStrategy();
        }
    }

    gameFinished(data) {}

    notifyError(error) {
        // console.log(error);
    }

    printCard(card, gameState) {
        return `${ColorConversion.toUtf8Color(card.color)}${card.number}`;
    }

    printAnsage(gameState) {
        switch (gameState.currentTrumpfMode) {
        case 'UNDEUFE':
            return 'u ';
        case 'OBEABE':
            return 'o ';
        case 'TRUMPF':
            return 't' + ColorConversion.toUtf8Color(gameState.currentTrumpfColor);
        }
    }
}

module.exports = BotStrategy;