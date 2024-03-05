import Player from "./Player";
import SnakeController from "./SnakeController";

class AvoidWallsPlayer extends Player {
    constructor(public sc: SnakeController) {
        super(sc);
    }

    makeTurn() {
        /* If the snake's direction is left, the x-coord is 0, and the y-coord is less than half the total model height
        OR if the snake's direction is down, the y-coord is less than or equal to 0, and the x-coord is less than half the model width
        OR if the snake's direction is up and the y-coord is equal to or greater than the total model height and the x-coord is equal to or more than half of the world width
        OR if the snake's direction is right, the x-coord is equal to or greater than the total model width, and the y-coord is less than or equal to more than half of the world height
        */
        if ((this.sc.snakeDirection === -1 && this.sc.snakePosition.x === 0 && this.sc.snakePosition.y < this.sc.worldHeight/2) || (this.sc.snakeDirection === 2 && this.sc.snakePosition.y <= 0 && this.sc.snakePosition.x < this.sc.worldWidth/2) || (this.sc.snakeDirection === 0 && this.sc.snakePosition.y >= this.sc.worldHeight && this.sc.snakePosition.x >= this.sc.worldWidth/2) || (this.sc.snakeDirection === 1 && this.sc.snakePosition.x >= this.sc.worldWidth && this.sc.snakePosition.y >= this.sc.worldHeight/2)) {
            this.sc.turnSnakeLeft();
        }
        /* If the snake's direction is up and the y-coord is equal to or greater than the total model height and the x-coord is less than half of the world width
        OR if the snake's direction is right and the x-coord is equal to or greater than the total model width and the y-coord is greater than 0
        OR if the snake's direction is down, the y-coord is less than or equal to 0, and the x-coord is equal to or more than half the model width
        OR if the snake's direction is left, the x-coord is less than or equal to 0, and the y-coord is less than half the model height
        */
        else if ((this.sc.snakeDirection === 0 && this.sc.snakePosition.y >= this.sc.worldHeight) || (this.sc.snakeDirection === 1 && this.sc.snakePosition.x >= this.sc.worldWidth && this.sc.snakePosition.y > 0) || (this.sc.snakeDirection === 2 && this.sc.snakePosition.y <= 0 && this.sc.snakePosition.x >= this.sc.worldWidth/2) || (this.sc.snakeDirection === -1 && this.sc.snakePosition.x <= 0 && this.sc.snakePosition.y < this.sc.worldHeight/2)) {
            this.sc.turnSnakeRight();
}
    }
}

export default AvoidWallsPlayer;