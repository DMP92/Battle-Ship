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

    compBoard.arrayCreation(10, 10, 'computer');
    userBoard.arrayCreation(10, 10, 'player1');

    const computerGrid = document.querySelector('.computer').childNodes;
    const spaces = Array.from(computerGrid);
    spaces.forEach((space) => space.addEventListener('click', (e) => {
        const n = spaces.indexOf(space);
        player1.aim(reverseNum(n));
        computer.aim(reverseNum(n));
    }));
});

function reverseNum(n) {
    switch (true) {
    case n / 10 < 1:
        return (n * 10).toString().split('');
    case n % 10 === 0:
        return 0;
    default:
        return n.toString().split('').reverse();
    }
}
// n + (10 * i) > 100 ? n -= (10 * i) : n;
