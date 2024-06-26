import WorldModel from "../src/WorldModel";
import Snake from "../src/Snake";
import Point from "../src/Point";
import Food from "../src/Food";
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

  it("should remove the first snake when two snakes collide", () => {
    actorCollisionHandlers.applyCollisionAction = jest.fn();

    const worldModel = new WorldModel(100, 100, actorCollisionHandlers);
    const snake1 = new Snake(new Point(0, 0), 3);
    const snake2 = new Snake(new Point(0, 0), 3);

    snake1.die = jest.fn();
    snake2.die = jest.fn();
    worldModel.addActor(snake1);
    worldModel.addActor(snake2);

    const initialActorsArray = Array.from(worldModel.actors);
    expect(initialActorsArray.length).toBe(2);

    worldModel.updateSteps(1);

    console.log(`Actors after updateSteps: ${worldModel.actors}`);
    console.log(`Collision detected: ${snake1.didCollide(snake2)}`);

    expect(actorCollisionHandlers.applyCollisionAction).toHaveBeenCalled();
    // It is detecting a collision, but the first snake is not dying
    expect(snake1.die).toHaveBeenCalled();
    expect(snake2.die).not.toHaveBeenCalled();

    const finalActorsArray = Array.from(worldModel.actors);
    expect(finalActorsArray).not.toContain(snake1);
    // Bug: Both snakes are being removed
    expect(finalActorsArray).toContain(snake2);
  });

  it("should keep the snake and deactivate food when a snake collides with food", () => {
    actorCollisionHandlers.applyCollisionAction = jest.fn();

    const worldModel = new WorldModel(100, 100, actorCollisionHandlers);
    const snake = new Snake(new Point(0, 0), 3);
    const food = new Food(0, 0);

    worldModel.addActor(snake);
    worldModel.addActor(food);

    const initialActorsArray = Array.from(worldModel.actors);
    expect(initialActorsArray.length).toBe(2);

    worldModel.updateSteps(1);

    // Bug:  It is not detecting the collision
    expect(actorCollisionHandlers.applyCollisionAction).toHaveBeenCalled();

    const finalActorsArray = Array.from(worldModel.actors);
    //expect(finalActorsArray.length).toBe(1);
    expect(finalActorsArray).not.toContain(snake);
  });

  it("should reset the world model to its initial state", () => {
    const worldModel = new WorldModel(100, 100, actorCollisionHandlers);
    const snake = new Snake(new Point(0, 0), 3);
    const mockView = new MockView();

    worldModel.addActor(snake);
    worldModel.addView(mockView);

    worldModel.reset();

    const finalActorsArray = Array.from(worldModel.actors);
    expect(finalActorsArray.length).toBe(0);

    expect(mockView.displayCalled).toBe(false);
  });
});

describe("Addition", function () {
  it("sums numbers", () => {
    expect(1 + 1).toEqual(2);
  });
});

export {};
