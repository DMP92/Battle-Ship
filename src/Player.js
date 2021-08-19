/* eslint-disable no-console */
/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-vars */
const gameBoard = require('./Gameboard');
const loop = require('./gameLoop');
const print = require('./DOM');

const gB = gameBoard();

const Player = (name, turn) => {
    const player = {
        name: '',
        shot: [],
        turn,
        ships: [1, 1, 2, 3, 4, 5],
    };

    const computerGrid = document.querySelector('.computer').childNodes;
    const spaces = Array.from(computerGrid);

    function turnOrder() {
        // player.turn === true ?
        //     player.turn = false : player.turn = true;
    }

    function shoot(coord) {
        player.shot.push(coord);
        // turnOrder();
        setTimeout(gB.takeAim(coord, 'player1'), 100);
    }

    // eslint-disable-next-line consistent-return
    function aim(coord) {
        switch (true) {
        case player.turn === false:
            return 'It is not your turn';
        default:
            return player.shot.includes(coord) ?
                'You already shot this spot' : shoot(coord);
        }
    }

    function activateComputerGrid() {
        spaces.forEach((x) => x.addEventListener('click', (e) => {
            console.log(spaces.indexOf(e.target) + 1);
            aim(spaces.indexOf(e.target) + 1);
        }));
    }

    function shipAction(names, funct) {
        print.verifyPlayerID(names, funct);
    }

    return {
        aim,
        turnOrder,
        shipAction,
        activateComputerGrid,
    };
};

module.exports = Player;
