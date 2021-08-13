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
        return total;
    }

    // Logs activties of each player (misses / hits)
    function trackPlays(position, player, action) {
        switch (true) {
        case player === 'player1':
            action === 'hit' ? user.hits.push(position) : user.misses.push(position);
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
        trackPlays(position, player, 'hit');
        // return 
        const newShip = players.isHit(ship, position);
        isShipStillFloating(newShip);
        return newShip;
    }

    // Allows the user and computer to take a shot
    function takeAim(position, player) {
        const newPosition = position - 1;
        const ship = board.player1.grid[newPosition];
        return typeof board.player1.grid[newPosition] === 'number' ? 
            trackPlays(position, player, 'miss') : hit(ship, position, player);
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
