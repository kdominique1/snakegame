import SnakeController from "./SnakeController";

abstract class Player {
    constructor(private sc: SnakeController) {
}

    abstract makeTurn(): void;
}

export default Player;