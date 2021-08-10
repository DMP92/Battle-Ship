const Gameboard = require('../src/Gameboard');

test('demonstrates structure of board object', () => {
    const playerBoard = Gameboard();
    expect(playerBoard.board).toEqual({
        size: {
            columns: 0,
            rows: 0,
        },
        grid: [],
    });
});
test('if Gameboard properly adds grid', () => {
    const player = Gameboard();
    expect(player.gridSize(2)).toEqual({
        size: {
            columns: 2,
            rows: 2,
        },
        grid: [1, 2, 3, 4],
    });
});
