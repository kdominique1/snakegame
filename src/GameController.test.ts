import GameController from "./GameController";
import WorldModel from "./WorldModel";
import Player from "./Player";
import Snake from "./Snake";
import SnakeController from "./SnakeController";
import HumanPlayer from "./HumanPlayer";
import AvoidWallsPlayer from "./AvoidWallsPlayer";
import LRKeyInputHandler from "./LRKeyInputHandler";

jest.useFakeTimers();

describe("GameController", () => {
  let snake1: Snake;
  let worldModel: WorldModel;
  let player1: HumanPlayer;
  let player2: AvoidWallsPlayer;
  let snakeController1: SnakeController;
  let snakeController2: SnakeController;
  let iinputHandler1: LRKeyInputHandler;
  let gameController: GameController;

  beforeEach(() => {
    worldModel = new WorldModel(snake1);
    iinputHandler1 = new LRKeyInputHandler();
    player1 = new HumanPlayer(snakeController1, iinputHandler1);
    player2 = new AvoidWallsPlayer(snakeController2);
    gameController = new GameController(worldModel);
    gameController.player1 = player1;
    gameController.player2 = player2;
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

    jest.advanceTimersByTime(1000);

    expect(worldModel.updateSteps).toHaveBeenCalledTimes(4);
  });
});
