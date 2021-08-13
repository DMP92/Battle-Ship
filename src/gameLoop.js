/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable operator-linebreak */
/* eslint-disable no-const-assign */
const Gameboard = require('./Gameboard');

const GameLoop = (() => {
    const turnOrderSwitch = 'player1';
    const playerContainer = document.querySelector('.player');
    const compContainer = document.querySelector('.computer');

    // Creates both player and computer boards
    function createBoard() {
        const playerBoard = Gameboard();
        const compBoard = Gameboard();
        playerBoard.gridSize(10, 'player1');
        compBoard.gridSize(10, 'computer');
    }

    function placeShips(player) {
        console.log(player);
    }

    function isItMyTurn(name) {
        switch (true) {
        case name !== 'computer':
            return turnOrderSwitch === 'player1' ?
                'it is not your turn' : turnOrderSwitch = 'player1';
        default:
            return turnOrderSwitch === 'computer' ?
                'it is not your turn' : turnOrderSwitch = 'computer';
        }
    }

    return {
        turnOrder: isItMyTurn,
        createBoard,
        placeShips,
    };
})();

const currentGame = GameLoop;
window.addEventListener('load', currentGame.createBoard);

// compBoard.stageShipsForCreation(1, 5, 'x');
// playerBoard.stageShipsForCreation(1, 5, 'x');

module.exports = GameLoop;
