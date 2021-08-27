/* eslint-disable prefer-destructuring */
/* eslint-disable default-case */
/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable operator-linebreak */
/* eslint-disable no-console */

// should be a way to track which part of ship was hit, WITHOUT knowing about
// the gameboard functionality

// Creates each ship object
const shipFactory = () => {
    const shipSegments = {
        status: 'afloat',
        size: [],
    };

    // creates the ship, and calls giveCoord() for coordinates
    const createShip = (length) => {
        for (let i = 0; i < length; i += 1) {
            shipSegments.size.push('safe');
        }
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
        const start = ship.coord.start;
        const end = ship.coord.end;

        switch (true) {
        case ship.size.length === 1:
            ship.size.splice(0, 1, 'hit');
            break;
        case start.y === end.y:
            const index = position[0] - start.x;
            ship.size.splice(index, 1, 'hit');
            break;
        case start.x === end.x:
            const indexY = position[1] - start.y;
            ship.size.splice(indexY, 1, 'hit');
            break;
        }

        isSunk(ship);
        return ship;
    };

    return {
        createShip, isHit, isSunk,
    };
};

module.exports = shipFactory;
