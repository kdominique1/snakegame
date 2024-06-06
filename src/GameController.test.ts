import GameController from "./GameController";
import WorldModel from "./WorldModel";
import Snake from "./Snake";
import SnakeController from "./SnakeController";
import HumanPlayer from "./HumanPlayer";
import AvoidWallsPlayer from "./AvoidWallsPlayer";
import LRKeyInputHandler from "./LRKeyInputHandler";

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
    // Initialize the snakes
    snake1 = new Snake();
    snake2 = new Snake();

    // Initialize the world model with snake1
    worldModel = new WorldModel(snake1);

    // Initialize the input handler
    inputHandler1 = new LRKeyInputHandler();

    // Initialize snake controllers
    snakeController1 = new SnakeController(worldModel, snake1);
    snakeController2 = new SnakeController(worldModel, snake2);

    // Initialize players
    player1 = new HumanPlayer(snakeController1, inputHandler1);
    player2 = new AvoidWallsPlayer(snakeController2);

    // Initialize the game controller and set players
    gameController = new GameController(worldModel);
    gameController.player1 = player1;
    gameController.player2 = player2;

    // Mock requestAnimationFrame
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

    // There is a 5 ms delay, so it will trigger it after 255 seconds
    jest.advanceTimersByTime(1024);

    expect(worldModel.updateSteps).toHaveBeenCalledTimes(4);
  });
});
