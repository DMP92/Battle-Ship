const Gameboard = require('../src/Gameboard');

const player = Gameboard();

test('if ship is placed on board', () => {
    const greenShip = Gameboard();
    expect(greenShip.stageShipsForCreation(1, 98, 'x')).toEqual({
        status: 'afloat',
        size: ['safe'],
        coord: [98],
    });
});

test('returns miss if no hits were made', () => {
    const tinyBoat = Gameboard();
    tinyBoat.stageShipsForCreation(2, 89, 'x');
    player.takeAim(89, 'player1');
    player.takeAim(98, 'player1');
    expect(player.takeAim(20, 'player1')).toEqual({
        hits: [89, 98],
        misses: [20],
    });
});

test('properly records which part of the ship was hit', () => {
    const smallShip = Gameboard();
    smallShip.stageShipsForCreation(2, 5, 'x');
    player.takeAim(5, 'player1');
    expect(player.takeAim(6, 'player1')).toEqual({
        status: 'sunk!',
        size: ['hit', 'hit'],
        coord: [5, 6],
    });
});

test('if sunken ships are recorded properly', () => {
    const redShip = Gameboard();
    redShip.stageShipsForCreation(1, 99, 'x');
    expect(player.takeAim(99, 'player1')).toEqual({
        status: 'sunk!',
        size: ['hit'],
        coord: [99],
    });
});

test('keeps track of all missed shots', () => {
    const blueShip = Gameboard();
    blueShip.stageShipsForCreation(1, 17, 'x');
    player.takeAim(17, 'player1');
    expect(player.takeAim(55, 'player1')).toEqual({
        misses: [20, 55],
        hits: [89, 98, 5, 6, 99, 17],
    });
});

test('if ship number is calculated', () => {
    const cleanSlate = Gameboard();
    cleanSlate.stageShipsForCreation(1, 3, 'x');
    player.takeAim(3, 'player1');
    expect(cleanSlate.countShips()).toEqual({
        playerShips: 6,
        status: [
            'sunk!', // 3
            'sunk!', // 5, 6
            'sunk!', // 17
            'afloat', // 89. 90
            'sunk!', // 98
            'sunk!', // 99
        ],
    });
});

test('returns when all ships have sunk', () => {
    player.takeAim(90, 'player1');
    expect(player.isShipStillFloating({ status: 'test' })).toBe('Your fleet has been lost!');
});
