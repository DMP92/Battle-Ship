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

    const time = [1400, 1500, 1600, 1350, 1700];

    const computerGrid = document.querySelector('.computer').childNodes;
    const spaces = Array.from(computerGrid);
    const randomize = document.querySelector('.randomize');

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
        console.log(name);
    }

    function turnOrder(index, turn) {
        const turnValidation = turn;
        if (turnValidation === true) {
            aim(name, index);
        } else {
            notYourTurn();
        }
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
        shot.push(index);
        const coord = parseIndex(index);
        name === 'computer'
            ? gB.hitOrMiss(coord, name)
            : gB.hitOrMiss(coord, 'player1');
    }

    function computerPrep() {
        const c = Math.floor(Math.random() * 100);
        return c;
    }
    // eslint-disable-next-line consistent-return
    function aim(name, index) {
        if (name === 'computer') {
            let index = '';
            do {
                index = computerPrep();
            } while (shot.includes(index));
            shot.push(index);
            shoot(index);
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
        computerPrep,
    };
};

module.exports = Player;
