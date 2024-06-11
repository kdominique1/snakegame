import CanvasWorldView from "../src/CanvasWorldView";
import WorldModel from "../src/WorldModel";
import Snake from "../src/Snake";
import Point from "../src/Point";
import ActorCollisionHandlers from "../src/ActorCollisionHandlers";

describe("CanvasWorldView", () => {
  let canvasWorldView: CanvasWorldView;
  let worldModel: WorldModel;
  let snake: Snake;
  let scalingFactor = 10;

  beforeEach(() => {
    snake = new Snake(new Point(0, 0), 3);
    const mockCollisionHandlers = new ActorCollisionHandlers();
    worldModel = new WorldModel(100, 100, mockCollisionHandlers);
    worldModel.addActor(snake);
    canvasWorldView = new CanvasWorldView(scalingFactor);
    worldModel.addView(canvasWorldView);

    // Mock the getContext method to return a fake context
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    jest.spyOn(document, "getElementById").mockReturnValue(canvas);
    jest.spyOn(canvas, "getContext").mockReturnValue(context);
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
      worldModel.width * scalingFactor,
      worldModel.height * scalingFactor,
    );
  });

  it("should draw each part of the snake at the correct positions", () => {
    snake.move(5);
    const fillRectSpy = jest.spyOn(canvasWorldView.canvasContext, "fillRect");
    canvasWorldView.display(worldModel);

    snake.getCurrentParts.forEach((part) => {
      const expectedX = part.x * scalingFactor;
      const expectedY = part.y * scalingFactor;
      expect(fillRectSpy).toHaveBeenCalledWith(
        expectedX,
        expectedY,
        scalingFactor,
        scalingFactor,
      );
    });

    fillRectSpy.mockRestore();
  });
});
