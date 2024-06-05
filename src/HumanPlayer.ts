import SnakeController from "./SnakeController";
import IInputHandler from "./IInputHandler";

class HumanPlayer {
  private snakeController: SnakeController;
  private iinputHandler: IInputHandler;

  constructor(snakeController: SnakeController, iinputHandler: IInputHandler) {
    this.snakeController = snakeController;
    this.iinputHandler = iinputHandler;
  }

  makeTurn() {
    if (this.iinputHandler.madeLeftMove === true) {
      this.snakeController.turnSnakeLeft();
      iinputHandler.resetLeftMove();
    } else if (this.iinputHandler.madeRightMove === true) {
      this.snakeController.turnSnakeRight();
      iinputHandler.resetRightMove();
    }
  }
}

export default HumanPlayer;
