import WorldModel from "../src/WorldModel";
import Snake from "../src/Snake";
import Point from "../src/Point";

const updateNumOfSteps = (times: number) => {
  const blueSnake = new Snake(new Point(0, 0), 3);
  const worldModelOne = new WorldModel();
  worldModelOne.addSnake(blueSnake);
  let totalNumOfSteps = new Point(0, 0);

  for (let i = 0; i <= times; i++) {
    const numOfSteps = Math.floor(Math.random() * 100);
    worldModelOne.updateSteps(numOfSteps);
    totalNumOfSteps = new Point(
      totalNumOfSteps.x + numOfSteps,
      totalNumOfSteps.y,
    );
    blueSnake.turnLeft();
    worldModelOne.updateSteps(numOfSteps);
    totalNumOfSteps = new Point(
      totalNumOfSteps.x,
      totalNumOfSteps.y + numOfSteps,
    );
  }

  return {
    actual: blueSnake.position.toString(),
    expected: totalNumOfSteps.x + "," + totalNumOfSteps.y,
  };
};

describe("WorldModel Tests", function () {
  const tests = [0, 3, 10, 4].map((num) => updateNumOfSteps(num));

  const testDescriptions = ["correctly updates the snake's position"];

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
