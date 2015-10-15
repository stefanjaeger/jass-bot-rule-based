'use strict';

let Bot = require('../../javascript-jass-bot/index');
let _ = require('lodash');
let TrumpfRequestor = require('./trumpf-requestor');
let UndeufeObeabeStrategy = require('./monika/undeufe-obeabe');
let TrumpfStrategy = require('./monika/trumpf');

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
        
        console.log(`Play ${this.printAnsage(gameState.currentTrumpfMode)} ${this.strategyState.angesagt || this.strategyState.partnerAngesagt ? 'A' : ' '} ${playedCards.map(c => this.printCard(c, gameState)).join(" ")} [${this.printCard(cardToPlay, gameState)}] / ${myCards.map(c => this.printCard(c, gameState)).join(" ")}`);
        
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
    
    gameFinished(data) {    }

    notifyError(error) {
        // console.log(error);
    }
    
    printCard(card, gameState) {
        const COLORS = {'HEARTS' : '♥', 'SPADES' : '♠', 'CLUBS': '♣', 'DIAMONDS': '♦'};
        
        const isTrumpf = card.color === gameState.currentTrumpfColor;
        
        return `${isTrumpf ? "*" : " "}${COLORS[card.color]}${card.number}`;
    }
    
    printAnsage(trumpfMode) {
        switch (trumpfMode) {
        case 'UNDEUFE': return 'u';
        case 'OBEABE': return 'o';
        case 'TRUMPF': return 't';
        }
    }
}

module.exports = BotStrategy;

//new Bot('monika').withStrategy(new BotStrategy()).connect('sleepy-garden-3994.herokuapp.com');
//new Bot('monika').withStrategy(new BotStrategy()).connect('localhost:3000');
//new Bot('monika').withStrategy(new BotStrategy()).connect('192.168.200.31:3000');