const Gameboard = require('../src/Gameboard');

test('if ship is placed on board', () => {
    const player = Gameboard();
    expect(player.stageShipsForCreation(1, 3, 'x')).toEqual({
        status: 'afloat',
        size: ['safe'],
        coord: [3],
    });
});

test('returns miss if no hits were made', () => {
    const smallShip = Gameboard();
    smallShip.stageShipsForCreation(2, 5, 'x');
    expect(smallShip.takeAim(20)).toBe('miss :(');
});

test('properly records which part of the ship was hit', () => {
    const smallShip = Gameboard();
    smallShip.stageShipsForCreation(2, 5, 'x');
    expect(smallShip.takeAim(6)).toEqual({
        status: 'afloat',
        size: ['safe', 'hit'],
        coord: [5, 6],
    });
});

test('if sunken ships are recorded properly', () => {
    const smallShip = Gameboard();
    smallShip.stageShipsForCreation(1, 10, 'x');
    expect(smallShip.takeAim(10)).toEqual({
        status: 'sunk!',
        size: ['hit'],
        coord: [10],
    });
});
