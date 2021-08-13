/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Computer.js":
/*!*************************!*\
  !*** ./src/Computer.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Player = __webpack_require__(/*! ./Player */ "./src/Player.js");

const Computer = (name, board, turn) => {
    const { player, aim, turnOrder } = Player(name, board, turn);

    return {
        player,
        aim,
        turnOrder,
    };
};

module.exports = Computer;


/***/ }),

/***/ "./src/DOM.js":
/*!********************!*\
  !*** ./src/DOM.js ***!
  \********************/
/***/ ((module) => {

const printToDOM = (() => {
    const playerContainer = document.querySelector('.player');
    const compContainer = document.querySelector('.computer');


    function appendSpaces(player) {
        switch (true) {
        case player === 'computer':
            const compSpaces = document.createElement('div');
            compSpaces.classList.add('compSpace');
            compContainer.appendChild(compSpaces);
            break;
        default:
            const playerSpaces = document.createElement('div');
            playerSpaces.classList.add('space');
            playerContainer.appendChild(playerSpaces);
        }
    }

    function placeShip(player) {
        console.log(`${player} is sucessfull`);
    }
    function personOrComputer(player, func) {
        console.log(player, func);
        return func;
    }

    function playerGrid(grid) {
        console.log(grid);
    }

    // function indicate(position, action) {
    //     const leftPosition = position - 2;
    //     const rightPosition = position;
    //     const topPosition = position - 11;
    //     const bottomPosition = position + 9;
    //     const color = "box-shadow: inset 0px 0px 3px white; background-color: white;";

    //     if (action === 'hit') {
    //         playerContainer.children[leftPosition].style.cssText = `${color}`;
    //         playerContainer.children[rightPosition].style.cssText = `${color}`;
    //         playerContainer.children[topPosition].style.cssText = `${color}`;
    //         playerContainer.children[bottomPosition].style.cssText = `${color}`;
    //     }
    // }

    function trackPlays(position, action) {
        console.log(position);
        action === 'hit' ?
            playerContainer.children[position - 1].style.cssText = "background-color: black; box-shadow: inset 0px 0px 1px grey" :
            playerContainer.children[position - 1].style.cssText = "background-color: aquamarine; box-shadow: inset 0px 0px 1px blue";
        // indicate(position, action);
    }

    return {
        spaces: appendSpaces,
        verifyPlayerID: personOrComputer,
        placeShip,
        plays: trackPlays,
        playerGrid,
    };
})();

module.exports = printToDOM;


/***/ }),

/***/ "./src/Gameboard.js":
/*!**************************!*\
  !*** ./src/Gameboard.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
/* eslint-disable default-case */
/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-expressions */
/* eslint-disable operator-linebreak */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-console */
const DOM = __webpack_require__(/*! ./DOM */ "./src/DOM.js");
const shipFactory = __webpack_require__(/*! ./shipFactory */ "./src/shipFactory.js");

const print = DOM;

// Contains all required info about the board the game exists in
const board = {
    player1: { 
        size: {
            columns: 0,
            rows: 0,
        },
        ships: [6],
        grid: [],
    },

    computer: {
        size: {
            columns: 0,
            rows: 0,
        },
        ships: [6],
        grid: [],
    },
};

// tracks each hit && miss of all players
const playerLog = {
    player1: {
        misses: [],
        hits: [],
    },
    computer: {
        misses: [],
        hits: [],
    },
};
/* eslint-disable no-unused-vars */
const Gameboard = () => {
    // Creates an instance of shipFactory once here
    const players = shipFactory();

    const user = playerLog.player1;
    const comp = playerLog.computer;

    let totalShips = 6;

    // Creates the game grid itself
    function gridCreate(x, player) {
        const grid = x * x;
        for (let i = 0; i < grid; i += 1) {
            board.player1.grid
                .push(i + 1);
            player === 'computer' ?
                print.spaces('computer') : print.spaces('player1');
        }
        return board.player1.grid;
    }

    // Allows the grid to adjust according to the number given
    function gridSize(x, player) {
        board.player1.size.columns = x;
        board.player1.size.rows = x;
        gridCreate(x, player);
        return board;
    }

    // Grabs the status of each ship on the board
    function statusOfShips() {
        const grids = board.player1.grid;
        const gridContain = [];
        grids.forEach((x) => {
            x.status ? gridContain.push(x) : 'run';
        });
        return gridContain;
    }

    // tallies up each ship left afloat
    function countShips() {
        let currentShip = null;
        const ships = statusOfShips();
        const total = {
            playerShips: null,
            status: [],
        };
        const graph = ships.map((a) => a.coord);
        const status = ships.map((a) => a.status);
        
        for (let i = 0; i < graph.length; i += 1) {
            if (graph[i] !== currentShip) {
                currentShip = graph[i];
                total.status.push(status[i]);
                total.playerShips += 1;
            }
        }
        console.log(ships);
        return total;
    }

    // Logs activties of each player (misses / hits)
    function trackPlays(position, player, action) {
        switch (true) {
        case player === 'player1':
            action === 'hit' ? user.hits.push(position) : user.misses.push(position);
            print.plays(position, action);
            return user;
        case player === 'computer':
            action === 'hit' ? comp.hits.push(position) : comp.misses.push(position);
            return comp;
        }
    }

    function isShipStillFloating(ship) {
        const shipsLeft = board.player1.ships;
        ship.status === 'sunk!' ? 
            totalShips -= 1 : totalShips += 0;
        return totalShips === 0 ? 
            shipsLeft[0] = 'Your fleet has been lost!' : 
            shipsLeft[0] = `${totalShips} of 6 ships remain!`;
    }

    // Records which ship was hit where
    function hit(ship, position, player) {
        // return 
        const newShip = players.isHit(ship, position);
        isShipStillFloating(newShip);
        trackPlays(position, player, 'hit');
        print.plays(position, 'hit');
        return newShip;
    }

    // Allows the user and computer to take a shot
    function takeAim(position, player) {
        console.log(position);
        const newPosition = position - 1;
        const ship = board.player1.grid[newPosition];
        console.log(typeof board.player1.grid[newPosition] === 'number' ? 
            trackPlays(position, player, 'miss') : hit(ship, position, player));
    }

    // Creates a ship and places it on the board
    function createShip(start, end, axis) {
        const ship = players.determineAxis(start, end, axis);
        for (let i = 0; i <= (end - start); i += 1) {
            board.player1.grid
                .splice((start - 1) + i, 1, ship);
        }
        return ship;
    }

    // Parses info given that will then be used to create a ship
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

    return {
        gridSize, 
        stageShipsForCreation, 
        hit, 
        takeAim, 
        statusOfShips, 
        countShips, 
        isShipStillFloating,
    };
};

// const playerSmall = Gameboard();
// const playerSmall2 = Gameboard();
// const playerSmall3 = Gameboard();
// const playerMed = Gameboard();
// const playerLarge = Gameboard();
// const playerXLarge = Gameboard();

// playerSmall.stageShipsForCreation(1, 3, 'x');
// playerSmall2.stageShipsForCreation(1, 70, 'x');
// playerSmall3.stageShipsForCreation(1, 5, 'x');
// playerMed.stageShipsForCreation(2, 50, 'x');
// playerLarge.stageShipsForCreation(4, 90, 'x');
// playerXLarge.stageShipsForCreation(5, 25, 'x');

// const play = Gameboard();
// play.takeAim(25);
// play.takeAim(26);
// play.takeAim(27);
// play.takeAim(28);
// play.takeAim(29);
// play.takeAim(70);
// play.takeAim(50);
// play.takeAim(51);
// play.takeAim(5);
// play.takeAim(90);
// play.takeAim(91);
// play.takeAim(92);
// play.takeAim(93);
// play.takeAim(3);
// play.statusOfShips();
// playerXLarge.countShips();

module.exports = Gameboard;


/***/ }),

/***/ "./src/Player.js":
/*!***********************!*\
  !*** ./src/Player.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-vars */
const gameboard = __webpack_require__(/*! ./Gameboard */ "./src/Gameboard.js");
const loop = __webpack_require__(/*! ./gameLoop */ "./src/gameLoop.js");
const print = __webpack_require__(/*! ./DOM */ "./src/DOM.js");

const Gameboard = gameboard();

const Player = (name, board, turn) => {
    const player = {
        name,
        shot: [],
        turn,
    };

    const playerBoard = document.querySelector('.player').childNodes;
    const spaces = Array.from(playerBoard);

    function activatePlayerBoard() {
        spaces.forEach((x) => x.addEventListener('click', (e) => {
            console.log(spaces.indexOf(e.target) + 1);
            aim(spaces.indexOf(e.target) + 1);
        }));
    }

    function turnOrder() {
        // player.turn === true ?
        //     player.turn = false : player.turn = true;
    }

    function shoot(coord) {
        player.shot.push(coord);
        // turnOrder();
        setTimeout(Gameboard.takeAim(coord, 'player1'), 100);
    }

    // eslint-disable-next-line consistent-return
    function aim(coord) {
        switch (true) {
        case player.turn === false:
            return 'It is not your turn';
        default:
            return player.shot.includes(coord) ?
                'You already shot this spot' : shoot(coord);
        }
    }

    function shipAction(names, funct) {
        print.verifyPlayerID(names, funct);
    }

    return {
        player,
        aim,
        turnOrder,
        shipAction,
        activatePlayerBoard,
    };
};

module.exports = Player;


/***/ }),

/***/ "./src/gameLoop.js":
/*!*************************!*\
  !*** ./src/gameLoop.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable operator-linebreak */
/* eslint-disable no-const-assign */
const Gameboard = __webpack_require__(/*! ./Gameboard */ "./src/Gameboard.js");

const GameLoop = (() => {
    const turnOrderSwitch = 'player1';
    const playerContainer = document.querySelector('.player');
    const compContainer = document.querySelector('.computer');

    // Creates both player and computer boards
    function createBoard() {
        const playerBoard = Gameboard();
        const compBoard = Gameboard();
        playerBoard.gridSize(10, 'player1');
        compBoard.gridSize(10, 'computer');
    }

    function placeShips(player) {
        console.log(player);
    }

    function isItMyTurn(name) {
        switch (true) {
        case name !== 'computer':
            return turnOrderSwitch === 'player1' ?
                'it is not your turn' : turnOrderSwitch = 'player1';
        default:
            return turnOrderSwitch === 'computer' ?
                'it is not your turn' : turnOrderSwitch = 'computer';
        }
    }

    return {
        turnOrder: isItMyTurn,
        createBoard,
        placeShips,
    };
})();

// compBoard.stageShipsForCreation(1, 5, 'x');
// playerBoard.stageShipsForCreation(1, 5, 'x');

module.exports = GameLoop;


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
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const ShipFactory = __webpack_require__(/*! ./shipFactory */ "./src/shipFactory.js");
const Gameboard = __webpack_require__(/*! ./Gameboard */ "./src/Gameboard.js");
const Player = __webpack_require__(/*! ./Player */ "./src/Player.js");
const Computer = __webpack_require__(/*! ./Computer */ "./src/Computer.js");
const print = __webpack_require__(/*! ./DOM */ "./src/DOM.js");
const loop = __webpack_require__(/*! ./gameLoop */ "./src/gameLoop.js");

const game = Gameboard();
const smallShip = Gameboard();
const smallShip2 = Gameboard();
const normalShip = Gameboard();
const medShip = Gameboard();
const largeShip = Gameboard();
const xLargeShip = Gameboard();

const player = Player();
const currentGame = loop;

window.addEventListener('load', () => {
    currentGame.createBoard();

    smallShip.stageShipsForCreation(1, 49, 'x');
    smallShip2.stageShipsForCreation(1, 72, 'x');
    normalShip.stageShipsForCreation(2, 2, 'x');
    medShip.stageShipsForCreation(2, 99, 'x');
    largeShip.stageShipsForCreation(3, 32, 'x');
    xLargeShip.stageShipsForCreation(5, 65, 'x');

    const playerBoard = document.querySelector('.player').childNodes;
    const spaces = Array.from(playerBoard);
    spaces.forEach((space) => space.addEventListener('click', (e) => {
        player.aim(spaces.indexOf(space) + 1);
    }));
});


})();

/******/ })()
;
//# sourceMappingURL=main.js.map