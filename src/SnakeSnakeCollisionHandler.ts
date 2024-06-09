import Snake from "./Snake";

class SnakeSnakeCollisionHandler {
  applyAction(s1: Snake, s2: Snake) {
    s1.die();
  }
}

export default SnakeSnakeCollisionHandler;
