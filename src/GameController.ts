import WorldModel from "./WorldModel";
import Player from "./Player";
import Game from "./Game";
import ActorCollisionHandlers from "./ActorCollisionHandlers";
import Snake from "./Snake";
import SnakeController from "./SnakeController";
import LRKeyInputHandler from "./LRKeyInputHandler";
import HumanPlayer from "./HumanPlayer";
import AvoidWallsPlayer from "./AvoidWallsPlayer";
import WorldLoader from "./WorldLoader";
import CanvasWorldView from "./CanvasWorldView";
import Point from "./Point";
import SnakeSnakeCollisionHandler from "./SnakeSnakeCollisionHandler";
import SnakeCollisionFoodHandler from "./SnakeCollisionFoodHandler";

class GameController {
  private world: WorldModel;
  private game: Game;
  private players: Player[] = [];
  private worldView: CanvasWorldView;
  private keyHandlers: LRKeyInputHandler[] = [];

  constructor(g: Game) {
    this.game = g;

    const collisionHandlers = new ActorCollisionHandlers();
    collisionHandlers.addCollisionAction(
      "snake",
      "food",
      new SnakeCollisionFoodHandler(),
    );
    collisionHandlers.addCollisionAction(
      "snake",
      "snake",
      new SnakeSnakeCollisionHandler(),
    );

    this.world = new WorldModel(100, 100, collisionHandlers);
    this.worldView = new CanvasWorldView(15);
    this.world.addView(this.worldView);
  }

  init(data: { numOfHumanPlayers: number; numOfAIPlayers: number }) {
    const totalPlayers = data.numOfHumanPlayers + data.numOfAIPlayers;

    for (let i = 0; i < totalPlayers; i++) {
      const snake = new Snake(new Point(0, 0), 3);
      const snakeController = new SnakeController(this.world, snake);

      if (i < data.numOfHumanPlayers) {
        const keyHandler = new LRKeyInputHandler();
        this.keyHandlers.push(keyHandler);
        this.players.push(new HumanPlayer(snakeController, keyHandler));
      } else {
        this.players.push(new AvoidWallsPlayer(snakeController));
      }

      snake.position = new Point(10 * (i % 5), 10 * Math.floor(i / 5));
      this.world.addActor(snake);
    }

    const worldLoader = new WorldLoader();
    worldLoader.readData(["f", "f", "f"], this.world);

    this.setupKeyboardListeners();
    this.run();
  }

  private setupKeyboardListeners(): void {
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      this.keyHandlers.forEach((handler) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          (handler as any).handleKeydown(event);
        }
      });
    });
  }

  run() {
    let lastTime = performance.now();

    const drawFrame = () => {
      this.players.forEach((player) => player.makeTurn());

      const currentTime = performance.now();
      const timeSinceLast = currentTime - lastTime;

      if (timeSinceLast > 250) {
        this.world.updateSteps(1);
        lastTime = currentTime;
      }

      if (this.players.filter((player) => player.isActive()).length > 1) {
        requestAnimationFrame(drawFrame);
      } else {
        this.endGame();
      }
    };

    requestAnimationFrame(drawFrame);
  }

  private endGame() {
    this.players = [];
    this.worldView.dispose();
    this.game.switchContext({});
  }
}

export default GameController;
