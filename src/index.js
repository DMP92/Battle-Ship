/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const ShipFactory = require('./shipFactory');
const Gameboard = require('./Gameboard');
const Player = require('./Player');
const Computer = require('./Computer');
const print = require('./DOM');
const loop = require('./gameLoop');

const game = Gameboard();
const smallShip = Gameboard();
const smallShip2 = Gameboard();
const normalShip = Gameboard();
const medShip = Gameboard();
const largeShip = Gameboard();
const xLargeShip = Gameboard();

const player = Player();
const currentGame = loop;

window.addEventListener('load', () => {
    currentGame.createBoard();

    smallShip.stageShipsForCreation(1, 49, 'x');
    smallShip2.stageShipsForCreation(1, 72, 'x');
    normalShip.stageShipsForCreation(2, 2, 'x');
    medShip.stageShipsForCreation(2, 99, 'x');
    largeShip.stageShipsForCreation(3, 32, 'x');
    xLargeShip.stageShipsForCreation(5, 65, 'x');

    const playerBoard = document.querySelector('.player').childNodes;
    const spaces = Array.from(playerBoard);
    spaces.forEach((space) => space.addEventListener('click', (e) => {
        player.aim(spaces.indexOf(space) + 1);
    }));
});

