/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable operator-linebreak */
/* eslint-disable no-console */

// Creates each ship object
const shipFactory = (ships) => {
    const shipSegments = {
        status: 'afloat',
        size: [],
        coord: [],
    };

    // gives coordinates to each ship
    function giveCoord(ship) {
        shipSegments.coord.push(ship);
        return shipSegments.coord;
    }

    // creates the ship, and calls giveCoord() for coordinates
    const createShip = (ship) => {
        ship.forEach((space) => {
            shipSegments.size.push('safe');
        });
        giveCoord(ship);
        return shipSegments;
    };

    // function that is called once all ship positions are hit
    function isSunk(ship) {
        const shipSunk = ship.size.every((x) => x === 'hit');
        const shipStatus = shipSunk ? ship.status = 'sunk!' : false;
        return shipStatus;
    }

    // function for recording each hit on ships
    const isHit = (ship, position) => {
        const chosenPosition = ship.coord;
        // eslint-disable-next-line no-unused-expressions
        if (chosenPosition.includes(position)) {
            ship.coord.forEach((x) => {
                const index = ship.coord.indexOf(x);
                x === position ?
                    ship.size.splice(index, 1, 'hit') :
                    undefined;
            });
        }
        isSunk(ship);
        return ship;
    };

    return {
        createShip, isHit, isSunk,
    };
};

module.exports = shipFactory;
