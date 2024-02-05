import Snake from "./Snake";
import WorldModel from "./WorldModel";

class SnakeController {
    constructor(private snakeWorld: WorldModel, private slitherer: Snake) {
    };

    turnSnakeLeft() {
        this.slitherer.turnLeft();
    };

    turnSnakeRight() {
        this.slitherer.turnRight();
    };

    public get snakePosition() {
        return this.slitherer.position;
    }

    public get snakeDirection() {
        return this.slitherer.direction;
    }

};

export default SnakeController;
