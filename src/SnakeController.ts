import Snake from "./Snake";
import WorldModel from "./WorldModel";
import Point from "./Point";

class SnakeController {
    // Fix variables
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

    public get snakePosition(): Point {
        return this.slitherer.position;
    }

    public get snakeDirection() {
        return this.slitherer.direction;
    }

};

export default SnakeController;
