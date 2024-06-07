import IWorldView from "./IWorldView";
import WorldModel from "./WorldModel";
import Snake from "./Snake";

/** Class implementing the IWorldView interface to display the world model on a canvas. */
class CanvasWorldView implements IWorldView {
  private scalingFactor: number;
  private worldCanvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  /**
   * Constructs a new CanvasWorldView.
   * @param scalingFactor - The number of pixels squared that each model grid coordinate represents.
   */
  constructor(scalingFactor: number) {
    this.scalingFactor = scalingFactor;
    this.worldCanvas = document.createElement("canvas");
    this.context = this.worldCanvas.getContext("2d")!;
    document.body.appendChild(this.worldCanvas);
  }

  /**
   * Displays the world model on the canvas.
   * @param worldModel - The world model to display.
   */
  display(worldModel: WorldModel): void {
    this.worldCanvas.width = worldModel.width * this.scalingFactor;
    this.worldCanvas.height = worldModel.height * this.scalingFactor;

    // Clear the canvas before drawing
    this.context.clearRect(
      0,
      0,
      this.worldCanvas.width,
      this.worldCanvas.height,
    );

    // Draw each part of each snake
    worldModel.snakes.forEach((snake: Snake) => {
      this.context.fillStyle = "green"; // Set the color of the snake
      snake.getCurrentParts.forEach((part) => {
        this.context.fillRect(
          part.x * this.scalingFactor,
          part.y * this.scalingFactor,
          this.scalingFactor,
          this.scalingFactor,
        );
      });
    });
  }

  public get canvasWidth(): number {
    return this.worldCanvas.width;
  }

  public get canvasHeight(): number {
    return this.worldCanvas.height;
  }

  public get canvasContext(): CanvasRenderingContext2D {
    return this.context;
  }
}

export default CanvasWorldView;
