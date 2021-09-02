/* eslint-disable no-alert */
/* eslint-disable default-case */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable operator-linebreak */
/* eslint-disable no-const-assign */
const playerFactory = require('./Player');
const gameBoard = require('./Gameboard');

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
