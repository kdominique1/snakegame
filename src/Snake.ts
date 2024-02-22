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
    // Right
      this.currentPosition = new Point(this.currentPosition.x + spaces, this.currentPosition.y
      );
    } else if (this.currentDirection === 2) {
    // Down
      this.currentPosition = new Point(this.currentPosition.x, this.currentPosition.y - spaces)
    } else if (this.currentDirection === -1) {
    // Left
      this.currentPosition = new Point(this.currentPosition.x - spaces, this.currentPosition.y)
    } else {
    // Up
      this.currentPosition = new Point(this.currentPosition.x, this.currentPosition.y + spaces)
    }
  }

  /**
  Turns the snake to the right from its current direction.
 */

  turnRight() {
    if (this.currentDirection === 1) {
      // facing right
      this.currentDirection = 2; // facing down
    } else if (this.currentDirection === 2) {
      // facing down
      this.currentDirection = -1; // facing left
    } else if (this.currentDirection === -1) {
          // facing left
      this.currentDirection = 0; // facing up
    } else {
      // facing up
      this.currentDirection = 1; // facing right
    }
  }

  /**
  Turns the snake to the left from its current direction.
 */ 

  turnLeft() {
    if (this.currentDirection === 1) {
      // facing right
      this.currentDirection = 0; // facing up
    } else if (this.currentDirection === 0) {
      // facing up
      this.currentDirection = -1; // facing left
    } else if (this.currentDirection === -1)
      // facing left
      this.currentDirection = 2; // facing down
    else {
      // facing down
      this.currentDirection = 1; // facing right
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
  // Change to Point object using toString method
    return this.currentPosition.toString();
  }

  public get direction() {
    return this.currentDirection;
  }
}

export default Snake;
