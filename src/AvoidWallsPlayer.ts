import Player from "./Player";
import SnakeController from "./SnakeController";

class AvoidWallsPlayer extends Player {
    constructor(public sc: SnakeController) {
        super(sc);
    }

    makeTurn() {
        /* If the snake's direction is left, the x-co0rd is 0, and the y-co0rd is less than the total model height
        OR if the snake's direction is down and the y-coord is less than or equal to 0
        */
        if (this.sc.snakeDirection === -1 && this.sc.snakePositionX === 0 && this.sc.snakePositionY < this.sc.worldModel_.worldHeight) {
            this.sc.turnSnakeLeft();
        }
        /* If the snake's direction is up and the y-coord is equal to or greater than the total model height
        OR if the snake's direction is right and the x-coord is equal to or greater than the total model width
        */
        else if ((this.sc.snakeDirection === 0 && this.sc.snakePositionY >= this.sc.worldModel_.worldHeight) || (this.sc.snakeDirection === 1 && this.sc.snakePositionX >= this.sc.worldModel_.worldWidth)) {
            this.sc.turnSnakeRight();
}
    }
}

export default AvoidWallsPlayer;