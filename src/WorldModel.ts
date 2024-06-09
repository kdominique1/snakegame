import Snake from "./Snake";
import IWorldView from "./IWorldView";

/** Class representing a world model. */
class WorldModel {
  private width_: number;
  private height_: number;
  private allSnakes: Snake[];
  private allViews: IWorldView[];

  /**
    Creates a new world model.
    */
  constructor() {
    this.width_ = 100;
    this.height_ = 100;
    this.allSnakes = [];
    this.allViews = [];
  }

  /** 
    Updates the steps for all snakes using the move method of the snake class.
    @param steps - The number of steps for the snakes to move.
  */
  updateSteps(steps: number) {
    this.allSnakes.forEach((snake) => snake.move(steps));

    // Double check this. The snake disappears after hitting the top right corner,
    // doesn't show at all when going down the right side or left on the bottom side,
    // then it reappears when going up the left side and correctly turns at the top
    // left corner
    const collidedSnakes: Snake[] = [];

    for (let i = 0; i < this.allSnakes.length; i++) {
      for (let j = i + 1; j < this.allSnakes.length; j++) {
        if (this.allSnakes[i].didCollide(this.allSnakes[j])) {
          if (!collidedSnakes.includes(this.allSnakes[i])) {
            collidedSnakes.push(this.allSnakes[i]);
          }
          if (!collidedSnakes.includes(this.allSnakes[j])) {
            collidedSnakes.push(this.allSnakes[j]);
          }
        }
      }
    }

    collidedSnakes.forEach((snake) => {
      const index = this.allSnakes.indexOf(snake);
      if (index !== -1) {
        this.allSnakes.splice(index, 1);
      }
    });

    this.allViews.forEach((view) => view.display(this));
  }

  /** 
    Returns all snakes in the world model.
  */
  public get snakes(): Snake[] {
    return this.allSnakes;
  }

  /** 
    Returns the width of the world model.
  */
  public get width(): number {
    return this.width_;
  }

  /** 
    Returns the height of the world model.
  */
  public get height(): number {
    return this.height_;
  }

  /**
   * Adds a snake to the world model.
   * @param s - The Snake instance to add.
   */
  public addSnake(s: Snake) {
    this.allSnakes.push(s);
  }

  /**
   * Adds a view to the world model.
   * @param v - The IWorldView instance to add.
   */
  public addView(v: IWorldView) {
    this.allViews.push(v);
  }
}

export default WorldModel;
