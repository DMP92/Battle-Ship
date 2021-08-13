/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable operator-linebreak */
/* eslint-disable no-console */

// Creates each ship object
const ShipFactory = () => {
    const shipSegments = {
        status: 'afloat',
        size: [],
        coord: [],
    };

    // gives coordinates to each ship
    function giveCoord(start, end) {
        for (let i = start; i <= end; i += 1) {
            shipSegments.coord.push(i);
        }
        return shipSegments.coord;
    }

    // creates the ship, and calls giveCoord() for coordinates
    const createShip = (start, end) => {
        for (let i = 0; i <= end - start; i += 1) {
            shipSegments.size
                .push('safe');
        }
        giveCoord(start, end);
        return shipSegments;
    };

    function createShipY(start, end) {
        return {
            start,
            end,
        };
    }

    function determineAxis(start, end, axis) {
        return axis === 'x' ?
            createShip(start, end) :
            createShipY(start, end);
    }
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
        createShip, isHit, isSunk, determineAxis,
    };
};

module.exports = ShipFactory;
