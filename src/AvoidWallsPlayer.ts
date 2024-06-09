import Player from "./Player";
import SnakeController from "./SnakeController";

class AvoidWallsPlayer extends Player {
  /**
    Extends the player class to make a class with methods to avoid the walls.
    @param sc - The given snake controller.
     */
  constructor(public sc: SnakeController) {
    super(sc);
  }

  /** 
    Turns the snake left or right to avoid hitting a wall if need be. If not, the snake's direction stays the same.
     */
  makeTurn() {
    /* If the snake's direction is left and the x-coord is 0 and the y-coord is equal to or less than half the total model height
          OR if the snake's direction is down and the y-coord is greater than or equal to the total model height and the x-coord is less than half the model width
          OR if the snake's direction is up and the y-coord is equal to or less than 0 and the x-coord is equal to or more than half of the world width
          OR if the snake's direction is right and the x-coord is equal to or greater than the total model width and the y-coord is greater than half of the world height
          */
    if (
      (this.sc.snakeDirection === -1 &&
        this.sc.snakePosition.x === 0 &&
        this.sc.snakePosition.y <= this.sc.worldHeight / 2) ||
      (this.sc.snakeDirection === 2 &&
        this.sc.snakePosition.y >= this.sc.worldHeight &&
        this.sc.snakePosition.x < this.sc.worldWidth / 2) ||
      (this.sc.snakeDirection === 0 &&
        this.sc.snakePosition.y <= 0 &&
        this.sc.snakePosition.x >= this.sc.worldWidth / 2) ||
      (this.sc.snakeDirection === 1 &&
        this.sc.snakePosition.x >= this.sc.worldWidth &&
        this.sc.snakePosition.y > this.sc.worldHeight / 2)
    ) {
      this.sc.turnSnakeLeft();
    } else if (
      /* If the snake's direction is up and the y-coord is less than or equal to 0
            OR if the snake's direction is right and the x-coord is equal to or greater than the total model width and the y-coord is less than or equal to half the model height
            OR if the snake's direction is down and the y-coord is greater than or equal to the total model height and the x-coord is equal to or more than half the model width
            OR if the snake's direction is left and the x-coord is less than or equal to 0 and the y-coord is greater than half the model height
            */
      (this.sc.snakeDirection === 0 && this.sc.snakePosition.y <= 0) ||
      (this.sc.snakeDirection === 1 &&
        this.sc.snakePosition.x >= this.sc.worldWidth &&
        this.sc.snakePosition.y <= this.sc.worldHeight / 2) ||
      (this.sc.snakeDirection === 2 &&
        this.sc.snakePosition.y >= this.sc.worldHeight &&
        this.sc.snakePosition.x >= this.sc.worldWidth / 2) ||
      (this.sc.snakeDirection === -1 &&
        this.sc.snakePosition.x <= 0 &&
        this.sc.snakePosition.y > this.sc.worldHeight / 2)
    ) {
      this.sc.turnSnakeRight();
    }
  }
}

export default AvoidWallsPlayer;
