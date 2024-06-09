import WorldModel from "../src/WorldModel";
import Snake from "../src/Snake";
import Point from "../src/Point";

const updateNumOfSteps = (times: number) => {
  const blueSnake = new Snake(new Point(0, 0), 3);
  const worldModelOne = new WorldModel();
  worldModelOne.addSnake(blueSnake);
  let totalXCoord = 0;
  let totalYCoord = 0;
  let currentDirection = 1; // 1 is right initially

  for (let i = 0; i <= times; i++) {
    const numOfSteps = Math.floor(Math.random() * 100);
    
    // Move in the current direction
    worldModelOne.updateSteps(numOfSteps);
    if (currentDirection === 1) {
      totalXCoord += numOfSteps;
    } else if (currentDirection === -1) {
      totalXCoord -= numOfSteps;
    } else if (currentDirection === 0) {
      totalYCoord -= numOfSteps;
    } else if (currentDirection === 2) {
      totalYCoord += numOfSteps;
    }
    
    // Turn left (changing direction counter-clockwise)
    blueSnake.turnLeft();
    currentDirection = (currentDirection + 3) % 4; // 1->0, 0->-1, -1->2, 2->1

    // Move in the new direction
    worldModelOne.updateSteps(numOfSteps);
    if (currentDirection === 1) {
      totalXCoord += numOfSteps;
    } else if (currentDirection === -1) {
      totalXCoord -= numOfSteps;
    } else if (currentDirection === 0) {
      totalYCoord -= numOfSteps;
    } else if (currentDirection === 2) {
      totalYCoord += numOfSteps;
    }
  }

  return {
    actual: blueSnake.position.toString(),
    expected: totalXCoord + "," + totalYCoord,
  };
};

describe("WorldModel Tests", function () {
  const tests = [0, 3, 10, 4].map((num) => updateNumOfSteps(num));

  const testDescriptions = ["correctly updates the snake's position"];

  testDescriptions.forEach((description, index) => {
    it(description, () =>
      expect(tests[index].actual).toBe(tests[index].expected)
    );
  });
});

describe("Addition", function () {
  it("sums numbers", () => {
    expect(1 + 1).toEqual(2);
  });
});

export {};
