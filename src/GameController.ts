import WorldModel from "./WorldModel";

class GameController {
  private world: WorldModel;

  constructor(worldModel: WorldModel) {
    this.world = worldModel;
  }

  run() {}

  updateFrame() {}

  requestAnimationFrame() {}
}

export default GameController;
