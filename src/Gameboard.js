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

const shipFactory = require('./shipFactory');
const loop = require('./gameLoop');
const print = require('./DOM');
const { verifyPlayerID } = require('./DOM');

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
        turn: false,
        streak: false,
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

    // Logs activties of each player (misses / hits)
    function trackPlays(ship, position, target, action) {
        console.log(playerLog.player1.streak, playerLog.player1);
        console.log(playerLog.computer.streak, playerLog.computer);
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
            return action;
        }

        return action;
    }

    // Tracks whether or not all of the ships are destroyed
    function shipSank(ship, status, target) {
        let totalShips = '';
        status === 'sank'
            ? board[target].ships -= 1
            : board[target].ships;
        return board[target].ships === 0 
            ? totalShips = console.log('Their fleet has been lost!') 
            : totalShips = console.log(`${board[target].ships} of their 6 ships remain!`);
    }

    // checks that the ship that was hit is still floating -- if not, it is subtracted from total remaining ships
    function isShipStillFloating(ship, target) {
        target === 'computer'   
            ? target = 'computer'
            : target = 'player1';
        ship.status === 'sunk!' ? 
            shipSank(ship, 'sank', target) : board[target].ships;
    }

    // Records which ship was hit where
    function hit(ship, position, target) {
        const players = shipFactory();
        const newShip = players.isHit(ship, position, target);
        isShipStillFloating(newShip, target);
        print.plays(target, position, 'hit');
        return trackPlays(ship, position, target, 'hit');
    }

    // Allows the user and computer to take a shot
    function takeAim(x, y, player, target) {
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
            ? trackPlays(shipObject, position, target, 'miss') 
            : hit(shipObject, position, target);
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
            if (coordCheck.isCoordValid(end.x, start.y + 1) && typeof playerBoard[end.y + 1][start.x] !== 'object') {
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
            y = Math.floor(Math.random() * (10 - cap));
            coord.start.x = x;
            coord.start.y = y;
            coord.end.x = x;
            coord.end.y = coord.start.y + i;
        } else if (axis === 'x') {
            i === 1
                ? i -= 1
                : i -= 1;
            x = Math.floor(Math.random() * (10 - cap));
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

    function computerSimulatedClick(ele, event, spaces) {
        const userSpaces = Array.from(spaces);
        const coordinates = [];
        const index = userSpaces.indexOf(ele);
        const newIndex = index.toString();
        parseCoordinates(newIndex, 'computer', 'player1');
    }

    function hitOrMiss(coord, player) {
        let target;
        player === 'computer'
            ? target = 'player1'
            : target = 'computer';
        parseCoordinates(coord, player, target);
    }

    // takes the index of the chosen space and parses it into usable coordinates
    function parseCoordinates(coord, player, target) {
        takeAim(coord[0], coord[1], player, target);
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

module.exports = gameBoard;
