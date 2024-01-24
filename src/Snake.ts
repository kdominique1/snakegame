import display from "./display";
import Point from "./Point";

// place your code on line 5 above the export statement below

class Snake {
  private currentPosition: Point;
  private currentDirection: number;
  constructor() {
    // Step 2: Set location to Point with x and y coords of 0
    this.currentPosition = new Point(0, 0);
    this.currentDirection = 1;
  }
  // Step 4: Modify move method
  move(spaces: number) {
    if (this.currentDirection === 1) {
      // right
      this.currentPosition = new Point(this.currentPosition.x + spaces, this.currentPosition.y
      );
    } else if (this.currentDirection === 2) {
      // down
      this.currentPosition = new Point(this.currentPosition.x, this.currentPosition.y - spaces)
    } else if (this.currentDirection === -1) {
      // left
      this.currentPosition = new Point(this.currentPosition.x - spaces, this.currentPosition.y)
    } else {
      // up
      this.currentPosition = new Point(this.currentPosition.x, this.currentPosition.y + spaces)
    }
  }

  // Step 3: Add turnRight and turnLeft methods and mark old turn method as deprecated

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
   * @deprecated Use {@link turnRight/turnLeft} instead.
   */
  turn() {
    if (this.currentDirection === 1) {
      this.currentDirection = -1;
    } else {
      this.currentDirection = 1;
    }
  }

  public get position() {
    return [this.currentPosition.x, this.currentPosition.y];
}
}
export default Snake;
