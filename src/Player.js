/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-vars */
const gameboard = require('./Gameboard');
const loop = require('./gameLoop');
const print = require('./DOM');

const Gameboard = gameboard();

const Player = (name, board, turn) => {
    const player = {
        name,
        shot: [],
        turn,
    };

    const playerBoard = document.querySelector('.player').childNodes;
    const spaces = Array.from(playerBoard);

    function activatePlayerBoard() {
        spaces.forEach((x) => x.addEventListener('click', (e) => {
            console.log(spaces.indexOf(e.target) + 1);
            aim(spaces.indexOf(e.target) + 1);
        }));
    }

    function turnOrder() {
        // player.turn === true ?
        //     player.turn = false : player.turn = true;
    }

    function shoot(coord) {
        player.shot.push(coord);
        // turnOrder();
        setTimeout(Gameboard.takeAim(coord, 'player1'), 100);
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

    function shipAction(names, funct) {
        print.verifyPlayerID(names, funct);
    }

    return {
        player,
        aim,
        turnOrder,
        shipAction,
        activatePlayerBoard,
    };
};

module.exports = Player;
