interface IInputHandler {
  /**
   * Returns true when the player inputs a left move.
   */
  madeLeftMove(): void;

  /**
   * Returns true when the player inputs a right move.
   */
  madeRightMove(): void;

  /**
   * Resets when the player makes a left move.
   */
  resetLeftMove(): void;

  /**
   * Resets when the player makes a right move.
   */
  resetRightMove(): void;
}

export default IInputHandler;