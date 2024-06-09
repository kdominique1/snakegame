import GameController from "../src/GameController";
import WorldModel from "../src/WorldModel";
import Snake from "../src/Snake";
import SnakeController from "../src/SnakeController";
import HumanPlayer from "../src/HumanPlayer";
import AvoidWallsPlayer from "../src/AvoidWallsPlayer";
import LRKeyInputHandler from "../src/LRKeyInputHandler";
import Point from "../src/Point";

jest.useFakeTimers();

describe("GameController", () => {
  let snake1: Snake;
  let snake2: Snake;
  let worldModel: WorldModel;
  let snakeController1: SnakeController;
  let snakeController2: SnakeController;
  let inputHandler1: LRKeyInputHandler;
  let player1: HumanPlayer;
  let player2: AvoidWallsPlayer;
  let gameController: GameController;

  beforeEach(() => {
    snake1 = new Snake(new Point(0, 0), 3);
    snake2 = new Snake(new Point(10, 10), 3);

    worldModel = new WorldModel();
    worldModel.addSnake(snake1);
    worldModel.addSnake(snake2);

    inputHandler1 = new LRKeyInputHandler();

    snakeController1 = new SnakeController(worldModel, snake1);
    snakeController2 = new SnakeController(worldModel, snake2);

    player1 = new HumanPlayer(snakeController1, inputHandler1);
    player2 = new AvoidWallsPlayer(snakeController2);

    gameController = new GameController(worldModel);
    gameController.player1 = player1;
    gameController.player2 = player2;

    global.requestAnimationFrame = jest
      .fn()
      .mockImplementation((cb) => setTimeout(cb, 16));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should correctly set and get player1", () => {
    const newPlayer1 = new HumanPlayer(snakeController1, inputHandler1);
    gameController.player1 = newPlayer1;

    expect(gameController.player1).toBe(newPlayer1);
  });

  test("should correctly set and get player2", () => {
    const newPlayer2 = new AvoidWallsPlayer(snakeController2);
    gameController.player2 = newPlayer2;

    expect(gameController.player2).toBe(newPlayer2);
  });

  test("should return null for player1 if not set", () => {
    const tempGameController = new GameController(worldModel);

    expect(tempGameController.player1).toBe(null);
  });

  test("should return null for player2 if not set", () => {
    const tempGameController = new GameController(worldModel);

    expect(tempGameController.player2).toBe(null);
  });

  test("should call makeTurn on both players", () => {
    player1.makeTurn = jest.fn();
    player2.makeTurn = jest.fn();

    gameController.run();

    jest.advanceTimersByTime(300);

    expect(player1.makeTurn).toHaveBeenCalled();
    expect(player2.makeTurn).toHaveBeenCalled();
  });

  test("should call updateSteps on world model after 250 ms", () => {
    worldModel.updateSteps = jest.fn();
    player1.makeTurn = jest.fn();
    player2.makeTurn = jest.fn();

    gameController.run();

    jest.advanceTimersByTime(300);

    expect(worldModel.updateSteps).toHaveBeenCalledWith(1);
  });

  test("should not call updateSteps if less than 250 ms have passed", () => {
    worldModel.updateSteps = jest.fn();
    player1.makeTurn = jest.fn();
    player2.makeTurn = jest.fn();

    gameController.run();

    jest.advanceTimersByTime(200);

    expect(worldModel.updateSteps).not.toHaveBeenCalled();
  });

  test("should call updateSteps multiple times if multiple intervals have passed", () => {
    worldModel.updateSteps = jest.fn();
    player1.makeTurn = jest.fn();
    player2.makeTurn = jest.fn();

    gameController.run();

    jest.advanceTimersByTime(1024);

    expect(worldModel.updateSteps).toHaveBeenCalledTimes(4);
  });

  test("should call makeTurn and influence snake position", () => {
    const initialPosition = new Point(0, 0);
    jest
      .spyOn(snakeController2, "snakePosition", "get")
      .mockReturnValue(initialPosition);

    player2.makeTurn = jest.fn();
    gameController.run();

    jest.advanceTimersByTime(300);

    expect(player2.makeTurn).toHaveBeenCalled();

    const updatedPosition = snakeController2.snakePosition;
    expect(updatedPosition).not.toEqual(initialPosition);
  });

  test("should call makeTurn and ensure AvoidWallsPlayer changes direction at boundaries", () => {
    const boundaryPosition = new Point(100, 0);
    jest
      .spyOn(snakeController2, "snakePosition", "get")
      .mockReturnValue(boundaryPosition);
    jest.spyOn(snakeController2, "snakeDirection", "get").mockReturnValue(1);

    player2.makeTurn = jest.fn();
    snakeController2.turnSnakeRight = jest.fn();
    gameController.run();

    jest.advanceTimersByTime(300);
    console.log(snakeController2.snakePosition);
    console.log(snakeController2.snakeDirection);

    // Fix - It is calling makeTurn, but turnSnakeRight is not being called

    expect(player2.makeTurn).toHaveBeenCalled();

    expect(snakeController2.turnSnakeRight).toHaveBeenCalled();
  });
});
