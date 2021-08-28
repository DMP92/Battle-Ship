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

*/
