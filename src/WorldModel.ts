import Snake from "./Snake";
/** Class representing a world model. */
class WorldModel {

    private width: number;
    private height: number; 
    /**
    Creates a new world model that is an aggregation of a snake by passing the snake as an argument.
    @param snake - The snake for the world model.
    */
    constructor(private snake: Snake) {
        this.width = 100;
        this.height = 100;
    };

    /** 
    Updates the steps the snake has moved using the move method of the snake class.
    @param steps - The number of steps for the snake to move.
     */
    updateSteps(steps: number) {
        this.snake.move(steps);
    }

    /** 
    Returns the world model's snake.
    */
    public get worldSnake() {
        return this.snake;
}

    public get worldWidth() {
        return this.width;
    }

    public get worldHeight() {
        return this.height;
    }

}

export default WorldModel;