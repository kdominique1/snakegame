import Snake from "../src/Snake";
import Point from "../src/Point";

const moveSnakes = (times: number) => {
  const maroonSnake = new Snake(new Point(0, 0), 3);
  let totalXCoordMaroon = 0;
  let totalYCoordMaroon = 0;
  let currentDirection = 1; // Initial direction is right

  for (let i = 0; i < times; i++) {
    const numSquares1 = Math.floor(Math.random() * 100);
    const numSquares2 = Math.floor(Math.random() * 100);

    // Move in the current direction
    maroonSnake.move(numSquares1);
    if (currentDirection === 1) {
      totalXCoordMaroon += numSquares1;
    } else if (currentDirection === -1) {
      totalXCoordMaroon -= numSquares1;
    } else if (currentDirection === 0) {
      totalYCoordMaroon -= numSquares1;
    } else if (currentDirection === 2) {
      totalYCoordMaroon += numSquares1;
    }

    // Turn left (changing direction counter-clockwise)
    maroonSnake.turnLeft();
    currentDirection = (currentDirection + 3) % 4; // 1->0, 0->-1, -1->2, 2->1

    // Move in the new direction
    maroonSnake.move(numSquares2);
    if (currentDirection === 1) {
      totalXCoordMaroon += numSquares2;
    } else if (currentDirection === -1) {
      totalXCoordMaroon -= numSquares2;
    } else if (currentDirection === 0) {
      totalYCoordMaroon -= numSquares2;
    } else if (currentDirection === 2) {
      totalYCoordMaroon += numSquares2;
    }

    // Turn right (changing direction clockwise)
    maroonSnake.turnRight();
    currentDirection = (currentDirection + 1) % 4; // 0->1, 1->2, 2->-1, -1->0

    // Move in the new direction
    maroonSnake.move(numSquares1);
    if (currentDirection === 1) {
      totalXCoordMaroon += numSquares1;
    } else if (currentDirection === -1) {
      totalXCoordMaroon -= numSquares1;
    } else if (currentDirection === 0) {
      totalYCoordMaroon -= numSquares1;
    } else if (currentDirection === 2) {
      totalYCoordMaroon += numSquares1;
    }
  }

  return {
    actual: maroonSnake.position.toString(),
    expected: totalXCoordMaroon + "," + totalYCoordMaroon,
  };
};

describe("Snake Tests", function () {
  const tests = [0, 3, 10, 4].map((num) => moveSnakes(num));

  const testDescriptions = [
    "starts with the correct position of 0",
    "has the correct position after 3+ random moves",
    "has the correct position after 10+ random moves",
    "has the correct position after 4+ random moves with turns",
  ];

  testDescriptions.forEach((description, index) => {
    it(description, () =>
      expect(tests[index].actual).toBe(tests[index].expected),
    );
  });
});

describe("Addition", function () {
  it("sums numbers", () => {
    expect(1 + 1).toEqual(2);
  });
});

export {};
