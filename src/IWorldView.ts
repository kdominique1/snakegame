import WorldModel from "./WorldModel";

/** Interface representing a view of the world model. */
interface IWorldView {
  /**
   * Displays the world model.
   * @param worldModel - The world model to display.
   */
  display(worldModel: WorldModel): void;
}

export default IWorldView;
