/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Gameboard.js":
/*!**************************!*\
  !*** ./src/Gameboard.js ***!
  \**************************/
/***/ ((module) => {

/* eslint-disable no-unused-vars */
const Gameboard = () => {
    const board = {
        size: {
            columns: 0,
            rows: 0,
        },
        grid: [],
    };

    function gridCreate(x) {
        const grid = x * x;
        for (let i = 0; i < grid; i += 1) {
            board.grid
                .push(i + 1);
        }
    }

    function gridSize(x) {
        board.size.columns = x;
        board.size.rows = x;
        gridCreate(x);
        return board;
    }

    return { board, gridSize };
};
const player = Gameboard();
player.gridSize(10);

module.exports = Gameboard;


/***/ }),

/***/ "./src/shipFactory.js":
/*!****************************!*\
  !*** ./src/shipFactory.js ***!
  \****************************/
/***/ ((module) => {

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