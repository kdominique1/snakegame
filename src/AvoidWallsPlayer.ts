import Player from "./Player";
import SnakeController from "./SnakeController";

class AvoidWallsPlayer extends Player {
  constructor(public sc: SnakeController) {
    super(sc);
  }

  // Fix this method because snake is disappearing after hitting top-right corner and then reappears
  // at bottom left corner and turns correctly at top left corner
  makeTurn() {
    if (
      (this.sc.snakeDirection === -1 && // Left
        this.sc.snakePosition.x === 0 &&
        this.sc.snakePosition.y <= this.sc.worldHeight / 2) ||
      (this.sc.snakeDirection === 2 && // Down
        this.sc.snakePosition.y >= this.sc.worldHeight &&
        this.sc.snakePosition.x < this.sc.worldWidth / 2) ||
      (this.sc.snakeDirection === 0 && // Up
        this.sc.snakePosition.y <= 0 &&
        this.sc.snakePosition.x >= this.sc.worldWidth / 2) ||
      (this.sc.snakeDirection === 1 && // Right
        this.sc.snakePosition.x >= this.sc.worldWidth &&
        this.sc.snakePosition.y > this.sc.worldHeight / 2)
    ) {
      this.sc.turnSnakeLeft();
    } else if (
      (this.sc.snakeDirection === 0 && this.sc.snakePosition.y <= 0) || // Up
      (this.sc.snakeDirection === 1 &&
        this.sc.snakePosition.x >= this.sc.worldWidth &&
        this.sc.snakePosition.y <= this.sc.worldHeight / 2) || // Right
      (this.sc.snakeDirection === 2 &&
        this.sc.snakePosition.y >= this.sc.worldHeight &&
        this.sc.snakePosition.x >= this.sc.worldWidth / 2) || // Down
      (this.sc.snakeDirection === -1 &&
        this.sc.snakePosition.x <= 0 &&
        this.sc.snakePosition.y > this.sc.worldHeight / 2) // Left
    ) {
      this.sc.turnSnakeRight();
    }
  }
}

export default AvoidWallsPlayer;
