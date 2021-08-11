/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Gameboard.js":
/*!**************************!*\
  !*** ./src/Gameboard.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable default-case */
/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-expressions */
/* eslint-disable operator-linebreak */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-console */
const shipFactory = __webpack_require__(/*! ./shipFactory */ "./src/shipFactory.js");

// contains all required info about the board the game exists in
const board = {
    size: {
        columns: 0,
        rows: 0,
    },
    grid: [],
};
/* eslint-disable no-unused-vars */
const Gameboard = () => {
    // creates a shipFactory once here so it isn't done repeatedly throughout 
    // this factory function
    const players = shipFactory();

    // creates the game grid itself
    function gridCreate(x) {
        const grid = x * x;
        for (let i = 0; i < grid; i += 1) {
            board.grid
                .push(i + 1);
        }
        return board.grid;
    }

    // allows the grid to adjust according to the number given
    function gridSize(x) {
        board.size.columns = x;
        board.size.rows = x;
        gridCreate(x);
        return board;
    }

    // records which ship was hit where
    function hit(ship, position) {
        return players.isHit(ship, position);
    }

    // allows the user and computer to take a shot
    function takeAim(position) {
        const ship = board.grid[position];
        return typeof board.grid[position] === 'number' ? 
            'miss :(' :
            hit(ship, position);
    }

    // creates a ship and places it on the board
    function createShip(start, end, axis) {
        const ship = players.determineAxis(start, end, axis);
        for (let i = 0; i <= end - start; i += 1) {
            board.grid
                .splice(start + i, 1, ship);
        }
        return ship;
    }

    // parses info given that will then be used to create a ship
    function stageShipsForCreation(length, position, axis) {
        const start = position;
        const end = position + length - 1;
        switch (true) {
        case axis === 'x':
            return createShip(start, end, axis);
        case axis === 'y':
            return createShip(start, end, axis);
        }
    }

    // grabs the status of each ship on the board
    function countShips() {
        board.grid.forEach((x) => {
            x.status === 'afloat' ? 
                x :
                x;
        });
        console.log();
        console.log(board.grid);
    }

    return {
        gridSize, stageShipsForCreation, hit, takeAim, countShips,
    };
};

const boardCreation = Gameboard();
boardCreation.gridSize(10);

const playerSmall = Gameboard();
const playerSmall2 = Gameboard();
const playerSmall3 = Gameboard();
const playerMed = Gameboard();
const playerLarge = Gameboard();
const playerXLarge = Gameboard();

console.log(playerSmall.stageShipsForCreation(1, 3, 'x'));
playerSmall2.stageShipsForCreation(1, 70, 'x');
playerSmall3.stageShipsForCreation(1, 5, 'x');
playerMed.stageShipsForCreation(2, 50, 'x');
playerLarge.stageShipsForCreation(4, 90, 'x');
playerXLarge.stageShipsForCreation(5, 25, 'x');

const play = Gameboard();
play.takeAim(25);
play.takeAim(26);
play.takeAim(27);
play.takeAim(28);
play.takeAim(29);
play.countShips();

module.exports = Gameboard;


/***/ }),

/***/ "./src/shipFactory.js":
/*!****************************!*\
  !*** ./src/shipFactory.js ***!
  \****************************/
/***/ ((module) => {

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
                return x === position ?
                    ship.size.splice(index, 1, 'hit') :
                    undefined;
            });
        }
        return ship;
    };

    return {
        createShip, isHit, isSunk, determineAxis,
    };
};

module.exports = ShipFactory;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/* eslint-disable no-unused-vars */
const ShipFactory = __webpack_require__(/*! ./shipFactory */ "./src/shipFactory.js");
const Gameboard = __webpack_require__(/*! ./Gameboard */ "./src/Gameboard.js");

})();

/******/ })()
;
//# sourceMappingURL=main.js.map