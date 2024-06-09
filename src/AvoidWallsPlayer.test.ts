import AvoidWallsPlayer from "../src/AvoidWallsPlayer";
import SnakeController from "../src/SnakeController";
import Snake from "../src/Snake";
import WorldModel from "../src/WorldModel";
import Point from "../src/Point";

describe("AvoidWallsPlayer", () => {
  let sc: SnakeController;
  let player: AvoidWallsPlayer;
  let mockSnake: Snake;
  let mockWorld: WorldModel;

  beforeEach(() => {
    mockSnake = new Snake(new Point(50, 50), 3);
    mockWorld = new WorldModel();
    mockWorld.addSnake(mockSnake);
    sc = new SnakeController(mockWorld, mockSnake);
    player = new AvoidWallsPlayer(sc);

    jest.spyOn(sc, "worldWidth", "get").mockReturnValue(100);
    jest.spyOn(sc, "worldHeight", "get").mockReturnValue(100);
    jest.spyOn(sc, "snakePosition", "get").mockReturnValue(new Point(50, 50));

    jest.spyOn(sc, "turnSnakeLeft").mockImplementation(() => {});
    jest.spyOn(sc, "turnSnakeRight").mockImplementation(() => {});
  });

  it("should turn left when snake is moving left and hits the left wall", () => {
    jest.spyOn(sc, "snakeDirection", "get").mockReturnValue(-1);
    jest.spyOn(sc, "snakePosition", "get").mockReturnValue(new Point(0, 49));
    player.makeTurn();
    expect(sc.turnSnakeLeft).toHaveBeenCalled();
  });

  it("should turn left when snake is moving down and is at the bottom-left corner", () => {
    jest.spyOn(sc, "snakeDirection", "get").mockReturnValue(2);
    jest.spyOn(sc, "snakePosition", "get").mockReturnValue(new Point(25, 100));
    player.makeTurn();
    expect(sc.turnSnakeLeft).toHaveBeenCalled();
  });

  it("should turn left when snake is moving up and is at the top-right corner", () => {
    jest.spyOn(sc, "snakeDirection", "get").mockReturnValue(0);
    jest.spyOn(sc, "snakePosition", "get").mockReturnValue(new Point(75, 0));
    player.makeTurn();
    expect(sc.turnSnakeLeft).toHaveBeenCalled();
  });

  it("should turn left when snake is moving right and is at the bottom-right corner", () => {
    jest.spyOn(sc, "snakeDirection", "get").mockReturnValue(1);
    jest.spyOn(sc, "snakePosition", "get").mockReturnValue(new Point(100, 75));
    player.makeTurn();
    expect(sc.turnSnakeLeft).toHaveBeenCalled();
  });

  it("should turn right when snake is moving up and is at the bottom-left corner", () => {
    jest.spyOn(sc, "snakeDirection", "get").mockReturnValue(0);
    jest.spyOn(sc, "snakePosition", "get").mockReturnValue(new Point(25, 0));
    player.makeTurn();
    expect(sc.turnSnakeRight).toHaveBeenCalled();
  });

  it("should turn right when snake is moving right and is at the top-left corner", () => {
    jest.spyOn(sc, "snakeDirection", "get").mockReturnValue(1);
    jest.spyOn(sc, "snakePosition", "get").mockReturnValue(new Point(100, 25));
    player.makeTurn();
    expect(sc.turnSnakeRight).toHaveBeenCalled();
  });

  it("should turn right when snake is moving down and is at the top-right corner", () => {
    jest.spyOn(sc, "snakeDirection", "get").mockReturnValue(2);
    jest.spyOn(sc, "snakePosition", "get").mockReturnValue(new Point(75, 100));
    player.makeTurn();
    expect(sc.turnSnakeRight).toHaveBeenCalled();
  });

  it("should turn right when snake is moving left and is at the bottom-left corner", () => {
    jest.spyOn(sc, "snakeDirection", "get").mockReturnValue(-1);
    jest.spyOn(sc, "snakePosition", "get").mockReturnValue(new Point(0, 100));
    player.makeTurn();
    expect(sc.turnSnakeRight).toHaveBeenCalled();
  });
});
