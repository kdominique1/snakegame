import Snake from "./Snake";
import Food from "./Food";

class SnakeCollisionFoodHandler {
  applyAction(snake: Snake, food: Food) {
    food.eat();
    snake.grow();
  }
}

export default SnakeCollisionFoodHandler;
