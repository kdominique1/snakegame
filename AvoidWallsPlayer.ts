import Player from "./Player";

class AvoidWallsPlayer extends Player {
    constructor(private sc) {
        super(sc);
    }

    makeTurn() {
        this.sc.turnSnakeLeft();
    }
}

export default AvoidWallsPlayer;