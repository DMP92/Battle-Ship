/* eslint-disable consistent-return */
/* eslint-disable default-case */
/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-expressions */
/* eslint-disable operator-linebreak */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-console */
const shipFactory = require('./shipFactory');

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
play.takeAim(70);
play.takeAim(50);
play.takeAim(51);
play.countShips();

module.exports = Gameboard;
