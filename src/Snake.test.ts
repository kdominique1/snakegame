import Snake from "../src/Snake";
import Point from "../src/Point";

const moveSnakes = (times: number, turn: boolean = false) => {
  const maroonSnake = new Snake(new Point(0, 0), 3);
  let totalXCoordMaroon = 0;
  let totalYCoordMaroon = 0;

  for (let i = 0; i < times; i++) {
    const numSquares1 = Math.floor(Math.random() * 100);
    const numSquares2 = Math.floor(Math.random() * 100);
    maroonSnake.move(numSquares1);
    totalXCoordMaroon += numSquares1;
    maroonSnake.turnLeft();
    maroonSnake.move(numSquares2);
    totalYCoordMaroon += numSquares2;
    maroonSnake.turnRight();
    maroonSnake.move(numSquares1);
    totalXCoordMaroon += numSquares1;
  }

  return {
    actual: maroonSnake.position.toString(),
    expected: totalXCoordMaroon + "," + totalYCoordMaroon,
  };
};

describe("Snake Tests", function () {
  const tests = [0, 3, 10, 4].map((num, index) => moveSnakes(num, index > 2));

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
