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

    public get snakePositionX() {
        return this.slitherer.positionX;
    }

    public get snakePositionY() {
        return this.slitherer.positionY;
    }

    public get snakeDirection() {
        return this.slitherer.direction;
    }

    public get worldModel_ () {
        return this.snakeWorld;
    }

};

export default SnakeController;
