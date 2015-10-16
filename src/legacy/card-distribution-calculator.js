'use strict';

let _ = require('lodash');

const MYSELF = 0;
const RIGHT = 1;
const PARTNER = 2;
const LEFT = 3;

const COLORS = ['HEARTS', 'SPADES', 'CLUBS', 'DIAMONDS'];

class CardDistributionCalculator {
    constructor() {
        this.fullDeck = [];

        _.times(9, i => {
            this.fullDeck.push({
                number: i + 6,
                color: 'HEARTS'
            });
            this.fullDeck.push({
                number: i + 6,
                color: 'SPADES'
            });
            this.fullDeck.push({
                number: i + 6,
                color: 'CLUBS'
            });
            this.fullDeck.push({
                number: i + 6,
                color: 'DIAMONDS'
            });
        });
    }

    estimateCardDistribution(myCards, playedCards, gameState) {
        // 1. update certain information
        // 1. a) who could not play requested color
        let result = {};

        result.playerIsMissingColor = this.calculatePlayerWhoCouldNotPlayColor(gameState);

        result.allPlayedCards = this.calculateAllPlayedCards(gameState);

        result.playedCardsPerColor = this.calculatePlayedCardsPerColor(gameState, result.allPlayedCards);

        result.myCountOfCardsPerColor = this.calculateMyCountOfCardsPerColor(gameState, myCards);

        result.boeckliColors = this.calculateBoeckliColors(gameState, result.playedCardsPerColor, result.myCountOfCardsPerColor);

        result.unplayedCards = this.calculateUnplayedCards(gameState, result.allPlayedCards, playedCards);
        
        result.unplayedCardsPerColor = this.calculateUnplayedCardsPerColor(result.unplayedCards);

        if (gameState.currentTrumpfMode === 'TRUMPF') {
            result.notTrumpfColors = _.filter(COLORS, color => color !== gameState.currentTrumpfColor);
        }

        return result;

        // http://www.borgsoft.de/FreeDokoAI.pdf
        // 1. update the certain information (wenn jemand nicht färben kann) 
        //   --> welche Karten wir sicher zuordnen können 
        // 2. change cards weighting (wenn jemand ein König spielt um den Stich zu gewinnen, auch wenn eine Dame genügend gewesen wäre, machen wir ein negative weighting für diese Dame bei diesem Spieler)
        //   --> welche Karten wir wahrscheinlich jemandem nicht zuordnen
        // 3. estimate hands
        //   --> For each player we start with the cards he must have. Then we add the cards he can have with the
        // greatest weighting into his estimated hand. Further we add the cards for which he has the greatest
        // weighing according to the other players (this ensures, that each card is distributed to a player).
        // Afterwards some checks ensure a valid distribution.
        // In the end we have an estimated hand for each player and we can differ between certain
        // information (from step 1) and estimated information (from step 2 and 3).
    }

    calculateAllPlayedCards(gameState) {
        return _.flatten(gameState.stitch, true);
    }

    calculatePlayedCardsPerColor(gameState, allPlayedCards) {
        let playedCardsPerColor = {};
        _.forEach(COLORS, color => playedCardsPerColor[color] = _.filter(allPlayedCards, card => card.color === color).length);
        return playedCardsPerColor;
    }

    calculateMyCountOfCardsPerColor(gameState, myCards) {
        let myCountOfCards = {};
        _.forEach(COLORS, color => myCountOfCards[color] = _.filter(myCards, card => card.color === color).length);
        return myCountOfCards;
    }

    calculateBoeckliColors(gameState, playedCardsPerColor, myCountOfCards) {
        let boeckliColors = [];
        _.forEach(COLORS, color => {
            if (playedCardsPerColor[color] < 9 && playedCardsPerColor[color] + myCountOfCards[color] == 9) boeckliColors.push(color)
        });
        return boeckliColors;
    }

    calculateUnplayedCards(gameState, allPlayedCards, playedCards) {
        return _.filter(_.filter(this.fullDeck, card => !_.findWhere(allPlayedCards, card)), card => !_.findWhere(playedCards, card));
    }
    
    calculateUnplayedCardsPerColor(unplayedCards) {
        let unplayedCardsPerColor = [];
        _.forEach(COLORS, color => {
            unplayedCardsPerColor.push(_.filter(unplayedCards, card => card.color == color));
        });            
        return unplayedCardsPerColor;
     }

    calculatePlayerWhoCouldNotPlayColor(gameState) {
        let missingColor = [[], [], [], []];

        _.forEach(gameState.stitch, (stitch, key) => {
            let colors = _.map(stitch, s => s.color);
            let myCardIndex = gameState.stitchPlayerPosition[key];

            _.times(3, i => {
                let index = i + 1;
                if (colors[index] !== colors[0]) {
                    if (gameState.currentTrumpfMode === 'UNDEUFE' ||
                        gameState.currentTrumpfMode === 'OBEABE' ||
                        (gameState.currentTrumpfMode === 'TRUMPF' && gameState.currentTrumpfColor !== colors[index])) {
                        if (index === myCardIndex && !_.some(missingColor[MYSELF], c => c === colors[index])) missingColor[MYSELF].push(colors[index]);

                        if (index === myCardIndex + 1 && !_.some(missingColor[RIGHT], c => c === colors[index])) missingColor[RIGHT].push(colors[index]);
                        if (index === myCardIndex - 3 && !_.some(missingColor[RIGHT], c => c === colors[index])) missingColor[RIGHT].push(colors[index]);

                        if (index === myCardIndex + 2 && !_.some(missingColor[PARTNER], c => c === colors[index])) missingColor[PARTNER].push(colors[index]);
                        if (index === myCardIndex - 2 && !_.some(missingColor[PARTNER], c => c === colors[index])) missingColor[PARTNER].push(colors[index]);

                        if (index === myCardIndex + 3 && !_.some(missingColor[LEFT], c => c === colors[index])) missingColor[LEFT].push(colors[index]);
                        if (index === myCardIndex - 1 && !_.some(missingColor[LEFT], c => c === colors[index])) missingColor[LEFT].push(colors[index]);

                        //console.log('player on position ' + index + ' could not färben: ' + colors + '. Trumpf: ' + gameState.currentTrumpfColor + ', stitchKey: ' + key + ', myCardIndex: ' + myCardIndex, colors);
                    }
                }
            });
        });
        return missingColor;
    }

}

module.exports = CardDistributionCalculator;