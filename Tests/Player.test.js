const Player = require('../src/Player');
const Computer = require('../src/Computer');
const Gameboard = require('../src/Gameboard');

// board creation for p1
const game1 = Gameboard();
game1.gridSize(10);
game1.stageShipsForCreation(1, 50, 'x');

// board creation for computer
const game2 = Gameboard();
game2.gridSize(10);
game2.stageShipsForCreation(2, 40, 'x');

const p1 = Player('Devin', game1, true);
const comp = Computer('computer', game2, true);

test('allows the player to take a shot', () => {
    expect(p1.aim(50)).toEqual({
        status: 'sunk!',
        size: ['hit'],
        coord: [50],
    });
});

test('allows computer to shoot', () => {
    expect(comp.aim(50)).toEqual({
        status: 'afloat',
        size: ['hit', 'safe'],
        coord: [50],
    });
});
test('prevents player from reshooting the same spot', () => {
    expect(p1.aim(50)).toEqual('You already shot this spot');
});
// test('allows the user to take a shot', () => {
//     expect(p1.hit(50)).toBe()
// });
test('ensures players cannot go when it is not their turn', () => {
    expect(p1.aim(60)).toEqual('It is not your turn');
});

test('returns computer data', () => {
    expect(comp.player).toEqual({

    });
});
