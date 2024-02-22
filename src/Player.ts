import SnakeController from "./SnakeController";

abstract class Player {
    constructor(public sc: SnakeController) {
}

    abstract makeTurn(): void;
}

export default Player;