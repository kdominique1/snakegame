class LRKeyInputHandler {
  private wasLeftArrowPushed: boolean;
  private wasRightArrowPushed: boolean;

  constructor() {
    this.wasLeftArrowPushed = false;
    this.wasRightArrowPushed = false;
  }

  // Event listener
  private handleKeydown(event: KeyboardEvent): void {
    if (event.key === "ArrowLeft") {
      this.wasLeftArrowPushed = true;
    } else if (event.key === "ArrowRight") {
      this.wasRightArrowPushed = true;
    }
  }

  public resetLeftMove() {
    this.wasLeftArrowPushed = false;
  }

  public resetRightMove() {
    this.wasRightArrowPushed = false;
  }

  public get madeLeftMove(): boolean {
    return this.wasLeftArrowPushed;
  }

  public get madeRightMove(): boolean {
    return this.wasRightArrowPushed;
  }
}

export default LRKeyInputHandler;
