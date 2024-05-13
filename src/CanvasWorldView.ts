import IWorldView from "./IWorldView";
import WorldModel from "./WorldModel";

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

    // Draw the snake
    this.context.fillStyle = "green"; // Set the color of the snake

    this.context.fillRect(
      worldModel.snake.position.x * this.scalingFactor,
      worldModel.snake.position.y * this.scalingFactor,
      this.scalingFactor,
      this.scalingFactor,
    );
  }
}

export default CanvasWorldView;
