import IActor from "./IActor";
import ICollisionHandler from "./ICollisionHandler";
import Snake from "./Snake";

class SnakeSnakeCollisionHandler implements ICollisionHandler {
  applyAction(snake1: Snake, snake2: Snake) {
    snake1.die();
  }
}

export default SnakeSnakeCollisionHandler;
