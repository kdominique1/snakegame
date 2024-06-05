import CanvasWorldView from "../src/CanvasWorldView";
import IWorldView from "./IWorldView";
import WorldModel from "../src/WorldModel";
import Snake from "../src/Snake";

describe("CanvasWorldView", () => {
  let canvasWorldView: CanvasWorldView;
  let worldModel: WorldModel;
  let snake: Snake;
  let scalingFactor = 10;

  beforeEach(() => {
    snake = new Snake();
    worldModel = new WorldModel(snake);
    canvasWorldView = new CanvasWorldView(scalingFactor);
    worldModel.view = canvasWorldView;
  });

  it("should correctly set canvas dimensions based on world model dimensions and scaling factor", () => {
    const expectedWidth = worldModel.width * scalingFactor;
    const expectedHeight = worldModel.height * scalingFactor;
    canvasWorldView.display(worldModel);
    expect(canvasWorldView.canvasWidth).toBe(expectedWidth);
    expect(canvasWorldView.canvasHeight).toBe(expectedHeight);
  });

  it("should clear the canvas before redrawing", () => {
    const clearRectSpy = jest.spyOn(canvasWorldView.canvasContext, "clearRect");
    canvasWorldView.display(worldModel);
    expect(clearRectSpy).toHaveBeenCalledWith(
      0,
      0,
      worldModel.width * 10,
      worldModel.height * 10,
    );
  });

  it("should draw the snake at the correct position", () => {
    snake.move(5); // Move snake right 5 spaces
    canvasWorldView.display(worldModel);
    const expectedX = snake.position.x * 10;
    const expectedY = snake.position.y * 10;
    const fillRectSpy = jest.spyOn(canvasWorldView.canvasContext, "fillRect");
    expect(fillRectSpy).toHaveBeenCalledWith(expectedX, expectedY, 10, 10);
  });
});
