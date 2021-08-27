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
    function playerShipColor(position, player) {
        position.style.cssText = 'background-color: aquamarine; box-shadow: inset 0px 0px 1px black';
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
    };
})();

module.exports = printToDOM;
