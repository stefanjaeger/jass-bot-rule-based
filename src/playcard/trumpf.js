'use strict';

let _ = require('lodash');
let JassPlayActions = require('./play-actions');

const BESTCARD = "BestCard";
const WEAKESTCARD = "WeakestCard";
const LOWESTCARDTOSTICH = "LowestCardToStich";

class TrumpfStrategy {
    playCard(myCards, playedCards, gameState, strategyState) {
        let playAggressive = strategyState.angesagt || strategyState.partnerAngesagt;
        let playableCards = this.getPlayableCards(myCards, playedCards, gameState, strategyState);
        let playType = BESTCARD;

        switch (playedCards.length) {
        case 0:
            playType = this.firstPosition(playableCards, playedCards, gameState, strategyState)
            break;
        case 1:
            playType = this.secondPosition(playableCards, playedCards, gameState, strategyState)
            break;
        case 2:
            playType = this.thirdPosition(playableCards, playedCards, gameState, strategyState)
            break;
        case 3:
            playType = this.fourthPosition(playableCards, playedCards, gameState, strategyState)
            break;
        }


        return JassPlayActions[`play${playType}`](playableCards, playedCards, gameState, strategyState);
    }

    getPlayableCards(myCards, playedCards, gameState, strategyState) {
        if (playedCards.length === 0) {
            return myCards;
        }
        if (!myCards.some(c => c.color === playedCards[0].color)) {
            return myCards;
        }
        return myCards.filter(c => c.color === gameState.currentTrumpfColor || c.color === playedCards[0].color);
    }

    firstPosition(myCards, playedCards, gameState, strategyState) {
        return (strategyState.angesagt || strategyState.partnerAngesagt) ? BESTCARD : WEAKESTCARD;
    }

    secondPosition(myCards, playedCards, gameState, strategyState) {
        return (strategyState.angesagt || strategyState.partnerAngesagt) ? BESTCARD : WEAKESTCARD;
    }

    thirdPosition(myCards, playedCards, gameState, strategyState) {
        return (strategyState.angesagt || strategyState.partnerAngesagt) ? BESTCARD : WEAKESTCARD;
    }

    fourthPosition(myCards, playedCards, gameState, strategyState) {
        return LOWESTCARDTOSTICH;
    }

}

module.exports = TrumpfStrategy;