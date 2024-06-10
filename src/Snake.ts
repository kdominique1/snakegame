import Point from "./Point";
import IActor from "./IActor";
import Food from "./Food";
import ICollidable from "./ICollidable";

/** Class representing a snake. */
class Snake implements ICollidable {
  private currentParts: Point[];
  private currentDirection: number;
  private size: number;
  private isCurrentlyActive: boolean;

  /**
   * Creates a snake with a given start position and size.
   * @param startPosition - The starting position of the snake's head.
   * @param size - The initial length of the snake.
   */
  constructor(startPosition: Point, size: number) {
    this.currentParts = [startPosition];
    this.size = size;
    this.currentDirection = 1; // Start facing right
    this.isCurrentlyActive = true;
    for (let i = 1; i < size; i++) {
      this.currentParts.push(new Point(startPosition.x - i, startPosition.y));
    }
  }

  /**
   * Moves the snake in its current direction the given number of spaces.
   * @param spaces - the number of spaces to move the snake.
   */
  move(spaces: number) {
    for (let i = this.currentParts.length - 1; i > 0; i--) {
      this.currentParts[i] = this.currentParts[i - 1];
    }

    let newHead: Point;
    if (this.currentDirection === 1) {
      // Right
      newHead = new Point(
        this.currentParts[0].x + spaces,
        this.currentParts[0].y,
      );
    } else if (this.currentDirection === 2) {
      // Down
      newHead = new Point(
        this.currentParts[0].x,
        this.currentParts[0].y + spaces,
      );
    } else if (this.currentDirection === -1) {
      // Left
      newHead = new Point(
        this.currentParts[0].x - spaces,
        this.currentParts[0].y,
      );
    } else {
      // Up
      newHead = new Point(
        this.currentParts[0].x,
        this.currentParts[0].y - spaces,
      );
    }
    this.currentParts[0] = newHead;
  }

  /**
   * Turns the snake to the right from its current direction.
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
   * Turns the snake to the left from its current direction.
   */
  turnLeft() {
    if (this.currentDirection === 1) {
      // facing right
      this.currentDirection = 0; // facing up
    } else if (this.currentDirection === 0) {
      // facing up
      this.currentDirection = -1; // facing left
    } else if (this.currentDirection === -1) {
      // facing left
      this.currentDirection = 2; // facing down
    } else {
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
   * Returns the snake's current head position.
   * @returns The position of the snake's head.
   */
  public get position(): Point {
    return this.currentParts[0];
  }

  public get direction(): number {
    return this.currentDirection;
  }

  // Getter to use for tests
  public get getCurrentParts(): Point[] {
    return this.currentParts;
  }

  /**
   * Checks if the snake collides with itself or another snake.
   * @param s - Another snake to check for collision.
   * @returns True if the snake collides with itself or another snake, otherwise false.
   */
  didCollide(s: Snake | IActor): boolean {
    // Collision with other objects
    if (!(s instanceof Snake)) {
      return s.position.equals(this.position);
      // Collision with itself
    } else if (
      this.currentParts.slice(1).some((part) => part.equals(this.position))
    ) {
      return true;
      // Collision with other snakes
    } else {
      return s.currentParts.some((part) => part.equals(this.position));
    }
  }

  /**
   * Adds one new Point to its parts array, extending its length.
   */
  grow() {
    const tail = this.currentParts[this.currentParts.length - 1];
    let newPart: Point;

    if (this.currentDirection === 1) {
      // Right
      newPart = new Point(tail.x + 1, tail.y);
    } else if (this.currentDirection === -1) {
      // Left
      newPart = new Point(tail.x - 1, tail.y);
    } else if (this.currentDirection === 2) {
      // Down
      newPart = new Point(tail.x, tail.y + 1);
    } else {
      // Up
      newPart = new Point(tail.x, tail.y - 1);
    }

    this.currentParts.push(newPart);
  }

  update(steps: number) {
    this.move(steps);
  }

  die() {
    this.isCurrentlyActive = false;
  }

  public get isActive() {
    return this.isCurrentlyActive;
  }

  public get type() {
    return "snake";
  }
}

export default Snake;
