import WorldModel from "./WorldModel";
import Player from "./Player";

class GameController {
  private world: WorldModel;
  private _player1: Player;
  private _player2: Player;

  constructor(worldModel: WorldModel) {
    this.world = worldModel;
  }

  set player1(firstPlayer: Player) {
    this._player1 = firstPlayer;
  }

  get player1(): Player {
    return this._player1;
  }

  set player2(secondPlayer: Player) {
    this._player2 = secondPlayer;
  }

  get player2(): Player {
    return this._player2;
  }

  run() {
    let lastTime = 0;

    const updateFrame = () => {
      if (this.player1) this.player1.makeTurn();
      if (this.player2) this.player2.makeTurn();
      let currentTime = performance.now();
      let timeSinceLast = currentTime - lastTime;
      if (timeSinceLast > 250) {
        this.world.updateSteps(1);
        lastTime += 250;
      }
      requestAnimationFrame(updateFrame);
    };
    requestAnimationFrame(updateFrame);
  }
}

export default GameController;
