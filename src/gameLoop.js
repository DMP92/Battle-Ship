/* eslint-disable no-use-before-define */
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

    let currenTurn = 'player1';
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
    function playerTurn(index) {
        // if it isn't the players turn, they will not go
        if (gB.isGameOver() === false) {
            if (currenTurn === 'player1' || gB.shareStreak('player1')) {
                if (gB.shareStreak('computer') === false) {
                    if (gB.isGameOver() === false) {
                        players.classList.remove('activePlayer');
                        computers.classList.add('activePlayer');
                        player1.turnOrder(index, user.turn);
                        takenSpaces.push(index);
                        isPlayersTurnOver();
                    }
                }
            }
        } else {
            endGame('shees');
        }
    }

    function isPlayersTurnOver() {
        if (gB.shareStreak('player1') === false) {
            currenTurn = 'computer';
        } else {
            currenTurn = 'player1';
            players.classList.remove('activePlayer');
            computers.classList.add('activePlayer');
        }
    }

    function isComputerTurnOver() {
        if (gB.shareStreak('computer') === false) {
            players.classList.remove('activePlayer');
            computers.classList.add('activePlayer');
            currenTurn = 'player1';
        } else {
            currenTurn = 'computer';
            computers.classList.remove('activePlayer');
            players.classList.add('activePlayer');
        }
    }

    function computerTurn() {
        // if it isn't the computer's turn, it will not go
        if (currenTurn === 'computer' || gB.shareStreak('computer')) {
            if (gB.isGameOver() === false) {
                computer.aim('computer');
            }
            if (gB.isGameOver() === true) {
                endGame('compu');
                computers.classList.remove('activePlayer');
                players.classList.remove('activePlayer');
            }
        }
        isComputerTurnOver();
    }

    const takenSpaces = [];
    function allowGamePlay(condition) {
        computers.classList.toggle('activePlayer');
        const computerGrid = document.querySelector('.computer').childNodes;
        const spaces = Array.from(computerGrid);

        // event listeners for the board that is the target of the user
        if (gB.isGameOver() === false && currenTurn === 'player1' && gB.shareStreak('computer') === false) {
            spaces.forEach((space) => space.addEventListener('click', (e) => {
                const n = spaces.indexOf(space);

                if (!takenSpaces.includes(n)) {
                    playerTurn(n);
                    endGame('player');
                    if (player1.checkStreak('player1') === false) {
                        if (gB.isGameOver() === false) {
                            computerTurn();
                        }
                    }
                }
            }));
        }
    }

    // eventListener for randomized play
    const randomizeButton = document.querySelector('.randomize');
    // event listener for the different playstyle buttons'

    function beginGame() {
        prepareShips('player1');
        prepareShips('computer');
        allowGamePlay();
    }

    function endGame(se) {
        if (se !== undefined) console.log(se);
        if (gB.isGameOver() === true) {
            console.log('hey');
            takenSpaces.splice(0, takenSpaces.length);
            computers.classList.remove('activePlayer');
            players.classList.remove('activePlayer');
            restartGame();

            currenTurn = 'player1';
        }
    }

    function gridCreation() {
        computerPlayer.arrayCreation(10, 10, 'player1');
        playerOne.arrayCreation(10, 10, 'computer');
    }

    return {
        prepareShips,
        playerTurn,
        allowGamePlay,
        beginGame,
        endGame,
        gridCreation,
    };
})();

const moduleForThePlaceYourShipsButton = (() => {
    // conditionals to handle drag ships button
    const placeYourShipsButton = document.querySelector('.drag');
    const panelForPlaceYourShipsUI = document.createElement('div');
    let dragConditional = true;

    function createPlaceYourShipsHeader() {
        const placeYourShipsUI = document.querySelector('.placeYourShipsUI');
        const header = document.createElement('div');
        header.classList.add('placeShipsHeader');
        header.textContent = 'Drag Your Ships';
        const placeYourShipsSubHeader = document.createElement('div');
        placeYourShipsSubHeader.classList.add('placeShipsHeaderSubHeader');
        placeYourShipsSubHeader.textContent = '(double click to change axis)';
        header.appendChild(placeYourShipsSubHeader);
        placeYourShipsUI.appendChild(header);
    }

    function removePlaceYourShipsHeader() {
        const placeYourShipsUI = document.querySelector('.placeYourShipsUI');
        const header = document.querySelector('.placeShipsHeader');
        placeYourShipsUI.removeChild(header);
    }

    function removeEntirePlaceYourShipsContainer() {
        const placeYourShipsUI = document.querySelector('.placeYourShipsUI');
        const containerForAllUserShipWrappers = document.querySelector('.containerForAllUserShipWrappers');
        placeYourShipsUI.removeChild(containerForAllUserShipWrappers);
    }

    function createDraggableShipsWhenPanelOpens(userShips) {
        const containerForAllUserShipWrappers = document.querySelector('.containerForAllUserShipWrappers');

        userShips.forEach((ship) => {
            const shipWrapper = document.createElement('div');
            shipWrapper.classList.add('containerThatHoldsUserShips');
            containerForAllUserShipWrappers.appendChild(shipWrapper);
            shipWrapper.setAttribute('draggable', true);
            shipWrapper.classList.add('draggable');

            for (let i = 0; i < ship; i += 1) {
                const shipSegments = document.createElement('div');
                shipSegments.classList.add('draggableSpace');
                shipSegments.style.cssText = 'grid-area: "ships"; background-color: aquamarine; border: .25px solid black; cursor: move;';
                shipWrapper.appendChild(shipSegments);
            }
        });
    }

    function removeDraggableShipsWhenPanelCloses() {
        const containerForAllUserShipWrappers = document.querySelector('.containerForAllUserShipWrappers');
        const shipWrappers = document.querySelectorAll('.shipWrapper');
        shipWrappers.forEach((wrapper) => {
            containerForAllUserShipWrappers.removeChild(wrapper);
        });
    }

    function createPlaceYourShipsContainer() {
        const shipArray = [4, 3, 2, 2, 1, 1];
        const placeYourShipsUI = document.querySelector('.placeYourShipsUI');
        const containerForAllUserShipWrappers = document.createElement('div');
        containerForAllUserShipWrappers.classList.add('containerForAllUserShipWrappers');
        placeYourShipsUI.appendChild(containerForAllUserShipWrappers);
        createDraggableShipsWhenPanelOpens(shipArray);
    }
    // function that handles the creation of the ship dragging panel
    function createsEntirePlaceYourShipsUI() {
        const gameContainerDiv = document.querySelector('.gameContainer');
        panelForPlaceYourShipsUI.classList.toggle('computer');
        panelForPlaceYourShipsUI.classList.add('placeYourShipsUI');
        gameContainerDiv.appendChild(panelForPlaceYourShipsUI);
        createPlaceYourShipsHeader();
        createPlaceYourShipsContainer();
        dragConditional = false;
    }

    // function that handles the deletion of the ship dragging panel
    function closesEntirePlaceYourShipsUI() {
        const gameContainerDiv = document.querySelector('.gameContainer');
        removePlaceYourShipsHeader();
        removeDraggableShipsWhenPanelCloses();
        removeEntirePlaceYourShipsContainer();
        gameContainerDiv.removeChild(panelForPlaceYourShipsUI);
        panelForPlaceYourShipsUI.classList.toggle('computer');
        panelForPlaceYourShipsUI.classList.remove('placeYourShipsUI');
        dragConditional = true;
    }

    function activatePlaceYourShipsButton() {
        dragConditional === true
            ? createsEntirePlaceYourShipsUI()
            : closesEntirePlaceYourShipsUI();
        listenForShipDrag();
        switchShipAxis();
        enableMouseoverColorIndicatorForGridSpaces();
    }

    function enableMouseoverColorIndicatorForGridSpaces() {
        const spaces = document.querySelectorAll('.space');
        const spaceArray = Array.from(spaces);
        spaceArray.forEach((space) => {
            space.addEventListener('dragover', () => {
                space.classList.add('placeYourShipsEventListeners');
                disableMouseoverColorIndicatorForGridSpaces(space);
            });
        });
    }

    function disableMouseoverColorIndicatorForGridSpaces(space) {
        space.addEventListener('dragleave', () => {
            space.classList.remove('placeYourShipsEventListeners');
        });
    }

    function listenForShipDrag() {
        const draggable = document.querySelectorAll('.draggable');
        const spaces = document.querySelectorAll('.space');
        const arrayOfSpaces = Array.from(spaces);

        draggable.forEach((drag) => drag.addEventListener('dragstart', () => {
            const randomizeButton = document.querySelector('.randomize');
            drag.classList.add('dragging');
            listenForShipDragEnd();
            randomizeButton.removeEventListener('click', gL.prepareShips);
        }));
    }

    function listenForShipDragEnd() {
        const shipCurrentlyBeingPlaced = document.querySelector('.dragging');
        const coords = dragShipOverSpacesToGetCoordinates();
        shipCurrentlyBeingPlaced.addEventListener('dragend', (e) => {
            const coord = spaceArray[spaceArray.length - 1];
            let axis;
            shipCurrentlyBeingPlaced.classList.contains('horizontalShip')
                ? axis = 'x'
                : axis = 'y';
            const { length } = shipCurrentlyBeingPlaced.children;
            if (gB.prepareManualShipForPlacement(coord, axis, length, true) === true) {
                gB.prepareManualShipForPlacement(coord, axis, length, true);
                // removes ship from Place Your Ships UI after it is placed
                const shipWrapperContainer = shipCurrentlyBeingPlaced.parentElement;
                shipWrapperContainer.removeChild(shipCurrentlyBeingPlaced);
                beginGame();
            }
            shipCurrentlyBeingPlaced.classList.remove('dragging');
        });
    }

    function beginGame() {
        const containerForAllUserShipWrappers = document.querySelector('.containerForAllUserShipWrappers');
        if (containerForAllUserShipWrappers.children.length === 0) {
            const playButton = document.createElement('button');
            containerForAllUserShipWrappers.appendChild(playButton);
            playButton.textContent = 'Play';
            playButton.classList.add('playButton');
            playButton.addEventListener('click', activatePlayButtonEventListener);
        }
    }

    function activatePlayButtonEventListener() {
        activatePlayButton();
    }

    function activatePlayButton() {
        closesEntirePlaceYourShipsUI();
        gB.randomizedShips('computer');
        gL.allowGamePlay();
    }

    function switchShipAxis() {
        const ship = document.querySelectorAll('.containerThatHoldsUserShips');
        ship.forEach((thisShip) => thisShip.addEventListener('dblclick', () => {
            thisShip.classList.toggle('horizontalShip');
        }));
    }

    const spaceArray = [];
    const hoveredArray = [];
    function dragShipOverSpacesToGetCoordinates() {
        const spaces = document.querySelectorAll('.space');
        const arrayOfSpaces = Array.from(spaces);

        spaces.forEach((thisSpace) => thisSpace.addEventListener('dragover', (e) => {
            manipulateEventListeners();
            const draggedElement = document.querySelector('.dragging');
            const { length } = draggedElement.children;
            const index = arrayOfSpaces.indexOf(thisSpace);
            hoveredArray.push(index);
            const coordinatesOfShipBeingPlaced = gB.parseIndex(index);
            spaceArray.push(coordinatesOfShipBeingPlaced);
        }));
    }

    function removeAllEventListeners() {
        const spaces = document.querySelectorAll('.space');
        const spaceArrays = Array.from(spaces);
        spaceArrays.forEach((space) => space.removeEventListener('click'));
    }

    return {
        activatePlaceYourShipsButton,
        removeAllEventListeners,
    };
})();

// Player1
const playerOne = gameBoard();

// Computer Ships
const computerPlayer = gameBoard();

// Creates grid on page load
const gL = GameLoop;
window.addEventListener('load', () => {
    gL.gridCreation();
});

const eventListenersForRandomizeAndPlaceShipsButtons = (() => {
    const randomizeShipsButton = document.querySelector('.randomize');
    const placeYourShipsButton = document.querySelector('.drag');

    const placeShipsModule = moduleForThePlaceYourShipsButton;

    function eventListenerStorage() {
        randomizeShipsButton.addEventListener('click', randomizeShips);
        placeYourShipsButton.addEventListener('click', placeYourShips);
    }

    function randomizeShips() {
        gL.beginGame();
        gL.allowGamePlay();
        placeYourShipsButton.removeEventListener('click', placeYourShips);
        randomizeShipsButton.removeEventListener('click', randomizeShips);
    }

    function placeYourShips() {
        placeShipsModule.activatePlaceYourShipsButton();
    }

    function disableEventListeners() {
        placeYourShipsButton.removeEventListener('click', placeYourShips);
        randomizeShipsButton.removeEventListener('click', randomizeShips);
    }

    return {
        eventListenerStorage,
        disableEventListeners,
    };
});
const initializeEventListeners = eventListenersForRandomizeAndPlaceShipsButtons();
initializeEventListeners.eventListenerStorage();

function restartGame() {
    initializeEventListeners.eventListenerStorage();
    player1.clearShotArray();
}

function manipulateEventListeners() {
    initializeEventListeners.disableEventListeners();
}

module.exports = GameLoop;
