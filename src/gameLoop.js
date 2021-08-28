/* eslint-disable no-alert */
/* eslint-disable default-case */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable operator-linebreak */
/* eslint-disable no-const-assign */
const playerFactory = require('./Player');
const gameBoard = require('./Gameboard');

const gB = gameBoard();
// Player1 Ships
const player1 = playerFactory('Devin', true);
const computer = playerFactory('computer', true);
const players = document.querySelector('.player');
const computers = document.querySelector('.computer');

const GameLoop = (() => {
    const user = {
        name: null,
        turn: true,
    };

    const time = [450, 550, 650, 500, 600, 235];
    // conditionals to handle drag ships button
    const dragButton = document.querySelector('.drag');
    const dragShipPanel = document.createElement('div');
    let dragConditional = true;

    // allows both computer and user to randomize their ships
    function prepareShips(player) {
        switch (true) {
        case player === 'computer':
            computer.randomizeShips('computer');
            break;
        case player !== 'computer':
            player1.name = player;
            player1.randomizeShips(player);
            break;
        }
    }

    // function that gets players turn, and upon taking the shoot action, switches it
    function alternateTurn(index) {
        player1.turnOrder(index, user.turn);
    }

    // Function that allows the computer to shoot
    function computerTurn() {
        computers.classList.toggle('activePlayer');
        players.classList.toggle('activePlayer');
        computer.aim('computer');
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

    // FUnction allowing each grid space to be clicked
    function allowGamePlay() {
        const computerGrid = document.querySelector('.computer').childNodes;
        const spaces = Array.from(computerGrid);

        // event listeners for the board that is the target of the user
        spaces.forEach((space) => space.addEventListener('click', (e) => {
            const n = spaces.indexOf(space);
            const randomLengthOfTime = Math.floor(Math.random() * time.length);
            alternateTurn(n);
            if (player1.checkStreak('player1') === false) {
                setTimeout(() => { computerTurn(); }, 600);
            }
            // reimplement a system that ONLY allows users turn if the computer's streak is false
        }));
    }

    // Listens for the drag ships button to be clicked
    dragButton.addEventListener('click', () => {
        dragConditional === true
            ? dragPanel()
            : dragPanelClose();
    });

    // eventListener for randomized play
    const randomizeButton = document.querySelector('.randomize');
    // event listener for the different playstyle buttons'

    // randomize option
    window.addEventListener('load', () => {
        randomizeButton.addEventListener('click', () => {
            prepareShips('player1');
            prepareShips('computer');
            computers.classList.toggle('activePlayer');
            allowGamePlay();
        });
    });

    return {
        prepareShips,
        alternateTurn,
    };
})();

// Player1
const playerOne = gameBoard();

// Computer Ships
const computerPlayer = gameBoard();

// Creates grid on page load
window.addEventListener('load', () => {
    computerPlayer.arrayCreation(10, 10, 'computer');
    playerOne.arrayCreation(10, 10, 'player1');
});

module.exports = GameLoop;
