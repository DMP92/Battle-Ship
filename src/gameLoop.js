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

    // conditionals to handle drag ships button
    const dragButton = document.querySelector('.drag');
    const randomizeButton = document.querySelector('.randomize');
    const dragShipPanel = document.createElement('div');
    let dragConditional = true;

    // will be used for turn order enforcement
    const turnOrderSwitch = 'player1';

    // variables for targeting each grid container
    const playerContainer = document.querySelector('.player');
    const compContainer = document.querySelector('.computer');

    // allows both computer and user to randomize their ships
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

    // function that handles the creation of the ship dragging panel
    function dragPanel() {
        const body = document.querySelector('body');
        dragShipPanel.classList.add('shipContainer');
        body.appendChild(dragShipPanel);
        dragConditional = false;
    }

    // function that handles the deletion of the ship dragging panel
    function dragPanelClose() {
        const body = document.querySelector('body');
        body.removeChild(dragShipPanel);
        dragConditional = true;
    }

    // Listens for the drag ships button to be clicked
    dragButton.addEventListener('click', () => {
        dragConditional === true
            ? dragPanel()
            : dragPanelClose();
    });

    // Listens for the randomize button
    randomizeButton.addEventListener('click', () => {
        prepareShips('computer');
        prepareShips('player1');
        const players = document.querySelector('.player');
        const computers = document.querySelector('.computer');
        gB.reportGrids();
    });

    // will use the above created 'turnOrderSwitch' variable to enforce turn order
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

module.exports = GameLoop;
