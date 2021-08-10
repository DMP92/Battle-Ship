/* eslint-disable no-console */

// Creates each ship object
const ShipFactory = () => {
    const shipSegments = {
        status: 'afloat',
        size: [],
        position: undefined,
    };

    const createShip = (length) => {
        for (let i = 0; i < length; i += 1) {
            shipSegments.size.push('safe');
        }
        return shipSegments;
    };

    function isSunk() {
        const shipSunk = shipSegments.size.every((x) => x === 'hit');
        const shipStatus = shipSunk ? shipSegments.status = 'sunk!' : false;
        return shipStatus;
    }

    const isHit = (position) => {
        shipSegments.size.splice(position, 1, 'hit');
        isSunk();
        return shipSegments;
    };

    return { createShip, isHit };
};

module.exports = ShipFactory;
