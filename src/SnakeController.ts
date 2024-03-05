import Snake from "./Snake";
import WorldModel from "./WorldModel";
import Point from "./Point";

class SnakeController {
    private snakeWorld: WorldModel;
    private slitherer: Snake;
    constructor(sw: WorldModel, slither: Snake) {
        this.snakeWorld = sw;
        this.slitherer = slither;
    };

    turnSnakeLeft() {
        this.slitherer.turnLeft();
    };

    turnSnakeRight() {
        this.slitherer.turnRight();
    };

    /**
    Returns the position of the snake controller's snake.
     */
    public get snakePosition(): Point {
        return this.slitherer.position;
    }

    /**
    Returns the direction of the snake controller's snake.
     */
    public get snakeDirection(): number {
        return this.slitherer.direction;
    }

    /**
    Returns the width of the snake controller's world model.
     */
    public get worldWidth(): number {
        return this.snakeWorld.width;
    }

    /**
    Returns the height of the snake controller's world model.
     */
    public get worldHeight(): number {
        return this.snakeWorld.height;
    }

};

export default SnakeController;
