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
    mockSnake = new Snake(); // Assuming Snake has a suitable constructor
    mockWorld = new WorldModel(mockSnake); // Corrected to pass only Snake
    sc = new SnakeController(mockWorld, mockSnake);
    player = new AvoidWallsPlayer(sc);

    // Mock getters
    jest.spyOn(sc, "worldWidth", "get").mockReturnValue(100);
    jest.spyOn(sc, "worldHeight", "get").mockReturnValue(100);
    jest.spyOn(sc, "snakePosition", "get").mockReturnValue(new Point(50, 50)); // Default position

    // Mock methods
    jest.spyOn(sc, "turnSnakeLeft").mockImplementation(() => {});
    jest.spyOn(sc, "turnSnakeRight").mockImplementation(() => {});
  });

  // Test scenarios for turning left
  it("should turn left when snake is moving left and hits the left wall", () => {
    jest.spyOn(sc, "snakeDirection", "get").mockReturnValue(-1); // Left
    jest.spyOn(sc, "snakePosition", "get").mockReturnValue(new Point(0, 25)); // Near left wall, less than half height
    player.makeTurn();
    expect(sc.turnSnakeLeft).toHaveBeenCalled();
  });

  it("should turn left when snake is moving down and is at the top-left corner", () => {
    jest.spyOn(sc, "snakeDirection", "get").mockReturnValue(2); // Down
    jest.spyOn(sc, "snakePosition", "get").mockReturnValue(new Point(25, 0)); // Top-left corner, less than half width
    player.makeTurn();
    expect(sc.turnSnakeLeft).toHaveBeenCalled();
  });

  it("should turn left when snake is moving up and is at the bottom-right corner", () => {
    jest.spyOn(sc, "snakeDirection", "get").mockReturnValue(0); // Up
    jest.spyOn(sc, "snakePosition", "get").mockReturnValue(new Point(75, 100)); // Bottom-right corner, more than half width
    player.makeTurn();
    expect(sc.turnSnakeLeft).toHaveBeenCalled();
  });

  it("should turn left when snake is moving right and is at the top-right corner", () => {
    jest.spyOn(sc, "snakeDirection", "get").mockReturnValue(1); // Right
    jest.spyOn(sc, "snakePosition", "get").mockReturnValue(new Point(100, 75)); // Top-right corner, more than half height
    player.makeTurn();
    expect(sc.turnSnakeLeft).toHaveBeenCalled();
  });

  // Test scenarios for turning right
  it("should turn right when snake is moving up and is at the top-left corner", () => {
    jest.spyOn(sc, "snakeDirection", "get").mockReturnValue(0); // Up
    jest.spyOn(sc, "snakePosition", "get").mockReturnValue(new Point(25, 100)); // Top-left corner, less than half width
    player.makeTurn();
    expect(sc.turnSnakeRight).toHaveBeenCalled();
  });

  it("should turn right when snake is moving right and is at the top-left corner", () => {
    jest.spyOn(sc, "snakeDirection", "get").mockReturnValue(1); // Right
    jest.spyOn(sc, "snakePosition", "get").mockReturnValue(new Point(100, 25)); // Top-left corner, less than half height
    player.makeTurn();
    expect(sc.turnSnakeRight).toHaveBeenCalled();
  });

  it("should turn right when snake is moving down and is at the bottom-right corner", () => {
    jest.spyOn(sc, "snakeDirection", "get").mockReturnValue(2); // Down
    jest.spyOn(sc, "snakePosition", "get").mockReturnValue(new Point(75, 0)); // Bottom-right corner, more than half width
    player.makeTurn();
    expect(sc.turnSnakeRight).toHaveBeenCalled();
  });

  it("should turn right when snake is moving left and is at the bottom-left corner", () => {
    jest.spyOn(sc, "snakeDirection", "get").mockReturnValue(-1); // Left
    jest.spyOn(sc, "snakePosition", "get").mockReturnValue(new Point(0, 49)); // Bottom-left corner, less than half height assuming worldHeight is 100
    player.makeTurn();
    expect(sc.turnSnakeRight).toHaveBeenCalled();
  });
});
