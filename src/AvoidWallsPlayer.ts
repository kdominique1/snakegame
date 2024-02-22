import Player from "./Player";
import SnakeController from "./SnakeController";

class AvoidWallsPlayer extends Player {
    constructor(public sc: SnakeController) {
        super(sc);
    }

    makeTurn() {
        if (this.sc.snakeDirection === -1) {
            this.sc.turnSnakeLeft();
        }
    }
}

export default AvoidWallsPlayer;