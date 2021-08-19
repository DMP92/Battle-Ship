/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const ShipFactory = require('./shipFactory');
const Gameboard = require('./Gameboard');
const playerFactory = require('./Player');
const print = require('./DOM');
const loop = require('./gameLoop');

const player1 = playerFactory('Devin', true);
const computer = playerFactory('computer', false);

window.addEventListener('load', () => {
    const compBoard = Gameboard(10, 'computer', { columns: 10, rows: 10 });
    const userBoard = Gameboard(10, 'player', { columns: 10, rows: 10 });

    compBoard.gridSize(10, 'computer');
    userBoard.gridSize(10, 'player1');

    const computerGrid = document.querySelector('.computer').childNodes;
    const spaces = Array.from(computerGrid);
    spaces.forEach((space) => space.addEventListener('click', (e) => {
        player1.aim(spaces.indexOf(space) + 1);
        computer.aim(spaces.includes(space) + 1);
    }));
});
// n + (10 * i) > 100 ? n -= (10 * i) : n;
