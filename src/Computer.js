const Player = require('./Player');

const Computer = (name, board, turn) => {
    const { player, aim, turnOrder } = Player(name, board, turn);

    return {
        player,
        aim,
        turnOrder,
    };
};

module.exports = Computer;
