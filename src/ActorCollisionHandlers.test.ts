import ActorCollisionHandlers from "../src/ActorCollisionHandlers";
import SnakeCollisionFoodHandler from "../src/SnakeCollisionFoodHandler";
import SnakeSnakeCollisionHandler from "../src/SnakeSnakeCollisionHandler";
import IActor from "../src/IActor";
import ICollisionHandler from "../src/ICollisionHandler";
import Snake from "../src/Snake";
import Food from "../src/Food";
import Point from "../src/Point";

jest.mock("../src/Snake");
jest.mock("../src/Food");

describe("ActorCollisionHandlers", () => {
  let collisionHandlers: ActorCollisionHandlers;

  beforeEach(() => {
    collisionHandlers = new ActorCollisionHandlers();
  });

  test("should initialize with default collision handlers", () => {
    expect(collisionHandlers.hasCollisionAction("Snake", "Food")).toBe(true);
    expect(collisionHandlers.hasCollisionAction("Snake", "Snake")).toBe(true);
  });

  test("should add a new collision action", () => {
    const mockHandler: ICollisionHandler = {
      applyAction: jest.fn(),
    };
    collisionHandlers.addCollisionAction("Snake", "Wall", mockHandler);
    expect(collisionHandlers.hasCollisionAction("Snake", "Wall")).toBe(true);
  });

  test("should apply correct collision action", () => {
    const mockHandler: ICollisionHandler = {
      applyAction: jest.fn(),
    };
    collisionHandlers.addCollisionAction("Snake", "Wall", mockHandler);

    const collider = { type: "Snake" } as IActor;
    const collided = { type: "Wall" } as IActor;

    collisionHandlers.applyCollisionAction(collider, collided);

    expect(mockHandler.applyAction).toHaveBeenCalledWith(collider, collided);
  });

  test("should not apply action if no handler is found", () => {
    const mockHandler: ICollisionHandler = {
      applyAction: jest.fn(),
    };
    collisionHandlers.addCollisionAction("Snake", "Wall", mockHandler);

    const collider = { type: "Snake" } as IActor;
    const collided = { type: "Water" } as IActor;

    collisionHandlers.applyCollisionAction(collider, collided);

    expect(mockHandler.applyAction).not.toHaveBeenCalled();
  });

  test("should handle default collision actions", () => {
    const snakeCollisionFoodHandler = new SnakeCollisionFoodHandler();
    const snakeSnakeCollisionHandler = new SnakeSnakeCollisionHandler();

    const snake1 = new Snake(new Point(0, 0), 3);
    const snake2 = new Snake(new Point(1, 0), 3);
    const food = new Food(0, 0);

    collisionHandlers.addCollisionAction(
      "Snake",
      "Food",
      snakeCollisionFoodHandler,
    );
    collisionHandlers.addCollisionAction(
      "Snake",
      "Snake",
      snakeSnakeCollisionHandler,
    );

    jest.spyOn(snakeCollisionFoodHandler, "applyAction");
    jest.spyOn(snakeSnakeCollisionHandler, "applyAction");
    jest.spyOn(food, "eat");

    collisionHandlers.applyCollisionAction(snake1, food);
    collisionHandlers.applyCollisionAction(snake1, snake2);

    expect(snakeCollisionFoodHandler.applyAction).toHaveBeenCalledWith(
      snake1,
      food,
    );
    expect(food.eat).toHaveBeenCalled();
    expect(snakeSnakeCollisionHandler.applyAction).toHaveBeenCalledWith(
      snake1,
      snake2,
    );
  });

  test("should convert types to keys correctly", () => {
    expect(collisionHandlers.toKey("Snake", "Food")).toBe("Snake,Food");
    expect(collisionHandlers.toKey("Snake", "Snake")).toBe("Snake,Snake");
  });
});
