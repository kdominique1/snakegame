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

    // Don't need separate getters for x and y, just use the getters from the Point class
    public get snakePosition(): Point {
        return this.slitherer.position;
    }

    public get snakeDirection() {
        return this.slitherer.direction;
    }

    public get worldWidth() {
        return this.snakeWorld.width;
    }

    public get worldHeight() {
        return this.snakeWorld.height;
    }

};

export default SnakeController;
