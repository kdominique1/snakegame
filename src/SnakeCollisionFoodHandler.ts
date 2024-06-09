import Snake from "./Snake";
import IFood from "./IFood";

class SnakeCollisionFoodHandler {
  applyAction(snake: Snake, food: IFood) {
    food.eat();
    // snake.grow();
  }
}

export default SnakeCollisionFoodHandler;
