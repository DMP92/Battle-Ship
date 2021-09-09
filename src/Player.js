/* eslint-disable no-alert */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable no-case-declarations */
/* eslint-disable no-return-assign */
/* eslint-disable no-console */
/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-vars */
const gameBoard = require('./Gameboard');
const print = require('./DOM');

const gB = gameBoard();

const Player = (name, turn) => {
    this.name = name;
    this.turn = turn;
    const shot = [];

    function clearShotArray() {
        shot.splice(0, shot.length);
    }

    const time = [1400, 1500, 1600, 1350, 1700];

    const computerGrid = document.querySelector('.computer').childNodes;
    const spaces = Array.from(computerGrid);
    const randomize = document.querySelector('.randomize');
    const players = document.querySelector('.player');
    const computers = document.querySelector('.computer');

    function checkStreak(name) {
        return name === 'computer'
            ? gB.shareStreak('computer')
            : gB.shareStreak('player1');
    }

    function randomizeShips(name) {
        gB.randomizedShips(name);
    }

    function notYourTurn() {
        alert(`${name} it is not your turn`);
        
    }

    function turnOrder(index, turn) {
        computers.classList.toggle('activePlayer');
        players.classList.toggle('activePlayer');
        
        aim(name, index);
    }

    function parseIndex(index) {
        let newCoord = [];
        switch (true) {
        case index === 0:
            return newCoord = [0, 0];
        case index < 10:
            return newCoord = [index, 0];
        default:
            const coord = index.toString().split('').reverse().join('');
            const x = coord.substring(0, 1);
            const y = coord.substring(1, 2);
            newCoord.push(parseInt(x, 10));
            newCoord.push(parseInt(y, 10));
            return newCoord;
        }
    }

    function shoot(index) {
        let coord;
        if (index !== undefined) {
            shot.push(index);
            coord = parseIndex(index);
        }
        name === 'computer'
            ? gB.hitOrMiss(name)
            : gB.hitOrMiss('player1', coord);
    }

    // eslint-disable-next-line consistent-return
    function aim(name, index) {
        if (name === 'computer') {
            if (gB.isGameOver() === false) {
                shoot(index);
            }
        } else if (name !== 'computer') {
            shot.includes(index)
                ? 'You already shot this spot'
                : shoot(index);
        }
    }

    function activateComputerGrid() {
        spaces.forEach((x) => x.addEventListener('click', (e) => {
            aim(spaces.indexOf(e.target) + 1);
        }));
    }

    function shipAction(names, funct) {
        print.verifyPlayerID(names, funct);
    }

    return {
        checkStreak,
        randomizeShips,
        aim,
        turnOrder,
        shipAction,
        activateComputerGrid,
        clearShotArray,
    };
};

module.exports = Player;
