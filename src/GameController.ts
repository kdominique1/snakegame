import WorldModel from "./WorldModel";
import Player from "./Player";

/**
 * GameController class is responsible for managing the game loop,
 * updating the world state, and coordinating the players' turns.
 */
class GameController {
  private world: WorldModel;
  private _player1: Player;
  private _player2: Player;

  /**
   * Creates an instance of GameController.
   * @param worldModel - An instance of WorldModel representing the game world.
   */
  constructor(worldModel: WorldModel) {
    this.world = worldModel;
    this._player1 = null!;
    this._player2 = null!;
  }

  /**
   * Sets the first player.
   * @param firstPlayer - An instance of Player representing the first player.
   */
  set player1(firstPlayer: Player) {
    this._player1 = firstPlayer;
  }

  /**
   * Gets the first player.
   * @returns The first player.
   */
  get player1(): Player {
    return this._player1;
  }

  /**
   * Sets the second player.
   * @param secondPlayer - An instance of Player representing the second player.
   */
  set player2(secondPlayer: Player) {
    this._player2 = secondPlayer;
  }

  /**
   * Gets the second player.
   * @returns The second player.
   */
  get player2(): Player {
    return this._player2;
  }

  /**
   * Starts the game loop, updates player turns and the world state.
   */
  run() {
    let lastTime = performance.now();

    const updateFrame = () => {
      if (this.player1) this.player1.makeTurn();
      if (this.player2) this.player2.makeTurn();
      let currentTime = performance.now();
      let timeSinceLast = currentTime - lastTime;
      if (timeSinceLast > 250) {
        this.world.updateSteps(1);
        lastTime = currentTime;
      }
      requestAnimationFrame(updateFrame);
    };
    requestAnimationFrame(updateFrame);
  }
}

export default GameController;
