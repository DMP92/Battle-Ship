/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOM.js":
/*!********************!*\
  !*** ./src/DOM.js ***!
  \********************/
/***/ ((module) => {

/* eslint-disable default-case */
/* eslint-disable padded-blocks */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
/* eslint-disable no-console */
const printToDOM = (() => {
    const playerContainer = document.querySelector('.player');
    const compContainer = document.querySelector('.computer');

    function appendSpaces(player) {
        switch (true) {
        case player === 'computer':
            break;
        default:
        }
    }

    function placeShip(player) {
    }
    function personOrComputer(player, func) {
        return func;
    }

    function playerGrid(grid) {
    }

    function shipCount(player, number) {
        const root = document.querySelector(':root');
        switch (true) {
        case number === 1:
            player === 'computer'
                ? root.style.setProperty('--computer-content', `'${number} ship'`)
                : root.style.setProperty('--player-content', `'${number} ship'`);
            break;
        case number !== 1:
            player === 'computer'
                ? root.style.setProperty('--computer-content', `'${number} ships'`)
                : root.style.setProperty('--player-content', `'${number} ships'`);
            break;
        }
    }

    function playerShipColor(position, player) {
        if (player !== 'computer') {
            position.style.cssText = 'background-color: aquamarine; box-shadow: inset 0px 0px 1px black';
        }
        // #FFA826
    }

    function trackPlays(board, position, action) {
        const parsePosition = position.toString().split(',').reverse().join('');
        const target = parseInt(parsePosition, 10);
        let container = '';
        board === 'computer'
            ? container = compContainer
            : container = playerContainer;
        // eslint-disable-next-line no-unused-expressions
        if (container === playerContainer) {
            action === 'hit'
                ? container.children[target].style.cssText = 'background-color: #FF8D53; box-shadow: inset 0px 0px 1px black' // #FFA826
                : container.children[target].style.cssText = 'background-color: rgb(197, 197, 197); box-shadow: inset 0px 0px 1px rgba(0, 0, 0, 0.5)';
        } else {
            action === 'hit'
                ? container.children[target].style.cssText = 'background-color: aquamarine; box-shadow: inset 0px 0px 1px black' // #FFA826
                : container.children[target].style.cssText = 'background-color: rgb(197, 197, 197); box-shadow: inset 0px 0px 1px rgba(0, 0, 0, 0.5)';
        }
        // indicate(position, action);
    }

    return {
        spaces: appendSpaces,
        verifyPlayerID: personOrComputer,
        placeShip,
        plays: trackPlays,
        playerGrid,
        playerShipColor,
        shipCount,
    };
})();

module.exports = printToDOM;


/***/ }),

/***/ "./src/Gameboard.js":
/*!**************************!*\
  !*** ./src/Gameboard.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable no-alert */
/* eslint-disable prefer-destructuring */
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

const shipFactory = __webpack_require__(/*! ./shipFactory */ "./src/shipFactory.js");
const loop = __webpack_require__(/*! ./gameLoop */ "./src/gameLoop.js");
const print = __webpack_require__(/*! ./DOM */ "./src/DOM.js");
const { verifyPlayerID } = __webpack_require__(/*! ./DOM */ "./src/DOM.js");

// tracks each hit && miss of all players
const playerLog = {
    player1: {
        misses: [],
        hits: [],
        turn: true,
        streak: false,
    },
    computer: {
        misses: [],
        hits: [],
        available: [],
        taken: [],
        turn: false,
        streak: false,
        seek: false,
        direction: [],
        shipFound: [],
        randomizedChoices: ['left', 'right', 'down', 'up'],
    },
};

// Contains all required info about the board the game exists in
const board = {
    ['player1']: { 
        name: 'Devin',
        size: {
            columns: 0,
            rows: 0,
        },
        ships: [6],
        grid: [
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
        ],
        taken: [],
        turn: true,
        grids: [],
    },

    ['computer']: {
        name: 'computer',
        size: {
            columns: 0,
            rows: 0,
        },
        ships: [6],
        grid: [
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
        ],
        taken: [],
        turn: false,
        grids: [],
    },
};
console.log(board.player1.grid);

// Module that controls how ships are randomly placed
const conditionalShipPlacementModule = (() => {
    function isCoordValid(x, y) {
        const min = 0;
        const max = 9;
        
        // tests if ship coordinates are valid or not 
        // e.g. [-1, 10] - not valid
        // e.g. [2, 5] - valid
        // anything lower than 0, or higher than 9 results in returning invalid
        const validateCoords = () => {
            if (x < 0 || y < 0) {
                return false;
            }
    
            if (x > 9 || y > 9) {
                return false;
            }
    
            if (x >= 0 && x < 10) {
                return true;
            }
    
            if (y >= 0 && y < 10) {
                return true;
            }
            return true;
        };
        return validateCoords(x, y);
    }
    
    // returns false if a ship is being placed on another ship, directly adjacent to another ship
    // or off of the grid entirely
    function isSpotAvailable(position, ship, axis, player) {
        let playerBoard = '';
        const shipSize = ship.size.length;
        const start = position.start;
        const end = position.end;
        player.name === 'computer'
            ? playerBoard = board.computer.grid
            : playerBoard = board.player1.grid;
        
        if (axis === 'x') {
            // checks if the entire ship length is available
            for (let i = start.x; i <= end.x; i += 1) {
                if (playerBoard[start.y][i] === 'b' || typeof playerBoard[start.y][i] === 'object') {
                    return false;
                }
            }

            // checks if the left side of ship is free
            if (typeof playerBoard[start.y][start.x - 1] === 'object') {
                return false;
            }

            // checks if the right side of ship is free
            if (typeof playerBoard[start.y][end.x + 1] === 'object') {
                return false;
            }
        
            // checks the top side of ship
            // if (start.y !== 0) {
            //     console.log('IT WORKS, IT REALLY, REALLY WORKS');
            for (let i = start.x - 1; i <= end.x + 1; i += 1) {
                if (playerBoard[start.y - 1]) {
                    if (typeof playerBoard[start.y - 1][i] === 'object') {
                        return false;
                    }
                }
                return true;
            }
            // }

            // checks the bottom side of ship
            for (let i = start.x - 1; i <= end.x + 1; i += 1) {
                if (typeof playerBoard[start.y + 1][i] === 'object') {
                    return false;
                }
            }
            return true;    
        } 

        if (axis === 'y') {
            // checks if the entire ship length is available
            for (let i = start.y; i <= end.y; i += 1) {
                if (playerBoard[i][start.x] === 'b' || typeof playerBoard[i][start.x] === 'object') {
                    return false;
                }
            }

            // checks if left side of vertical ship is free
            // if (start.y !== 0) {
            for (let i = start.y - 1; i <= end.y + 1; i += 1) {
                if (playerBoard[i]) {
                    if (typeof playerBoard[i][start.x - 1] === 'object' || playerBoard[i][start.x - 1] === 'b') {
                        return false;
                    }
                }
                return true;
            }

            // checks if right side of vertical ship is free
            for (let i = start.y - 1; i <= end.y + 1; i += 1) {
                if (typeof playerBoard[start.x + 1][i] === 'object') {
                    return false;
                }
            }

            // checks top of vertical ship
            if (typeof playerBoard[start.y - 1][start.x] === 'object') {
                return false;
            }

            // checks bottom of vertical ship
            if (typeof playerBoard[end.y + 1][start.x] === 'object') {
                return false;
            }
            return true;
        }
        return true;
    }
    
    // if both - coordinates are valid, and the desired ship placement is valid - return true and place ship
    // else, return false, generate new coordinates and try again
    function isShipValid(coords, newShip, newAxis, player) {
        if (isCoordValid(coords.start.x, coords.start.y) && isSpotAvailable(coords, newShip, newAxis, player)) {
            return true;
        }
        return false;
    }

    return {
        isShipValid,
        isCoordValid,

    };
})();

/* eslint-disable no-unused-vars */
const gameBoard = (name) => {
    // Creates an instance of shipFactory once here
    const user = playerLog.player1;
    const comp = playerLog.computer;

    const checkForPlacementValidity = conditionalShipPlacementModule;
    const computerContainer = document.querySelector('.computer');
    const playerContainer = document.querySelector('.player');

    const placeShip = conditionalShipPlacementModule;

    function updateStatus(player, action) {
        console.log(action, player);
        action === 'miss'
            ? playerLog[player].streak = false
            : playerLog[player].streak = true;
    }

    // Creates the array of divs that form the board
    function arrayCreation(cols, rows, player) {
        const arr = new Array(cols);
        board[player].grids.push(arr);
        for (let i = 0; i < arr.length; i += 1) {
            arr[i] = new Array(rows);
        }
        let j = 0;
        board[player].grids[0].forEach((a) => {
            a.splice(0, 10);
            for (let i = 0; i < board[player].grids[0].length; i += 1) {
                if (player === 'computer') {
                    const compSpaces = document.createElement('div');
                    compSpaces.classList.add('compSpace');
                    computerContainer.appendChild(compSpaces);
                    a.push(compSpaces);
                } else {
                    const playerSpaces = document.createElement('div');
                    playerSpaces.classList.add('space');
                    playerContainer.appendChild(playerSpaces);
                    a.push(playerSpaces);
                }
            }
            j += 1;
        });
        return arr;
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
        return total;
    }

    // if the chosen space exists within computer's availiable choices, remove that space
    function removeComputerChoice(takenSpot) {
        console.log(takenSpot);
        const availableCompChoice = playerLog.computer.available;
        const index = availableCompChoice.indexOf(takenSpot);
        if (availableCompChoice.includes(takenSpot)) {
            console.log(takenSpot, index, availableCompChoice[index]);
            availableCompChoice.splice(index, 1);
        }
    }

    // parses chosen space to then be removed from available choices
    function logUsedComputerSpots(position) {
        const place = position.toString().split(',').reverse().join('');
        const takenSpot = parseInt(place, 10);
        console.log(position, place, takenSpot, 'TEST');
        playerLog.computer.taken.push(takenSpot);
        removeComputerChoice(takenSpot);
    }

    // Logs activties of each player (misses / hits)
    function trackPlays(direction, position, target, action) {
        console.log(direction);
        const shot = [];
        shot.push(position[0]);
        shot.push(position[1]);
        switch (true) {
        case target === 'computer':
            action === 'hit' ? user.hits.push(shot) : user.misses.push(shot);
            print.plays(board[target].name, position, action);
            return action;
        case target === 'player1':
            action === 'hit' ? comp.hits.push(shot) : comp.misses.push(shot);
            print.plays(board[target].name, position, action);
            logUsedComputerSpots(position);
            if (action === 'hit') {
                board.player1.grid[position[1]][position[0]].status === 'afloat'
                    ? playerLog.computer.seek = true
                    : playerLog.computer.seek = false;
                playerLog.computer.taken.push(position);
                if (direction !== 'loop') {
                    computerLogic(undefined, 'hit', direction);
                }
                console.log(playerLog.computer.taken);
            }
            if (action === 'miss') {
                playerLog.computer.taken.push(position);
                console.log(playerLog.computer.taken);
                const index = playerLog.computer.direction.indexOf(direction);
                playerLog.computer.direction.splice(index, 1);
            }
            return action;
        }

        return action;
    }

    // Tracks whether or not all of the ships are destroyed
    function shipSank(ship, status, target) {
        console.log(target);
        status === 'sunk!'
            ? board[target].ships -= 1
            : board[target].ships;
        if (target !== 'computer') {
            playerLog.computer.seek = false;
            playerLog.computer.randomizedChoices = ['left', 'right', 'up', 'down'];
        }
        return board[target].ships === 0 
            ? print.shipCount(target, board[target].ships) 
            : print.shipCount(target, board[target].ships);
    }

    // checks that the ship that was hit is still floating -- if not, it is subtracted from total remaining ships
    function isShipStillFloating(ship, target) {
        target === 'computer'   
            ? target = 'computer'
            : target = 'player1';
        ship.status === 'sunk!' ? 
            shipSank(ship, 'sunk!', target) : board[target].ships;
    }

    // Records which ship was hit where
    function hit(ship, position, target, direction) {
        const players = shipFactory();
        const newShip = players.isHit(ship, position, target);
        isShipStillFloating(newShip, target);
        print.plays(target, position, 'hit');
        return trackPlays(direction, position, target, 'hit');
    }

    // Allows the user and computer to take a shot
    function takeAim(x, y, player, target, direction) {
        console.log(direction);
        let playerBoard;
        player === 'computer'   
            ? playerBoard = board.player1.grid
            : playerBoard = board.computer.grid;
        const shipObject = playerBoard[y][x];
        const position = [x, y];
        console.log(player);
        playerBoard[y][x] === '' || playerBoard[y][x] === 'b'
            ? updateStatus(player, 'miss')
            : updateStatus(player, 'hit');
        return playerBoard[y][x] === '' || playerBoard[y][x] === 'b'
            ? trackPlays(direction, position, target, 'miss') 
            : hit(shipObject, position, target, direction);
    }

    // creates border around each printed ship
    function createBorder(positions, newShip, axis, player) {
        const coordCheck = conditionalShipPlacementModule;
        let playerBoard;
        player.name === 'computer'
            ? playerBoard = board.computer.grid
            : playerBoard = board.player1.grid;

        const start = positions.start;
        const end = positions.end;

        if (axis === 'x') {
            // Create top border
            for (let i = start.x - 1; i <= end.x + 1; i += 1) {
                if (coordCheck.isCoordValid(i, start.y - 1) && typeof playerBoard[start.y - 1][i] !== 'object') {
                    playerBoard[start.y - 1].splice(i, 1, 'b');
                } 
            }

            // creates bottom border
            for (let i = start.x - 1; i <= end.x + 1; i += 1) {
                if (coordCheck.isCoordValid(i, start.y + 1) && typeof playerBoard[start.y + 1][i] !== 'object') {
                    playerBoard[start.y + 1].splice(i, 1, 'b');
                } 
            }

            // creates left border
            if (coordCheck.isCoordValid(start.x - 1, start.y) && typeof playerBoard[start.y][start.x + 1] !== 'object') {
                playerBoard[start.y].splice(start.x - 1, 1, 'b');
            }

            // creates right border
            if (coordCheck.isCoordValid(end.x + 1, start.y) && typeof playerBoard[start.y][end.x + 1] !== 'object') {
                playerBoard[start.y].splice(end.x + 1, 1, 'b');
            } 
        }

        if (axis === 'y') {
            // Create left border
            for (let i = start.y - 1; i <= end.y + 1; i += 1) {
                if (coordCheck.isCoordValid(start.x - 1, i) && typeof playerBoard[i][start.x - 1] !== 'object') {
                    playerBoard[i].splice(start.x - 1, 1, 'b');
                } 
            }

            // Create right border
            for (let i = start.y - 1; i <= end.y + 1; i += 1) {
                if (coordCheck.isCoordValid(start.x + 1, i) && typeof playerBoard[i][start.x + 1] !== 'object') {
                    playerBoard[i].splice(start.x + 1, 1, 'b');
                } 
            }

            // creates top border
            if (coordCheck.isCoordValid(start.x, start.y - 1) && typeof playerBoard[start.y - 1][start.x] !== 'object') {
                playerBoard[start.y - 1].splice(start.x, 1, 'b');
            }

            // creates bottom border
            if (coordCheck.isCoordValid(end.x, end.y + 1) && typeof playerBoard[end.y + 1][start.x] !== 'object') {
                playerBoard[end.y + 1].splice(start.x, 1, 'b');
            } 
        }
    }

    // determines which board ships are printed to
    function determinePlayer(player, grid) {
        switch (true) {
        case grid === 0:
            return player === 'computer'
                ? board.computer.grids[0]
                : board.player1.grids[0];
        case grid === 1:
            return player === 'computer'
                ? board.computer.grid
                : board.player1.grid;
        }
    }

    // Randomizes ship placement
    function createPlayerShips(positions, newShip, axis, player) {
        const playerBoard = determinePlayer(player.name, 0);
        const secondaryPlayerBoard = determinePlayer(player.name, 1);
        let start = positions.start;
        let end = positions.end;
        const length = newShip.size.length;
        let coords;
        const cap = 10 - length;
        let newAxis;
        
        // eslint-disable-next-line prefer-const
        do {
            newAxis = randomAxisGeneration(newShip, player);
            coords = simpleNumberGeneration(cap, newAxis, length);
            start = coords.start;
            end = coords.end;
            newShip.coord = coords;
            axis = newAxis;
        } while (checkForPlacementValidity.isShipValid(coords, newShip, newAxis, player) === false);
        
        switch (true) {
        case axis === 'x':
            for (let i = start.x; i <= end.x; i += 1) {
                secondaryPlayerBoard[start.y].splice(i, 1, newShip);
                print.playerShipColor(playerBoard[start.y][i], player.name);
                createBorder(coords, newShip, 'x', player);
            }
            break;
        case axis === 'y':
            for (let i = start.y; i <= end.y; i += 1) {
                secondaryPlayerBoard[i].splice(start.x, 1, newShip);
                print.playerShipColor(playerBoard[i][start.x], player.name);
                createBorder(coords, newShip, 'y', player);
            }
            break;
        }
    }

    // Creates a ship and places it on the board
    function createShip(position, axis, player, i, length) {
        let playerBoard = '';
        let newShip = '';
        const shipFactoryFunction = shipFactory();
        player.name === 'computer' ? playerBoard = board.computer : playerBoard = board.player1;
        // const gridPlace = convertCoordToSpace(position, player.name);
        newShip = shipFactoryFunction.createShip(length);
        newShip.coord = position;
        createPlayerShips(position, newShip, axis, player);
    }

    function prepareShipForCreation(length, position, axis, player, k) {
        let playerBoard = '';
        player.name === 'computer' ? playerBoard = board.computer : playerBoard = board.player1;
        createShip(position, axis, player, k, length);
    }  

    // playerBoard, axis, i
    function simpleNumberGeneration(cap, axis, i) {
        let x = 0;
        let y = 0;
        const coord = {
            start: {
                x,
                y, 
            },
            end: {
                x,
                y,
            },
        };
        if (axis === 'y') {
            i === 1
                ? i -= 1
                : i -= 1;
            x = Math.floor(Math.random() * 9);
            y = Math.floor(Math.random() * (10 - i));
            coord.start.x = x;
            coord.start.y = y;
            coord.end.x = x;
            coord.end.y = coord.start.y + i;
        } else if (axis === 'x') {
            i === 1
                ? i -= 1
                : i -= 1;
            x = Math.floor(Math.random() * (10 - i));
            y = Math.floor(Math.random() * 9);
            coord.start.x = x;
            coord.start.y = y;
            coord.end.x = coord.start.x + i;
            coord.end.y = y;
        }
        return coord;
    }

    // Generates a random coord
    function randomNumberGeneration(axis, i, player) {
        let playerBoard = '';
        player === 'computer' ? playerBoard = board.computer : playerBoard = board.player1;
        const limit = 10 - i;
        const shipStartingPoint = axis === 'x' 
            ? simpleNumberGeneration(limit, axis, i)
            : simpleNumberGeneration(limit, axis, i);
        
        return shipStartingPoint;
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
    }

    // Functionality for randomizing and placing computer ships
    function randomizedShips(player) {
        // eslint-disable-next-line no-unused-expressions
    
        player === 'computer' ? player = computer : player = player1;
        let i = 0;
        player.shipsLength.forEach((length) => {
            gatherShipMaterials(length, player, randomAxisGeneration(length, player), i);
            i += 1;
        });
        const colorMyGrid = board.player1.taken;
        // print.playerShipColor(colorMyGrid);
    }

    function moveLeft(base, newCoords, newArray) {
        newCoords = checkForPlacementValidity.isCoordValid(base[0] - 1, base[1]);
        const newTarget = [base[0] - 1, base[1]];
        console.log(playerLog.computer.available.includes(newTarget));
        console.log(playerLog.computer.taken.includes(newTarget), 'taken');
        if (newCoords === true) {
            const x = base[0] - 1;
            const y = base[1];

            newArray.push(x);
            newArray.push(y);
            setTimeout(parseCoordinates(newArray, 'computer', 'player1', 'left'), 400);
            const rememberDirection = playerLog.computer.direction;
            rememberDirection.push('left');
        } else if (newCoords === false) {
            computerLogic('left');
        }
    }    

    function moveRight(base, newCoords, newArray) {
        newCoords = checkForPlacementValidity.isCoordValid(base[0] + 1, base[1]);
        const newTarget = [base[0] + 1, base[1]];
        console.log(playerLog.computer.available.includes(newTarget));
        console.log(playerLog.computer.taken.includes(newTarget), 'taken');
        if (newCoords === true) {
            const x = base[0] + 1;
            const y = base[1];

            newArray.push(x);
            newArray.push(y);
            setTimeout(parseCoordinates(newArray, 'computer', 'player1', 'right'), 400);
            const rememberDirection = playerLog.computer.direction;
            rememberDirection.push('right');
        } else if (newCoords === false) {
            computerLogic('right');
        }
    }

    function moveUp(base, newCoords, newArray) {
        newCoords = checkForPlacementValidity.isCoordValid(base[0], base[1] - 1);
        const newTarget = [base[0], base[1] - 1];
        console.log(playerLog.computer.available.includes(newTarget));
        console.log(playerLog.computer.taken.includes(newTarget), 'taken');
        if (newCoords === true) {
            const x = base[0];
            const y = base[1] - 1;

            newArray.push(x);
            newArray.push(y);
            setTimeout(parseCoordinates(newArray, 'computer', 'player1', 'up'), 400);
            const rememberDirection = playerLog.computer.direction;
            rememberDirection.push('up');
        } else if (newCoords === false) {
            computerLogic('up');
        }
    }

    function moveDown(base, newCoords, newArray) {
        const newTarget = [base[0], base[1] + 1];
        newCoords = checkForPlacementValidity.isCoordValid(base[1], base[0] + 1);
        console.log(playerLog.computer.available.includes(newTarget));
        console.log(playerLog.computer.taken.includes(newTarget), 'taken');
        if (newCoords === true) {
            const x = base[0];
            const y = base[1] + 1;
            
            newArray.push(x);
            newArray.push(y);
            console.log(newArray);
            setTimeout(parseCoordinates(newArray, 'computer', 'player1', 'down'), 400);
            const rememberDirection = playerLog.computer.direction;
            rememberDirection.push('down');
        } else if (newCoords === false) {
            computerLogic('down');
        }
    }

    function routeDirection(base, newCoords, newArray, direction) {
        switch (true) {
        case direction === 'up':
            moveUp(base, newCoords, newArray);
            break;
        case direction === 'down':
            moveDown(base, newCoords, newArray);
            break;
        case direction === 'left':
            moveLeft(base, newCoords, newArray);
            break;
        case direction === 'right':
            moveRight(base, newCoords, newArray);
            break;
        }
    }
    
    function haveIGoneHereBefore(coords) {
        const coordsToString = `${coords[0]}${coords[1]}`;
        const stringToNumber = parseInt(coordsToString);
        return playerLog.computer.available.includes(stringToNumber)
            ? true
            : false;
    }

    function shipHasBeenFound(direction, action) {
        const base = playerLog.computer.hits[playerLog.computer.hits.length - 1];
        const foundShip = board.player1.grid.base;
        const targetSpace = board.player1.grid[base[1]][base[0]];
        console.log(targetSpace.size);
        const unhitSpaces = targetSpace.size.filter((a) => a === 'safe');
        console.log(unhitSpaces);
        let newCoords;
        const newArray = [];
        const space = board.player1.grid;
        let choice;
        const left = [base[0] - 1, base[1]];
        const right = [base[0] + 1, base[1]];
        const down = [base[0], base[1] + 1];
        const up = [base[0], base[1] - 1];
        const randomizedChoices = [left, right, down, up];
        console.log(targetSpace);
        let lastShip;
        let secondToLastShip;
        
        // map out the size array in the ship
        // run an indexOf on all 'safe' locations
        // access the coordinates, and then hit all remaining 
        console.log(direction, direction, direction, direction);
        if (direction === undefined) {
            let count = 0;
            do {
                choice = randomizedChoices[Math.floor(Math.random() * randomizedChoices.length)];

                if (playerLog.computer.taken.includes(fromArrayToNumber(choice))) {
                    lastShip = playerLog.computer.hits[playerLog.computer.hits.length - 1];
                    secondToLastShip = playerLog.computer.hits[playerLog.computer.hits.length - 2];
                    const newLastShip = board.player1.grid[lastShip[1]][lastShip[0]];
                    const start = newLastShip.coord.start;
                    const end = newLastShip.coord.end;

                    switch (true) {
                    case start.x === end.x:
                        for (let i = start.y; i <= end.y; i += 1) {
                            const tempArray = [start.x, i];
                            if (!playerLog.computer.taken.includes(fromArrayToNumber(tempArray))) {
                                choice = tempArray;
                                parseCoordinates(tempArray, 'computer', 'player1', 'loop');
                            }
                        }
                        break;
                    case start.y === end.y:
                        for (let i = start.x; i <= end.x; i += 1) {
                            const tempArray = [i, start.y];
                            if (!playerLog.computer.taken.includes(fromArrayToNumber(tempArray))) {
                                choice = tempArray;
                                parseCoordinates(tempArray, 'computer', 'player1', 'loop');
                            }
                        }
                        break;
                    }
                } else {
                    choice = randomizedChoices[Math.floor(Math.random() * randomizedChoices.length)];
                }
                count += 1;
            } while (haveIGoneHereBefore(choice) === true && checkForPlacementValidity.isCoordValid(choice) === false && count === 14);
        } 

        switch (true) {
        case choice === undefined:
            break;
        case choice === left && playerLog.computer.taken.includes(fromArrayToNumber(choice)) === false:
            if (board.player1.grid[base[0] - 1][base[1]] === undefined) {
                routeDirection(base, newCoords, newArray, 'right');
                if (typeof board.player1.grid[base[0] + 1][base[1]] !== 'object') {
                    playerLog.computer.randomizedChoices.splice('right', 1);
                }
            } else {
                routeDirection(base, newCoords, newArray, 'left');
                if (typeof board.player1.grid[base[0] - 1][base[1]] !== 'object') {
                    playerLog.computer.randomizedChoices.splice('left', 1);
                }
            }

            break;
        
        case choice === up && playerLog.computer.taken.includes(fromArrayToNumber(choice)) === false:
            if (board.player1.grid[base[0]][base[1] - 1] === undefined) {
                routeDirection(base, newCoords, newArray, 'down');
                if (typeof board.player1.grid[base[0]][base[1] + 1] !== 'object') {
                    playerLog.computer.randomizedChoices.splice('down', 1);
                }
            } else {
                routeDirection(base, newCoords, newArray, 'up');
                if (typeof board.player1.grid[base[0]][base[1] - 1] !== 'object') {
                    playerLog.computer.randomizedChoices.splice('up', 1);
                }
            }

            break;

        case choice === right && playerLog.computer.taken.includes(fromArrayToNumber(choice)) === false:
            if (board.player1.grid[base[0] + 1][base[1]] === undefined) {
                routeDirection(base, newCoords, newArray, 'left');
                if (typeof board.player1.grid[base[0] - 1][base[1]] !== 'object') {
                    playerLog.computer.randomizedChoices.splice('left', 1);
                }
            } else {
                routeDirection(base, newCoords, newArray, 'right');
                if (typeof board.player1.grid[base[0] + 1][base[1]] !== 'object') {
                    playerLog.computer.randomizedChoices.splice('right', 1);
                }
            }  
        
            break;

        case choice === down && playerLog.computer.taken.includes(fromArrayToNumber(choice)) === false:
            if (board.player1.grid[base[0]][base[1] + 1] === undefined) {
                routeDirection(base, newCoords, newArray, 'up');
                if (typeof board.player1.grid[base[0]][base[1] - 1] !== 'object') {
                    playerLog.computer.randomizedChoices.splice('up', 1);
                }
            } else {
                routeDirection(base, newCoords, newArray, 'down');
                if (typeof board.player1.grid[base[0]][base[1] + 1] !== 'object') {
                    playerLog.computer.randomizedChoices.splice('down', 1);
                }
            }
            break;
        }
    }
   
    function computerLogic(direction, action) {
        console.log(direction);
        if (direction === undefined) {
            const base = playerLog.computer.hits[playerLog.computer.hits.length - 1];
            console.log(base);
            const foundShip = board.player1.grid[base[1]][base[0]];
            console.log(foundShip);
            if (foundShip.status === 'afloat') {
                console.log('above ship logic');
                playerLog.computer.shipFound.push(foundShip);
                shipHasBeenFound(direction, action);
            } else if (foundShip.status === 'sunk!') {
                console.log('generate random shot');
                hitOrMiss('computer');
            }
        } else {
            console.log(direction);
            shipHasBeenFound(direction, action);
        }
        
        // if (typeof targetSpace === 'object' && targetSpace.status === 'sunk!') {
        //     playerLog.computer.shipFound.push(targetSpace);
        //     console.log(targetSpace.status === 'sunk!');
        // }
    }

    function fromArrayToNumber(array) {
        console.log(array);
        const newNum = `${array[1]}${array[0]}`;
        const finalProduct = parseInt(newNum, 10);
        console.log(finalProduct);
        return finalProduct;
    }

    function parseIndex(index) {
        let newCoord = [];
        switch (true) {
        case index === 0:
            return newCoord = [0, 0];
        case index < 10:
            return newCoord = [index, 0];
        default:
            const coord = index.toString().split('').reverse().join('');
            const x = coord.substring(0, 1);
            const y = coord.substring(1, 2);
            newCoord.push(parseInt(x, 10));
            newCoord.push(parseInt(y, 10));
            return newCoord;
        }
    }

    function computerNumberGeneration() {
        const freeSpaces = playerLog.computer.available;
        const coord = freeSpaces[Math.floor(Math.random() * freeSpaces.length)];
        const newCoord = parseIndex(coord);
        console.log(newCoord);
        console.log(playerLog.computer.available);
        return newCoord;
    }

    function computerSimulatedClick(player, target) {
        const taken = playerLog.computer.taken;
        const coord = computerNumberGeneration();
        
        if (playerLog.computer.streak === false) {
            parseCoordinates(coord, player, target);
        } else {
            parseCoordinates(coord, player, target);
        }
    }

    function hitOrMiss(player, coord) {
        let target;
        player === 'computer'
            ? target = 'player1'
            : target = 'computer';
        if (player === 'computer') {
            const wasShipFound = playerLog.computer.seek;
            
            // Determines who the player is, and if it is the computer and the computer is 
            // actively seeking a ship, it will forgo randomizing a position, and instead 
            // continue seeking out the ship until it is sunk
            console.log(wasShipFound);
            switch (true) {
            case wasShipFound:
                computerLogic();
                break;
            case wasShipFound === false:
                computerSimulatedClick(player, target);
                break;
            }
        } else if (player !== 'computer') {
            parseCoordinates(coord, player, target);
        }
    }

    // takes the index of the chosen space and parses it into usable coordinates
    function parseCoordinates(coord, player, target, direction) {
        console.log(coord);
        takeAim(coord[0], coord[1], player, target, direction);
    }

    function shareStreak(currentPlayer) {        
        return playerLog[currentPlayer].streak;
    }

    return {
        gridSize, 
        hit, 
        takeAim, 
        statusOfShips, 
        countShips, 
        isShipStillFloating,
        prepareShipForCreation,
        randomizedShips,
        gatherShipMaterials,
        arrayCreation,
        hitOrMiss,
        shareStreak,
    };
};

// Both of the below objects 'computer' && 'player1' contain each ship to be used
const computer = {
    name: 'computer',
    shipsLength: [4, 3, 2, 2, 1, 1],
};

const player1 = {
    name: 'Devin',
    shipsLength: [4, 3, 2, 2, 1, 1],
};

window.addEventListener('load', () => {
    const freeComputerSpaces = playerLog.computer.available;
    for (let i = 0; i < 100; i += 1) {
        freeComputerSpaces.push(i);
    }
    console.log(freeComputerSpaces);
});

// when computer hits a ship, rework the logic so that it cannot go negative in the choices made 

module.exports = gameBoard;


/***/ }),

/***/ "./src/Player.js":
/*!***********************!*\
  !*** ./src/Player.js ***!
  \***********************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable no-alert */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable no-case-declarations */
/* eslint-disable no-return-assign */
/* eslint-disable no-console */
/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-vars */
const gameBoard = __webpack_require__(/*! ./Gameboard */ "./src/Gameboard.js");
const print = __webpack_require__(/*! ./DOM */ "./src/DOM.js");

const gB = gameBoard();

const Player = (name, turn) => {
    this.name = name;
    this.turn = turn;
    const shot = [];

    const time = [1400, 1500, 1600, 1350, 1700];

    const computerGrid = document.querySelector('.computer').childNodes;
    const spaces = Array.from(computerGrid);
    const randomize = document.querySelector('.randomize');
    const players = document.querySelector('.player');
    const computers = document.querySelector('.computer');

    function checkStreak(name) {
        return name === 'computer'
            ? gB.shareStreak('computer')
            : gB.shareStreak('player1');
    }

    function randomizeShips(name) {
        gB.randomizedShips(name);
    }

    function notYourTurn() {
        alert(`${name} it is not your turn`);
        console.log(name);
    }

    function turnOrder(index, turn) {
        computers.classList.toggle('activePlayer');
        players.classList.toggle('activePlayer');
        aim(name, index);
    }

    function parseIndex(index) {
        let newCoord = [];
        switch (true) {
        case index === 0:
            return newCoord = [0, 0];
        case index < 10:
            return newCoord = [index, 0];
        default:
            const coord = index.toString().split('').reverse().join('');
            const x = coord.substring(0, 1);
            const y = coord.substring(1, 2);
            newCoord.push(parseInt(x, 10));
            newCoord.push(parseInt(y, 10));
            return newCoord;
        }
    }

    function shoot(index) {
        let coord;
        if (index !== undefined) {
            shot.push(index);
            coord = parseIndex(index);
        }
        name === 'computer'
            ? gB.hitOrMiss(name)
            : gB.hitOrMiss('player1', coord);
    }

    // eslint-disable-next-line consistent-return
    function aim(name, index) {
        if (name === 'computer') {
            shoot(index);
        } else if (name !== 'computer') {
            shot.includes(index)
                ? 'You already shot this spot'
                : shoot(index);
        }
    }

    function activateComputerGrid() {
        spaces.forEach((x) => x.addEventListener('click', (e) => {
            aim(spaces.indexOf(e.target) + 1);
        }));
    }

    function shipAction(names, funct) {
        print.verifyPlayerID(names, funct);
    }

    return {
        checkStreak,
        randomizeShips,
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

/* eslint-disable no-alert */
/* eslint-disable default-case */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable operator-linebreak */
/* eslint-disable no-const-assign */
const playerFactory = __webpack_require__(/*! ./Player */ "./src/Player.js");
const gameBoard = __webpack_require__(/*! ./Gameboard */ "./src/Gameboard.js");

const gB = gameBoard();
// Player1 Ships
const player1 = playerFactory('Devin', true);
const computer = playerFactory('computer', true);
const players = document.querySelector('.player');
const computers = document.querySelector('.computer');

const GameLoop = (() => {
    const user = {
        name: null,
        turn: true,
    };

    // Array used to randomize the computer's turn length
    const time = [450, 550, 650, 500, 600, 235];

    // conditionals to handle drag ships button
    const dragButton = document.querySelector('.drag');
    const dragShipPanel = document.createElement('div');
    let dragConditional = true;

    // allows both computer and user to randomize their ships
    function prepareShips(player) {
        switch (true) {
        case player === 'computer':
            computer.randomizeShips('computer');
            break;
        case player !== 'computer':
            player1.name = player;
            player1.randomizeShips(player);
            break;
        }
    }

    // function that gets players turn, and upon taking the shoot action, switches it
    function alternateTurn(index) {
        player1.turnOrder(index, user.turn);
    }

    // Function that allows the computer to shoot
    function computerTurn() {
        computers.classList.toggle('activePlayer');
        players.classList.toggle('activePlayer');
        computer.aim('computer');
    }

    function createDragPanelHeader() {
        const headerContainer = document.querySelector('.shipContainer');
        const header = document.createElement('div');
        header.classList.add('shipContainerHeader');
        header.textContent = 'Drag Your Ships';
        headerContainer.appendChild(header);
    }

    function removeDragPanelHeader() {
        const headerContainer = document.querySelector('.shipContainer');
        const header = document.querySelector('.shipContainerHeader');
        headerContainer.removeChild(header);
    }

    function removeDragPanelShipHold() {
        const headerContainer = document.querySelector('.shipContainer');
        const shipHold = document.querySelector('.shipContainerShipHold');
        headerContainer.removeChild(shipHold);
    }

    function createDraggableShips(array) {
        const draggableShipContainer = document.querySelector('.shipContainerShipHold');
        array.forEach((ship) => {
            const shipSpaceContainer = document.createElement('div');
            shipSpaceContainer.classList.add('shipSpaceContainer');
            draggableShipContainer.appendChild(shipSpaceContainer);
            for (let i = 0; i < ship; i += 1) {
                const ships = document.createElement('div');
                ships.classList.add('space');
                ships.classList.add('draggable');
                shipSpaceContainer.setAttribute('draggable', true);
                ships.style.cssText = 'grid-area: "ships"; background-color: aquamarine; border: .25px solid black; cursor: move;';
                shipSpaceContainer.appendChild(ships);
            }
        });
    }

    function removeDraggableShips() {
        const shipContainer = document.querySelector('.shipContainerShipHold');
        const ship = document.querySelectorAll('.shipSpaceContainer');
        ship.forEach((a) => {
            shipContainer.removeChild(a);
        });
    }

    function createDragPanelShipHold() {
        const shipArray = [4, 3, 2, 2, 1, 1];
        const headerContainer = document.querySelector('.shipContainer');
        const shipHold = document.createElement('div');
        shipHold.classList.add('shipContainerShipHold');
        headerContainer.appendChild(shipHold);
        createDraggableShips(shipArray);
    }
    // function that handles the creation of the ship dragging panel
    function dragPanel() {
        const gameContainerDiv = document.querySelector('.gameContainer');
        dragShipPanel.classList.toggle('computer');
        dragShipPanel.classList.add('shipContainer');
        gameContainerDiv.appendChild(dragShipPanel);
        createDragPanelHeader();
        createDragPanelShipHold();
        dragConditional = false;
    }

    // function that handles the deletion of the ship dragging panel
    function dragPanelClose() {
        const gameContainerDiv = document.querySelector('.gameContainer');
        removeDragPanelHeader();
        removeDraggableShips();
        removeDragPanelShipHold();
        gameContainerDiv.removeChild(dragShipPanel);
        dragShipPanel.classList.toggle('computer');
        dragShipPanel.classList.remove('shipContainer');
        dragConditional = true;
    }

    // FUnction allowing each grid space to be clicked
    function allowGamePlay() {
        computers.classList.toggle('activePlayer');
        const computerGrid = document.querySelector('.computer').childNodes;
        const spaces = Array.from(computerGrid);

        // event listeners for the board that is the target of the user
        spaces.forEach((space) => space.addEventListener('click', (e) => {
            const n = spaces.indexOf(space);
            const randomLengthOfTime = Math.floor(Math.random() * time.length);
            alternateTurn(n);
            if (player1.checkStreak('player1') === false) {
                setTimeout(() => { computerTurn(); }, 600);
            }
            // reimplement a system that ONLY allows users turn if the computer's streak is false
        }));
    }

    // Listens for the drag ships button to be clicked
    dragButton.addEventListener('click', () => {
        dragConditional === true
            ? dragPanel()
            : dragPanelClose();
    });

    // eventListener for randomized play
    const randomizeButton = document.querySelector('.randomize');
    // event listener for the different playstyle buttons'
    // randomize option

    randomizeButton.addEventListener('mousedown', () => {
        prepareShips('player1');
        prepareShips('computer');
        allowGamePlay();
    });

    randomizeButton.removeEventListener('mouseup', () => {
        randomizeButton.removeEventListener('mousedown', () => false);
    });

    return {
        prepareShips,
        alternateTurn,
    };
})();

// Player1
const playerOne = gameBoard();

// Computer Ships
const computerPlayer = gameBoard();

// Creates grid on page load
window.addEventListener('load', () => {
    computerPlayer.arrayCreation(10, 10, 'computer');
    playerOne.arrayCreation(10, 10, 'player1');
});

module.exports = GameLoop;


/***/ }),

/***/ "./src/shipFactory.js":
/*!****************************!*\
  !*** ./src/shipFactory.js ***!
  \****************************/
/***/ ((module) => {

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/* eslint-disable default-case */
/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const loop = __webpack_require__(/*! ./gameLoop */ "./src/gameLoop.js");
const ShipFactory = __webpack_require__(/*! ./shipFactory */ "./src/shipFactory.js");
const Gameboard = __webpack_require__(/*! ./Gameboard */ "./src/Gameboard.js");
const playerFactory = __webpack_require__(/*! ./Player */ "./src/Player.js");
const print = __webpack_require__(/*! ./DOM */ "./src/DOM.js");

})();

/******/ })()
;
//# sourceMappingURL=main.js.map