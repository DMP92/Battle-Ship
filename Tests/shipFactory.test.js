const ShipFactory = require('../src/shipFactory');

test('if ship is created as intended', () => {
    const smallShip = ShipFactory();
    expect(smallShip.createShip(1, 3)).toStrictEqual({
        status: 'afloat',
        size: ['safe', 'safe', 'safe'],
        coord: [1, 2, 3],
    });
});
