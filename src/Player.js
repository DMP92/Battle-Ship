/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-vars */
const gameboard = require('./Gameboard');
const loop = require('./gameLoop');
const print = require('./DOM');

const Player = (name, board, turn) => {
    const player = {
        name,
        shot: [],
        turn,
    };

    function turnOrder() {
        // player.turn === true ?
        //     player.turn = false : player.turn = true;
    }

    function shoot(coord) {
        player.shot.push(coord);
        turnOrder();
        return board.takeAim(coord);
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
    };
};

const run = Player();

module.exports = Player;
