import Player from "./Player";

class AvoidWallsPlayer extends Player {
    constructor(private sc) {
        super(sc);
    }

    makeTurn() {
        if (this.sc.snakeDirection === -1 and this.sc.slitherer.) {
            this.sc.turnSnakeLeft();
        }
    }
}

export default AvoidWallsPlayer;