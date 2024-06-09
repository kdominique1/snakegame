import IActor from "./IActor";
import Point from "./Point";

class Food implements IActor {
  private currentPosition: Point;
  private isCurrentlyActive: boolean;

  constructor(x: number, y: number) {
    this.currentPosition = new Point(x, y);
    this.isCurrentlyActive = true;
  }

  eat() {
    this.isCurrentlyActive = false;
  }

  update() {}

  public get position() {
    return this.currentPosition;
  }

  public get isActive() {
    return this.isCurrentlyActive;
  }

  public get type() {
    return "actor";
  }
}

export default Food;
