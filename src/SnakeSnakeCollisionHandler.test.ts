import SnakeSnakeCollisionHandler from "./SnakeSnakeCollisionHandler";
import Snake from "./Snake";
import Point from "./Point";

jest.mock("./Snake");

describe("SnakeSnakeCollisionHandler", () => {
  let handler: SnakeSnakeCollisionHandler;
  let snake1: Snake;
  let snake2: Snake;

  beforeEach(() => {
    handler = new SnakeSnakeCollisionHandler();
    snake1 = new Snake(new Point(0, 0), 3);
    snake2 = new Snake(new Point(1, 0), 3);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should call die method on the first snake", () => {
    const dieSpy = jest.spyOn(snake1, "die");

    handler.applyAction(snake1, snake2);

    expect(dieSpy).toHaveBeenCalled();
  });

  test("should not call die method on the second snake", () => {
    const dieSpy = jest.spyOn(snake2, "die");

    handler.applyAction(snake1, snake2);

    expect(dieSpy).not.toHaveBeenCalled();
  });
});
