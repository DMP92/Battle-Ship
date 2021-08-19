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
    const isHit = (ship, position, target) => {
        const chosenPosition = ship.coord;
        console.log(ship);
        const shipSpots = ship.coord[0];
        console.log(ship.coord, shipSpots);
        // eslint-disable-next-line no-unused-expressions
        shipSpots.forEach((x) => {
            const index = shipSpots.indexOf(position - 1);
            console.log(index, index, index, index, index);
            x === position - 1
                ? ship.size.splice(index, 1, 'hit')
                : '';
        });
        isSunk(ship);
        return ship;
    };

    return {
        createShip, isHit, isSunk,
    };
};

module.exports = shipFactory;
