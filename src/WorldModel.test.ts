import WorldModel from "../src/WorldModel";
import Snake from "../src/Snake";
import Point from "../src/Point";
import ActorCollisionHandlers from "../src/ActorCollisionHandlers";
import IWorldView from "../src/IWorldView";

class MockView implements IWorldView {
  public displayCalled: boolean = false;

  display(worldModel: WorldModel): void {
    this.displayCalled = true;
  }

  dispose(): void {}
}

const updateNumOfSteps = (
  times: number,
  actorCollisionHandlers: ActorCollisionHandlers,
) => {
  const blueSnake = new Snake(new Point(0, 0), 3);
  const worldModelOne = new WorldModel(100, 100, actorCollisionHandlers);
  worldModelOne.addActor(blueSnake);
  let totalXCoord = 0;
  let totalYCoord = 0;
  let currentDirection = 1;

  for (let i = 0; i < times; i++) {
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

    blueSnake.turnLeft();
    currentDirection = (currentDirection + 3) % 4;

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
    expected: `${totalXCoord},${totalYCoord}`,
  };
};

describe("WorldModel Tests", function () {
  let actorCollisionHandlers: ActorCollisionHandlers;

  beforeEach(() => {
    actorCollisionHandlers = new ActorCollisionHandlers();
  });

  const tests = [0, 3, 10, 4].map((num) =>
    updateNumOfSteps(num, actorCollisionHandlers),
  );

  const testDescriptions = ["correctly updates the snake's position"];

  testDescriptions.forEach((description, index) => {
    it(description, () =>
      expect(tests[index].actual).toBe(tests[index].expected),
    );
  });

  it("should correctly add actors to the world model", () => {
    const worldModel = new WorldModel(100, 100, actorCollisionHandlers);
    const snake = new Snake(new Point(0, 0), 3);
    worldModel.addActor(snake);

    const actorsArray = Array.from(worldModel.actors);
    expect(actorsArray.length).toBe(1);
    expect(actorsArray[0]).toBe(snake);
  });

  it("should call display on all views when updateSteps is called", () => {
    const worldModel = new WorldModel(100, 100, actorCollisionHandlers);
    const mockView = new MockView();
    worldModel.addView(mockView);

    worldModel.updateSteps(1);

    expect(mockView.displayCalled).toBe(true);
  });

  it("should remove actors that collide", () => {
    actorCollisionHandlers.applyCollisionAction = jest.fn();

    const worldModel = new WorldModel(100, 100, actorCollisionHandlers);
    const snake1 = new Snake(new Point(0, 0), 3);
    const snake2 = new Snake(new Point(0, 0), 3); // Ensure they start at the same point

    worldModel.addActor(snake1);
    worldModel.addActor(snake2);

    const initialActorsArray = Array.from(worldModel.actors);
    expect(initialActorsArray.length).toBe(2);

    worldModel.updateSteps(1);

    expect(actorCollisionHandlers.applyCollisionAction).toHaveBeenCalled();

    const finalActorsArray = Array.from(worldModel.actors);
    expect(finalActorsArray.length).toBe(0); // Both snakes should be removed
  });
});

describe("Addition", function () {
  it("sums numbers", () => {
    expect(1 + 1).toEqual(2);
  });
});

export {};
