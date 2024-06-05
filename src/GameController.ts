import WorldModel from "./WorldModel";
import Player from "./Player";

class GameController {
  private world: WorldModel;

  constructor(worldModel: WorldModel) {
    this.world = worldModel;
  }

  set player1(firstPlayer: Player) {
    this.player1 = firstPlayer;
  }

  set player2(secondPlayer: Player) {
    this.player2 = secondPlayer;
  }

  run() {
    let lastTime = 0;
  }

  requestAnimationFrame() {
    this.updateFrame();
  }

  updateFrame() {
    this.player1.makeTurn();
    this.player2.makeTurn();
    let currentTime = performance.now();
    let timeSinceLast = currentTime - lastTime;
    if (timeSinceLast > 250) {
      this.world.updateSteps(1);
      lastTime += 250;
    }
    this.requestAnimationFrame();
  }
}

export default GameController;
