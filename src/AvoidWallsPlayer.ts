import Player from "./Player";
import SnakeController from "./SnakeController";

class AvoidWallsPlayer extends Player {
  constructor(public sc: SnakeController) {
    super(sc);
  }

  // Fix this method because snake is disappearing after hitting top-right corner and then reappears
  // at bottom left corner and turns correctly at top left corner
  makeTurn() {
    // For left (Counter-clockwise)
    if (
      // If the snake's direction is left, x coord is 0, and y is less than or equal to half of worldheight, it will turn down
      (this.sc.snakeDirection === -1 && // Left
        this.sc.snakePosition.x === 0 &&
        this.sc.snakePosition.y <= this.sc.worldHeight / 2) ||
      // If the snake's direction is down, y is greater than or equal to half of height, and x is greater than or equal to half of width, it will turn to the right
      // **Fix this - it should be if x is LESS than or equal to half of width
      (this.sc.snakeDirection === 2 && // Down
        this.sc.snakePosition.y >= this.sc.worldHeight &&
        this.sc.snakePosition.x < this.sc.worldWidth / 2) ||
      // If the snake's direction is up, y is less than or equal to 0, and x is greater than or equal to half of width, snake should turn to the left
      // **Fix this - it should be if x is GREATER than or equal to half of width
      (this.sc.snakeDirection === 0 && // Up
        this.sc.snakePosition.y <= 0 &&
        this.sc.snakePosition.x >= this.sc.worldWidth / 2) ||
      // If the snake's direction is right, x is greater than or equal to the width, and y is greater than or equal to half of height, the snake should turn up
      (this.sc.snakeDirection === 1 && // Right
        this.sc.snakePosition.x >= this.sc.worldWidth &&
        this.sc.snakePosition.y > this.sc.worldHeight / 2)
    ) {
      this.sc.turnSnakeLeft();
      // For right (Clockwise)
    } else if (
      // If direction is up, y is less than or equal to 0, snake should turn right
      // **Fix this - should add if x is less than or equal to half the width
      (this.sc.snakeDirection === 0 && this.sc.snakePosition.y <= 0) || // Up
      // If direction is right, x is greater than or equal to the width, and y is less than or equal to half the height, snake should turn down
      (this.sc.snakeDirection === 1 &&
        this.sc.snakePosition.x >= this.sc.worldWidth &&
        this.sc.snakePosition.y <= this.sc.worldHeight / 2) || // Right
      // If direction is down, y is greater than or equal to the height, and x is less than or equal to half the width, snake should turn to the left
      (this.sc.snakeDirection === 2 &&
        this.sc.snakePosition.y >= this.sc.worldHeight &&
        this.sc.snakePosition.x >= this.sc.worldWidth / 2) || // Down
      // If direction is left, x is less than or equal to 0, and y is greater than or equal to half the height, snake should turn up
      (this.sc.snakeDirection === -1 &&
        this.sc.snakePosition.x <= 0 &&
        this.sc.snakePosition.y > this.sc.worldHeight / 2) // Left
    ) {
      this.sc.turnSnakeRight();
    }
  }
}

export default AvoidWallsPlayer;
