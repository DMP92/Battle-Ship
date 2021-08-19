/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOM.js":
/*!********************!*\
  !*** ./src/DOM.js ***!
  \********************/
/***/ ((module) => {

/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
/* eslint-disable no-console */
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
    function playerShipColor(positions) {
        positions.forEach((a) => {
            playerContainer.children[a].style.cssText = 'background-color: aquamarine; box-shadow: inset 0px 0px 1px black'; // #FFA826
        });
    }

    function trackPlays(position, action) {
        console.log(position);
        // eslint-disable-next-line no-unused-expressions
        action === 'hit'
            ? compContainer.children[position - 1].style.cssText = 'background-color: aquamarine; box-shadow: inset 0px 0px 1px black' // #FFA826
            : compContainer.children[position - 1].style.cssText = 'background-color: rgb(197, 197, 197); box-shadow: inset 0px 0px 1px rgba(0, 0, 0, 0.5)';
        // indicate(position, action);
    }

    return {
        spaces: appendSpaces,
        verifyPlayerID: personOrComputer,
        placeShip,
        plays: trackPlays,
        playerGrid,
        playerShipColor,
    };
})();

module.exports = printToDOM;


/***/ }),

/***/ "./src/Gameboard.js":
/*!**************************!*\
  !*** ./src/Gameboard.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable no-cond-assign */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-computed-key */
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

const print = __webpack_require__(/*! ./DOM */ "./src/DOM.js");
const shipFactory = __webpack_require__(/*! ./shipFactory */ "./src/shipFactory.js");

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

// Contains all required info about the board the game exists in
const board = {
    ['player1']: { 
        name: '',
        size: {
            columns: 0,
            rows: 0,
        },
        ships: [6],
        grid: [],
        taken: [],
        turn: true,
    },

    ['computer']: {
        name: 'computer',
        size: {
            columns: 0,
            rows: 0,
        },
        ships: [6],
        grid: [],
        taken: [],
        turn: false,
    },
};

/* eslint-disable no-unused-vars */
const gameBoard = (name) => {
    // Creates an instance of shipFactory once here
    const players = shipFactory();
    const user = playerLog.player1;
    const comp = playerLog.computer;

    let totalShips = 6;

    // Creates the game grid itself
    function gridCreate(x, player) {
        const grid = x * x;
        for (let i = 0; i < grid; i += 1) {
            board[player].grid
                .push(i + 1);
            player === 'computer' ?
                print.spaces('computer') : print.spaces('player1');
        }
        return board.player1.grid;
    }

    // Allows the grid to adjust according to the number given
    function gridSize(x, player) {
        board[player].name = player;
        player1.name = player;
        board[player].size = { columns: x, rows: x };
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

    // checks that the ship that was hit is still floating -- if not, it is subtracted from total remaining ships
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
        const newPosition = position - 1;
        const ship = board.computer.grid[newPosition];
        console.log(typeof board.computer.grid[newPosition] === 'number' ? 
            trackPlays(position, player, 'miss') : hit(ship, position, player));
    }

    function createPlayerShip(ships, newShip) {
        ships.forEach((space) => {
            const index = ships.indexOf(space);
            board.player1.grid
                .splice(ships[index], 1, newShip);
        });
    }

    function createComputerShips(ships, newShip) {
        ships.forEach((space) => {
            const index = ships.indexOf(space);
            board.computer.grid
                .splice(ships[index], 1, newShip);
        });
        const takenSpaces = board.computer.grid.filter((a) => typeof a === 'object');
        takenSpaces.forEach((a) => {
        });
    }
    // Creates a ship and places it on the board
    function createShip(ships, axis, player, i) {
        let playerBoard = '';
        let newShip = '';
        let situation = true;
        player.name === 'computer' ? playerBoard = board.computer : playerBoard = board.player1;
        ships.forEach((a) => {
            if (typeof playerBoard.grid[a - 1] === 'object') {
                situation = false;
            } 
        });
        if (situation === true) {
            newShip = players.createShip(ships);
            player.name === 'computer' 
                ? createComputerShips(ships, newShip)
                : createPlayerShip(ships, newShip); 
        } 
    }

    function prepareShipForCreation(length, position, axis, player, k) {
        let ship = [];    
        let playerBoard = '';
        player.name === 'computer' ? playerBoard = board.computer : playerBoard = board.player1;
        switch (true) {
        case axis === 'x':
            ship = [];
            for (let i = 0; i < length; i += 1) {
                ship.push(i === 0 ? position : position += 1);
                playerBoard.taken.push(position);
                // Marks spaces around each chosen grid space
                // playerBoard.grid[position] > 0 && typeof playerBoard.grid[position] === 'number' 
                //     ? playerBoard.grid.splice(position - 1, 1, `${position} speed before`) 
                //     : '';
                // playerBoard.grid[position + length + 10] < 100 && typeof playerBoard.grid[position + length + 10] === 'number' &&
                // playerBoard.grid[position + length + 10] > 0
                //     ? playerBoard.grid.splice(position + length - 1, 1, `${position + length - 2} speed after line 216`) 
                //     : '';
                // playerBoard.grid[position - 10] > 0 && typeof playerBoard.grid[position - 10] === 'number' 
                //     ? playerBoard.grid.splice(position - 10, 1, `${position} speed - 10`) 
                //     : '';
                // playerBoard.grid[position + 10] < 100 && typeof playerBoard.grid[position + 10] === 'number' 
                //     ? playerBoard.grid.splice(position + 10, 1, `${position} speed + 10`) 
                //     : '';
            }
            break;
        case axis === 'y':
            ship = [];
            for (let i = 0; i < length; i += 1) {
                // ship.push(i === 0 ? position : position += 10);
                // // Marks spaces around each chosen grid space
                // playerBoard.grid[position + length + 10] < 99 && typeof playerBoard.grid[position + length + 10] === 'number' 
                //     ? playerBoard.grid.splice(position + length, 1, `${position + length - 1} speed after`) 
                //     : '';
                // playerBoard.grid[position] > 0 && typeof playerBoard.grid[position] === 'number' 
                //     ? playerBoard.grid.splice(position - 1, 1, `${position} speed before`) 
                //     : '';
                playerBoard.taken.push(i === 0 ? position : position += 10);
                ship.push(i === 0 ? position += 0 : position);
                // playerBoard.grid[position - 1] > 0 && typeof playerBoard.grid[position - 1] === 'number' 
                //     ? playerBoard.grid.splice(position - 1, 1, `${position} speed - 1`) 
                //     : '';
                // playerBoard.grid[position + 1] < 100 && typeof playerBoard.grid[position + 1] === 'number' 
                //     ? playerBoard.grid.splice(position + 1, 1, `${position} speed + 1`) 
                //     : '';
                // playerBoard.grid[position - 10] > 0 && typeof playerBoard.grid[position - 10] === 'number'
                //     ? playerBoard.grid.splice(position - 10, 1, `${position} speed before`)
                //     : '';
                // playerBoard.grid[position + length + 10] < 100 && typeof playerBoard.grid[position + length + 10] === 'number'
                //     ? playerBoard.grid.splice(position + length + 10, 1, `${position + length + 10} speed after`)
                //     : '';
            }
            break;
        }
        // add an 'if number exists in playerboard.taken[] then fetch a new number' conditional
        createShip(ship, axis, player, k);
    }  

    function repositionShip(ship, player, axis, i) {
        const newShip = [];
        const random = Math.floor(Math.random() * 100);
        switch (true) {
        case axis === 'x':
            gatherShipMaterials(ship.length, player, 'x', i);
            break;
        case axis === 'y':
            gatherShipMaterials(ship.length, player, 'y', i);
            break;
        }
    }
    
    function simpleNumberGeneration(playerBoard, axis, i) {
        const filteredGrid = playerBoard.grid.filter((a) => typeof a !== 'object');
        const m = filteredGrid.length;
        const n = filteredGrid[Math.floor(Math.random() * m)];
        return axis === 'x'
            ? xPrep(n, i)
            : yPrep(n, i);
    }

    function yPrep(n, i) {
        const total = n + (10 * i);
        n + (10 * i) > 100 ? n -= total - 100 : n;
        return n;
    }

    function xPrep(n, i) {
        // // 9 + 5
        // const sum = n + i;
        // // 9 / 10
        // const newNum = Math.floor((n / 10));
        // const diff = Math.floor((newNum * 10) / 9);
        // newNum === 0 ? newNum + 10 : newNum * 10;
        // sum > diff
        //     ? n -= (n + i - diff)
        //     : (newNum * 10) + 9;
        //     console.log(n, 'X', i);
        const total = n + i;
        total > 100 
            ? n -= n - i
            : n;
        total > Math.floor((n / 10)) * 10 + 9
            ? n -= i 
            : n;
        console.log(n, i, 'x');
        return n;
    }

    function gridVerification(playerBoard, i, n, axis) {
        switch (true) {
        case axis === 'x':
            for (let z = 0; z < i; z += 1) {
                // typeof playerBoard.grid[n] === 'object' && n <= 100
                //     ? console.log('yes, object')
                //     : console.log('no, number');
                n += 1;
            }
            break;
        case axis === 'y':
            for (let z = 0; z < i; z += 1) {
                typeof playerBoard.grid[n] === 'object' && n <= 100
                    ? console.log('yes, object Y')
                    : console.log('no, number Y');
                console.log(playerBoard.grid[n], n);
                n += 10;
            }
        }
    }
    // Generates a number, and ensures all ships keep inside of the grid
    function randomNumberGeneration(axis, i, player) {
        let playerBoard = '';
        player === 'computer' ? playerBoard = board.computer : playerBoard = board.player1;

        const n = simpleNumberGeneration(playerBoard, axis, i);
        // axis === 'y' 
        //     ? gridVerification(playerBoard, i, n, axis)
        //     : gridVerification(playerBoard, i, n, axis);
        // Conditional that ensures each ship will display within the grid
        return n;
    }
           
    function randomAxisGeneration(ship, player) {
        let axis = Math.floor(Math.random() * 2);
        axis === 0 
            ? axis = 'x' 
            : axis = 'y';
        return axis;
    }

    // Crutial step that gathers needed info for proper placement of ships
    function gatherShipMaterials(shipLength, player, axis, i) {
        prepareShipForCreation(shipLength, randomNumberGeneration(axis, shipLength, player), axis, player, i);
        console.log(i);
    }

    // Functionality for randomizing and placing computer ships
    function randomizedShips(player) {
        // eslint-disable-next-line no-unused-expressions
        player === 'computer' ? player = computer : player = player1;
        let i = 0;
        player.shipNames.forEach((names) => {
            // playergatherShipMaterials(ship, player, randomAxisGeneration(player.shipsLength[i], player), i);
            names.gatherShipMaterials(player.shipsLength[i], player, randomAxisGeneration(player.shipsLength[i], player), i);
            i += 1;
        });
        const colorMyGrid = board.player1.taken;
        print.playerShipColor(colorMyGrid);
    }

    function reportGrids() {
        console.log('Computer:', board.computer.grid);
        console.log('Player 1:', board.player1.grid);
    }

    return {
        gridSize, 
        // stageShipsForCreation, 
        hit, 
        takeAim, 
        statusOfShips, 
        countShips, 
        isShipStillFloating,
        // gridSpaceVerification,
        prepareShipForCreation,
        randomizedShips,
        gatherShipMaterials,
        reportGrids,
    };
};

// Player1 Ships
const pShip1 = gameBoard();
const pShip2 = gameBoard();
const pShip3 = gameBoard();
const pShip4 = gameBoard();
const pShip5 = gameBoard();
const pShip6 = gameBoard();

// Computer Ships
const cShip1 = gameBoard();
const cShip2 = gameBoard();
const cShip3 = gameBoard();
const cShip4 = gameBoard();
const cShip5 = gameBoard();
const cShip6 = gameBoard();

const computer = {
    name: 'computer',
    shipCoord: [],
    shipsLength: [5, 4, 3, 2, 1, 1],
    shipNames: [cShip1, cShip2, cShip3, cShip4, cShip5, cShip6],
};

const player1 = {
    name: '',
    shipCoord: [],
    shipsLength: [5, 4, 3, 2, 1, 1],
    shipNames: [pShip1, pShip2, pShip3, pShip4, pShip5, pShip6],
};

// // Parses info given that will then be used to create a ship
// function stageShipsForCreation(ship, axis, playerName) {
//     switch (true) {
//     case axis === 'x': 
//         return createShip(ship, axis, playerName);
//     case axis === 'y': 
//         return createShip(ship, axis, pla);
//     }
//     // playerName === 'computer' 
//     // ? board[playerName].shipCoord.push()
// }

// function gridSpaceVerification(ship, axis, playerName) {
//     playerName === 'computer' ? board.computer.name = 'computer' : board.player1.name = playerName;
//     playerName === 'computer' ? playerName = board.computer : playerName = board.player1;
//     // const { playerName: { grid } } = grid;
//     const { grid } = playerName;

//     let retry = false;

//     ship.forEach((n) => {
//         // typeof grid[n] === 'number' ? createShip(ship, axis, playerName) 
//         // : repositionShip(ship, playerName);
//         switch (true) { 
//         case typeof grid[n] !== 'number':
//             retry = true;
//             break;
//         case n < 100 && n + ship.length < 100:
//             retry = false;
//             createShip(ship, axis, playerName.name);
//         }
//     });
// randomize(ship.length, axis, playerName.name);
// }   
module.exports = gameBoard;


/***/ }),

/***/ "./src/Player.js":
/*!***********************!*\
  !*** ./src/Player.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable no-console */
/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-vars */
const gameBoard = __webpack_require__(/*! ./Gameboard */ "./src/Gameboard.js");
const loop = __webpack_require__(/*! ./gameLoop */ "./src/gameLoop.js");
const print = __webpack_require__(/*! ./DOM */ "./src/DOM.js");

const gB = gameBoard();

const Player = (name, turn) => {
    const player = {
        name: '',
        shot: [],
        turn,
        ships: [1, 1, 2, 3, 4, 5],
    };

    const computerGrid = document.querySelector('.computer').childNodes;
    const spaces = Array.from(computerGrid);

    function turnOrder() {
        // player.turn === true ?
        //     player.turn = false : player.turn = true;
    }

    function shoot(coord) {
        player.shot.push(coord);
        // turnOrder();
        setTimeout(gB.takeAim(coord, 'player1'), 100);
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

    function activateComputerGrid() {
        spaces.forEach((x) => x.addEventListener('click', (e) => {
            console.log(spaces.indexOf(e.target) + 1);
            aim(spaces.indexOf(e.target) + 1);
        }));
    }

    function shipAction(names, funct) {
        print.verifyPlayerID(names, funct);
    }

    return {
        aim,
        turnOrder,
        shipAction,
        activateComputerGrid,
    };
};

module.exports = Player;


/***/ }),

/***/ "./src/gameLoop.js":
/*!*************************!*\
  !*** ./src/gameLoop.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable default-case */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable operator-linebreak */
/* eslint-disable no-const-assign */
const gameBoard = __webpack_require__(/*! ./Gameboard */ "./src/Gameboard.js");

const gB = gameBoard();
// Player1 Ships

const GameLoop = (() => {
    const player1 = {
        name: null,
        turn: true,
    };

    const computer = {
        name: 'computer',
        turn: false,
    };

    // conditionals to handle drag ships button
    const dragButton = document.querySelector('.drag');
    const randomizeButton = document.querySelector('.randomize');
    const dragShipPanel = document.createElement('div');
    let dragConditional = true;

    // will be used for turn order enforcement
    const turnOrderSwitch = 'player1';

    // variables for targeting each grid container
    const playerContainer = document.querySelector('.player');
    const compContainer = document.querySelector('.computer');

    // allows both computer and user to randomize their ships
    function prepareShips(player) {
        switch (true) {
        case player === 'computer':
            gB.randomizedShips('computer');
            break;
        case player !== 'computer':
            player1.name = player;
            gB.randomizedShips(player);
            break;
        }
    }

    // function that handles the creation of the ship dragging panel
    function dragPanel() {
        const body = document.querySelector('body');
        dragShipPanel.classList.add('shipContainer');
        body.appendChild(dragShipPanel);
        dragConditional = false;
    }

    // function that handles the deletion of the ship dragging panel
    function dragPanelClose() {
        const body = document.querySelector('body');
        body.removeChild(dragShipPanel);
        dragConditional = true;
    }

    // Listens for the drag ships button to be clicked
    dragButton.addEventListener('click', () => {
        dragConditional === true
            ? dragPanel()
            : dragPanelClose();
    });

    // Listens for the randomize button
    randomizeButton.addEventListener('click', () => {
        prepareShips('computer');
        prepareShips('player1');
        const players = document.querySelector('.player');
        const computers = document.querySelector('.computer');
        gB.reportGrids();
    });

    // will use the above created 'turnOrderSwitch' variable to enforce turn order
    function isItMyTurn(player) {
        switch (true) {
        case player !== 'computer':
            return turnOrderSwitch === 'player1' ?
                'it is not your turn' : turnOrderSwitch = 'player1';
        default:
            return turnOrderSwitch === 'computer' ?
                'it is not your turn' : turnOrderSwitch = 'computer';
        }
    }

    return {
        turnOrder: isItMyTurn,
        prepareShips,
    };
})();

module.exports = GameLoop;


/***/ }),

/***/ "./src/shipFactory.js":
/*!****************************!*\
  !*** ./src/shipFactory.js ***!
  \****************************/
/***/ ((module) => {

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
const playerFactory = __webpack_require__(/*! ./Player */ "./src/Player.js");
const print = __webpack_require__(/*! ./DOM */ "./src/DOM.js");
const loop = __webpack_require__(/*! ./gameLoop */ "./src/gameLoop.js");

const player1 = playerFactory('Devin', true);
const computer = playerFactory('computer', false);

window.addEventListener('load', () => {
    const compBoard = Gameboard(10, 'computer', { columns: 10, rows: 10 });
    const userBoard = Gameboard(10, 'player', { columns: 10, rows: 10 });

    compBoard.gridSize(10, 'computer');
    userBoard.gridSize(10, 'player1');

    const computerGrid = document.querySelector('.computer').childNodes;
    const spaces = Array.from(computerGrid);
    spaces.forEach((space) => space.addEventListener('click', (e) => {
        player1.aim(spaces.indexOf(space) + 1);
    }));
});
// n + (10 * i) > 100 ? n -= (10 * i) : n;

})();

/******/ })()
;
//# sourceMappingURL=main.js.map