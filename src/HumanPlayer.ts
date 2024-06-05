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
    if (this.iinputHandler.madeLeftMove()) {
      this.snakeController.turnSnakeLeft();
      this.iinputHandler.resetLeftMove();
    } else if (this.iinputHandler.madeRightMove()) {
      this.snakeController.turnSnakeRight();
      this.iinputHandler.resetRightMove();
    }
  }
}

export default HumanPlayer;
