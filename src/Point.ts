/** Class representing a point. */
class Point {
  private xcoord: number;
  private ycoord: number;

  /**
  Creates a new point with the given numbers.
  @param xcoord - The given x-coordinate.
  @param ycoord - The given y-coordinate.
 */
  constructor(xcoord: number, ycoord: number) {
    this.xcoord = xcoord;
    this.ycoord = ycoord;
  }
 
  /**
  Returns the x-coordinate.
 */
  get x(): number {
    return this.xcoord;
  }

  /**
  Returns the y-coordinate.
  */
  get y(): number {
    return this.ycoord;
  }

  toString() {
    return this.xcoord + "," + this.ycoord;
  }

}

export default Point;
