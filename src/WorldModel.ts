import Snake from "./Snake";
// Step 5: Implement worldModel class
class WorldModel {

    // Step 5: Create snake outside of the class and pass it to the constructor to make an aggregation
    constructor(private snake: Snake) {
    };

    // Step 6: Add method updateSteps
    updateSteps(steps: number) {
        // Call snake's move method and pass the argument of steps
        this.snake.move(steps);
    }

    // Step 6: Create getter to get the snake so its position can be accessed later
    public get worldSnake() {
        return this.snake;
}

}

export default WorldModel;