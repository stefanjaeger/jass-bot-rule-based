'use strict';

let _ = require('lodash');

const trumpfOrder = [11, 9, 14, 13, 12, 10, 8, 7, 6];

const BESTCARD = "BestCard";
const WEAKESTCARD = "WeakestCard";
const LOWSTCARDTOSTICH = "LowestCardToStich";

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
            playType = this.fourdPosition(playableCards, playedCards, gameState, strategyState)
            break;
        }


        return this[`play${playType}`](playableCards, playedCards, gameState, strategyState);
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

    fourdPosition(myCards, playedCards, gameState, strategyState) {
        return LOWSTCARDTOSTICH;
    }

    playBestCard(playableCards, playedCards, gameState, strategyState) {
        let trumpfs = _.filter(playableCards, card => card.color === gameState.currentTrumpfColor);

        let orderedTrumpfs = [];
        trumpfOrder.forEach(o => {
            if (trumpfs.some(t => t.number === o)) {
                orderedTrumpfs.push(_.filter(trumpfs, c => c.number === o)[0]);
            }
        });

        if (orderedTrumpfs.length > 0) {
            return orderedTrumpfs[0];
        }

        return _.sortByOrder(playableCards, 'number', 'desc')[0];
    }

    playWeakestCard(playableCards, playedCards, gameState, strategyState) {
        let notTrumpf = _.filter(playableCards, card => card.color !== gameState.currentTrumpfColor);
        let notTrumpfOrdered = _.sortByOrder(notTrumpf, 'number', 'asc');
        if (notTrumpfOrdered.length > 0) {
            return notTrumpfOrdered[0];
        }

        let trumpfs = _.filter(playableCards, card => card.color === gameState.currentTrumpfColor);

        let trumpfOrderRev = Object.create(trumpfOrder).reverse();


        let orderedTrumpfs = [];
        trumpfOrderRev.forEach(o => {
            if (trumpfs.some(t => t.number === o)) {
                orderedTrumpfs.push(_.filter(trumpfs, c => c.number === o)[0]);
            }
        });

        return orderedTrumpfs[0];
    }


    playLowestCardToStich(playableCards, playedCards, gameState, strategyState) {
        // TODO right now without Trumpf
        if (!_.some(playedCards, c => c.color === gameState.currentTrumpfColor)) {
            let cardOpponentAIndex = playedCards[0].number;
            let cardOpponentBIndex = playedCards[2].color === playedCards[0].color ? playedCards[2].number : -1;
            let cardFriendIndex = playedCards[1].color === playedCards[0].color ? playedCards[1].number : -1;

            let friendHasStich = cardFriendIndex > cardOpponentAIndex && cardFriendIndex > cardOpponentBIndex;
            if (friendHasStich) {
                return this.playWeakestCard(playableCards, playedCards, gameState, strategyState);
            }
            
            let ownPossibleCards = _.filter(playableCards, c => c.color === playedCards[0].color);
            if (ownPossibleCards.length > 0) {
                let highestOwnPossibleCard = _.sortByOrder(ownPossibleCards, 'number', 'desc')[0];
                let weHaveStich = highestOwnPossibleCard.number > cardOpponentAIndex && highestOwnPossibleCard.number > cardOpponentBIndex;
                if (weHaveStich) {
                    return highestOwnPossibleCard;
                }
            }
            
            let ownPossibleCardsWithTrumpf = _.filter(playableCards, c => c.color === gameState.currentTrumpfColor);
            if (ownPossibleCardsWithTrumpf.length > 0 && (playedCards[0].number + playedCards[1].number + playedCards[2].number > 33)) {
                let trumpfOrderRev = Object.create(trumpfOrder).reverse();
                let orderedTrumpfs = [];
                trumpfOrderRev.forEach(o => {
                    if (ownPossibleCardsWithTrumpf.some(t => t.number === o)) {
                        orderedTrumpfs.push(_.filter(ownPossibleCardsWithTrumpf, c => c.number === o)[0]);
                    }
                });
                return orderedTrumpfs[0];
            }
            
            return this.playWeakestCard(playableCards, playedCards, gameState, strategyState);
        }



    }
}

module.exports = TrumpfStrategy;