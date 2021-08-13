/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const ShipFactory = require('./shipFactory');
const Gameboard = require('./Gameboard');
const Player = require('./Player');
const Computer = require('./Computer');
const print = require('./DOM');
const loop = require('./gameLoop');

const space = document.querySelectorAll('.space');
space.forEach((s) => s.addEventListener('click', (e) => {
    const spaces = Array.from(space);
    console.log(spaces.indexOf(e.target) + 1);
}));
