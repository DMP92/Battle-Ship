const ShipFactory = require('../src/shipFactory');

test('if ship is created as intended', () => {
    const smallShip = ShipFactory();
    expect(smallShip.createShip(3)).toStrictEqual({
        position: undefined,
        status: 'afloat',
        size: ['safe', 'safe', 'safe'],
    });
});
test('if hit registers', () => {
    const smallShip = ShipFactory();
    smallShip.createShip(3);
    expect(smallShip.isHit(0)).toStrictEqual({
        position: undefined,
        status: 'afloat',
        size: ['hit', 'safe', 'safe'],
    });
});
test('if the boat sinks when all spaces are hit', () => {
    const smallShip = ShipFactory();
    smallShip.createShip(1);
    expect(smallShip.isHit(0)).toStrictEqual({
        position: undefined,
        status: 'sunk!',
        size: ['hit'],
    });
});
