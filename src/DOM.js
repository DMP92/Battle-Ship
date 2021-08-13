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

    function trackPlays(position, action) {
        console.log(position);
        action === 'hit' ?
            playerContainer.children[position - 1].style.cssText = "background-color: black; box-shadow: inset 0px 0px 1px grey" :
            playerContainer.children[position - 1].style.cssText = "background-color: aquamarine; box-shadow: inset 0px 0px 1px blue";
        // indicate(position, action);
    }

    return {
        spaces: appendSpaces,
        verifyPlayerID: personOrComputer,
        placeShip,
        plays: trackPlays,
        playerGrid,
    };
})();

module.exports = printToDOM;
