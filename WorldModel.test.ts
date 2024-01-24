import WorldModel from "./WorldModel";
import Snake from "./Snake";

const updateNumOfSteps => {
    const blueSnake = new Snake;
    const WorldModel1 = new WorldModel(blueSnake);
    const purpleSnake = new Snake;
    const WorldModel2 = new WorldModel(purpleSnake);
    let numOfSteps = 0;


}

describe("WorldModel Tests", function () {
/*
  const tests = [0, 3, 10, 4].map((num, index) => moveSnakes(num, index > 2));
*/

  const testDescriptions = [
    "correctly updates the snake's position",
  ];

  testDescriptions.forEach((description, index) => {
    it(description, () =>
      expect(tests[index].actual).toMatchObject(tests[index].expected),
    );
  });
});