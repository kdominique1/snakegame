import AvoidWallsPlayer from '../src/AvoidWallsPlayer';
import SnakeController from '../src/SnakeController';

describe('AvoidWallsPlayer', () => {
    let sc: SnakeController;
    let player: AvoidWallsPlayer;

    beforeEach(() => {
        sc = new SnakeController();
        player = new AvoidWallsPlayer(sc);
        sc.worldWidth = 100; // Assuming world width
        sc.worldHeight = 100; // Assuming world height
    });

    it('should turn left when snake is moving left and hits the left wall', () => {
        sc.snakeDirection = -1; // Left
        sc.snakePosition = { x: 0, y: 50 }; // Near left wall
        player.makeTurn();
        expect(sc.turnSnakeLeft).toHaveBeenCalled();
    });

    it('should turn right when snake is moving up and hits the top wall', () => {
        sc.snakeDirection = 0; // Up
        sc.snakePosition = { x: 50, y: 100 }; // Near top wall
        player.makeTurn();
        expect(sc.turnSnakeRight).toHaveBeenCalled();
    });

    it('should turn left when snake is moving right and hits the right wall', () => {
        sc.snakeDirection = 1; // Right
        sc.snakePosition = { x: 100, y: 50 }; // Near right wall
        player.makeTurn();
        expect(sc.turnSnakeLeft).toHaveBeenCalled();
    });

    it('should turn right when snake is moving down and hits the bottom wall', () => {
        sc.snakeDirection = 2; // Down
        sc.snakePosition = { x: 50, y: 0 }; // Near bottom wall
        player.makeTurn();
        expect(sc.turnSnakeRight).toHaveBeenCalled();
    });

    // Additional scenarios for corners
    it('should turn right when snake is moving up and hits the top-left corner', () => {
        sc.snakeDirection = 0; // Up
        sc.snakePosition = { x: 0, y: 100 }; // Top-left corner
        player.makeTurn();
        expect(sc.turnSnakeRight).toHaveBeenCalled();
    });

    it('should turn left when snake is moving up and hits the top-right corner', () => {
        sc.snakeDirection = 0; // Up
        sc.snakePosition = { x: 100, y: 100 }; // Top-right corner
        player.makeTurn();
        expect(sc.turnSnakeLeft).toHaveBeenCalled();
    });

    it('should turn right when snake is moving down and hits the bottom-left corner', () => {
        sc.snakeDirection = 2; // Down
        sc.snakePosition = { x: 0, y: 0 }; // Bottom-left corner
        player.makeTurn();
        expect(sc.turnSnakeRight).toHaveBeenCalled();
    });

    it('should turn left when snake is moving down and hits the bottom-right corner', () => {
        sc.snakeDirection = 2; // Down
        sc.snakePosition = { x: 100, y: 0 }; // Bottom-right corner
        player.makeTurn();
        expect(sc.turnSnakeLeft).toHaveBeenCalled();
    });
});