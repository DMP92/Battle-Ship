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

const print = require('./DOM');
const shipFactory = require('./shipFactory');

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
