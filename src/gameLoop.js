/* eslint-disable default-case */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable operator-linebreak */
/* eslint-disable no-const-assign */
const gameBoard = require('./Gameboard');

const gB = gameBoard();
// Player1 Ships

const GameLoop = (() => {
    const player1 = {
        name: null,
        turn: true,
    };

    const computer = {
        name: 'computer',
        turn: false,
    };

    const turnOrderSwitch = 'player1';
    const playerContainer = document.querySelector('.player');
    const compContainer = document.querySelector('.computer');

    function prepareShips(player) {
        switch (true) {
        case player === 'computer':
            gB.randomizedShips('computer');
            break;
        case player !== 'computer':
            player1.name = player;
            gB.randomizedShips(player);
            break;
        }
    }

    function isItMyTurn(player) {
        switch (true) {
        case player !== 'computer':
            return turnOrderSwitch === 'player1' ?
                'it is not your turn' : turnOrderSwitch = 'player1';
        default:
            return turnOrderSwitch === 'computer' ?
                'it is not your turn' : turnOrderSwitch = 'computer';
        }
    }

    return {
        turnOrder: isItMyTurn,
        prepareShips,
    };
})();

// compBoard.stageShipsForCreation(1, 5, 'x');
// playerBoard.stageShipsForCreation(1, 5, 'x');

module.exports = GameLoop;
