/* eslint-disable no-unused-vars */
const Gameboard = () => {
    const board = {
        size: {
            columns: 0,
            rows: 0,
        },
        grid: [],
    };

    function gridCreate(x) {
        const grid = x * x;
        for (let i = 0; i < grid; i += 1) {
            board.grid
                .push(i + 1);
        }
    }

    function gridSize(x) {
        board.size.columns = x;
        board.size.rows = x;
        gridCreate(x);
        return board;
    }

    return { board, gridSize };
};
const player = Gameboard();
player.gridSize(10);

module.exports = Gameboard;
