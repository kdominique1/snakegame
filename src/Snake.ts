import display from "./display";
import Point from "./Point";

/** Class representing a snake. */
class Snake {
  private currentPosition: Point;
  private currentDirection: number;
  /**
   * Creates a snake with position coordinates (0,0) and a starting direction of 1 (right).
   */
  constructor() {
    this.currentPosition = new Point(0, 0);
    this.currentDirection = 1;
  }

  /**
  Moves the snake in its current direction the given number of spaces.
  @param spaces - the number of spaces to move the snake.
 */
  
  move(spaces: number) {
    if (this.currentDirection === 1) {
      this.currentPosition = new Point(this.currentPosition.x + spaces, this.currentPosition.y
      );
    } else if (this.currentDirection === 2) {
      this.currentPosition = new Point(this.currentPosition.x, this.currentPosition.y - spaces)
    } else if (this.currentDirection === -1) {
      this.currentPosition = new Point(this.currentPosition.x - spaces, this.currentPosition.y)
    } else {
      this.currentPosition = new Point(this.currentPosition.x, this.currentPosition.y + spaces)
    }
  }

  /**
  Turns the snake to the right from its current direction.
 */

  turnRight() {
    if (this.currentDirection === 1) {
      this.currentDirection = 2;
    } else if (this.currentDirection === 2) {
      this.currentDirection = -1;
    } else if (this.currentDirection === -1) {
      this.currentDirection = 0;
    } else {
      this.currentDirection = 1;
    }
  }

  /**
  Turns the snake to the left from its current direction.
 */ 

  turnLeft() {
    if (this.currentDirection === 1) {
      this.currentDirection = 0; 
    } else if (this.currentDirection === 0) {
      this.currentDirection = -1; 
    } else if (this.currentDirection === -1)
      this.currentDirection = 2; 
    else {
      this.currentDirection = 1; 
    }
  }

  /**
   * @deprecated Use {@link turnRight} or {@link turnLeft} instead.
   */
  turn() {
    if (this.currentDirection === 1) {
      this.currentDirection = -1;
    } else {
      this.currentDirection = 1;
    }
  }

/**
Returns the snake's current position coordinates as an array.
 */
  public get position() {
    return [this.currentPosition.x, this.currentPosition.y];
}
}

export default Snake;
