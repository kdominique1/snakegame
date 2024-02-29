import Snake from "./Snake";
/** Class representing a world model. */
class WorldModel {

    private width_: number;
    private height_: number; 
    private snake_: Snake;
    /**
    Creates a new world model that is an aggregation of a snake by passing the snake as an argument.
    @param snake - The snake for the world model.
    */
    constructor(snake: Snake) {
        this.width_ = 100;
        this.height_ = 100;
        this.snake_ = snake;
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
    // No undeerscores on getters
    public get snake() {
        return this.snake_;
    }

    public get width(): number {
        return this.width;
    }

    public get height(): number {
        return this.height;
    }

}

export default WorldModel;