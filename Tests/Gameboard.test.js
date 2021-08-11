const Gameboard = require('../src/Gameboard');

test('if ship is placed on board', () => {
    const player = Gameboard();
    expect(player.stageShipsForCreation(1, 3, 'x')).toEqual({
        status: 'afloat',
        size: ['safe'],
        coord: [3],
    });
});

test('if ships properly record hits', () => {
    const player = Gameboard();
    player.stageShipsForCreation(2, 1, 'x');
    expect(player.takeAim(2)).toEqual({
        status: 'afloat',
        size: ['safe', 'hit'],
        coord: [1, 2],
    });
});

test('returns miss if no hits were made', () => {
    const smallShip = Gameboard();
    smallShip.stageShipsForCreation(2, 5, 'x');
    expect(smallShip.takeAim(20)).toBe('miss :(');
});

test('properly records which part of the ship was hit', () => {
    const smallShip = Gameboard();
    smallShip.stageShipsForCreation(2, 5);
    smallShip.takeAim(6);
});
