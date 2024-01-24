class Point {
  private xcoord: number;
  private ycoord: number;

  // Step 1: Intiialize coords and add getters
  constructor(xcoord: number, ycoord: number) {
    this.xcoord = xcoord;
    this.ycoord = ycoord;
  }

  get x(): number {
    return this.xcoord;
  }

  get y(): number {
    return this.ycoord;
  }
}

export default Point;
