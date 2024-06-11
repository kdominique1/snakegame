import Snake from "./Snake";
import Food from "./Food";
import ICollisionHandler from "./ICollisionHandler";

class SnakeCollisionFoodHandler implements ICollisionHandler {
  applyAction(snake: Snake, food: Food) {
    food.eat();
    snake.grow();
  }
}

export default SnakeCollisionFoodHandler;
