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
