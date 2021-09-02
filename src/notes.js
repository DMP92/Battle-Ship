/*
So in Gameboard.js -----
    For computer logic I'm going to need to track the following:
        total enemy ships
        the status of the actively pursued ship

        once a hit has been established the computer should decide to go in one of four directions
        *for example* if the computer hit a ship with the coordinates [5, 4],
            and if the computer randomly decided to go left, the new coordinates would be [4, 4].
            if no hit was made in that direction, it should be able to start back at the last
            coordinates where a hit WAS made, and restart, randomly deciding where to go once more
---------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
    // I need to rework and rename the functions for 'computerLogic'
    //     There should be the initial function that recognizes when it has hit a ship
    //         it should then push it to the array 'shipFound'
    //         It should then NOT stop until shipFound has a status of sunk
    //             Logic for that should be written out

    // I then need to make the ships over the 'player1' board be hidden, so users can play normally

    The drag ship logic needs to be written, and the methods for dragging
    the items should be learned. Also, I have yet to figure out what types
    of elements or items should be created for that process
        Maybe a before pseudoelement can be used, to overlay entirely over the 'player1' board
        Once the last ship has been placed, a 'play' button should appear ontop of
        the pseudoelement, which will of course cause it to disappear as well

    Drag Ship and Randomize buttons should be unclickable after a game has already started
        clicking either will cause them to have their eventListener removed
        someone losing the game will prompt a 'play again' button that will wipe the grid and
        readd event listeners to both buttons

    Also, if the user presses an already activated empty grid spot, the computer shouldn't take that
    as an opportunity to move. Handy for development, but not for live play.

    I have to refactor the code, and write some tests (garbage example ones)

*/
