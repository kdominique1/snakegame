import AvoidWallsPlayer from '../src/AvoidWallsPlayer';
import SnakeController from '../src/SnakeController';
import Snake from '../src/Snake';
import WorldModel from '../src/WorldModel';
import Point from '../src/Point';

describe('AvoidWallsPlayer', () => {
    let sc: SnakeController;
    let player: AvoidWallsPlayer;
    let mockSnake: Snake;
    let mockWorld: WorldModel;

    beforeEach(() => {
        mockSnake = new Snake(); // Assuming Snake has a suitable constructor
        mockWorld = new WorldModel(100, 100); // Assuming WorldModel takes width and height as args
        sc = new SnakeController(mockWorld, mockSnake);
        player = new AvoidWallsPlayer(sc);

        // Mock getters
        jest.spyOn(sc, 'worldWidth', 'get').mockReturnValue(100);
        jest.spyOn(sc, 'worldHeight', 'get').mockReturnValue(100);

        // Mock methods
        jest.spyOn(sc, 'turnSnakeLeft').mockImplementation(() => {});
        jest.spyOn(sc, 'turnSnakeRight').mockImplementation(() => {});
    });

    it('should turn left when snake is moving left and hits the left wall', () => {
        jest.spyOn(sc, 'snakeDirection', 'get').mockReturnValue(-1); // Left
        jest.spyOn(sc, 'snakePosition', 'get').mockReturnValue(new Point(0, 50)); // Near left wall
        player.makeTurn();
        expect(sc.turnSnakeLeft).toHaveBeenCalled();
    });

    it('should turn right when snake is moving up and hits the top wall', () => {
        jest.spyOn(sc, 'snakeDirection', 'get').mockReturnValue(0); // Up
        jest.spyOn(sc, 'snakePosition', 'get').mockReturnValue(new Point(50, 100)); // Near top wall
        player.makeTurn();
        expect(sc.turnSnakeRight).toHaveBeenCalled();
    });

    it('should turn left when snake is moving right and hits the right wall', () => {
        jest.spyOn(sc, 'snakeDirection', 'get').mockReturnValue(1); // Right
        jest.spyOn(sc, 'snakePosition', 'get').mockReturnValue(new Point(100, 50)); // Near right wall
        player.makeTurn();
        expect(sc.turnSnakeLeft).toHaveBeenCalled();
    });

    it('should turn right when snake is moving down and hits the bottom wall', () => {
        jest.spyOn(sc, 'snakeDirection', 'get').mockReturnValue(2); // Down
        jest.spyOn(sc, 'snakePosition', 'get').mockReturnValue(new Point(50, 0)); // Near bottom wall
        player.makeTurn();
        expect(sc.turnSnakeRight).toHaveBeenCalled();
    });

    // Additional scenarios for corners
    it('should turn right when snake is moving up and hits the top-left corner', () => {
        jest.spyOn(sc, 'snakeDirection', 'get').mockReturnValue(0); // Up
        jest.spyOn(sc, 'snakePosition', 'get').mockReturnValue(new Point(0, 100)); // Top-left corner
        player.makeTurn();
        expect(sc.turnSnakeRight).toHaveBeenCalled();
    });

    it('should turn left when snake is moving up and hits the top-right corner', () => {
        jest.spyOn(sc, 'snakeDirection', 'get').mockReturnValue(0); // Up
        jest.spyOn(sc, 'snakePosition', 'get').mockReturnValue(new Point(100, 100)); // Top-right corner
        player.makeTurn();
        expect(sc.turnSnakeLeft).toHaveBeenCalled();
    });

    it('should turn right when snake is moving down and hits the bottom-left corner', () => {
        jest.spyOn(sc, 'snakeDirection', 'get').mockReturnValue(2); // Down
        jest.spyOn(sc, 'snakePosition', 'get').mockReturnValue(new Point(0, 0)); // Bottom-left corner
        player.makeTurn();
        expect(sc.turnSnakeRight).toHaveBeenCalled();
    });

    it('should turn left when snake is moving down and hits the bottom-right corner', () => {
        jest.spyOn(sc, 'snakeDirection', 'get').mockReturnValue(2); // Down
        jest.spyOn(sc, 'snakePosition', 'get').mockReturnValue(new Point(100, 0)); // Bottom-right corner
        player.make