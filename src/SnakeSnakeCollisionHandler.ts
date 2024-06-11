import Snake from "./Snake";
import ICollisionHandler from "./ICollisionHandler";

class SnakeSnakeCollisionHandler implements ICollisionHandler {
  applyAction(s1: Snake, s2: Snake) {
    s1.die();
  }
}

export default SnakeSnakeCollisionHandler;
