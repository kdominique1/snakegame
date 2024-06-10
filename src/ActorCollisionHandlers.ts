import IActor from "./IActor";
import ICollisionHandler from "./ICollisionHandler";

class ActorCollisionHandlers {
  private pairs: Map<string, ICollisionHandler>;

  constructor() {
    this.pairs = new Map();
  }

  toKey(colliderType: string, collidedType: string): string {
    return `${colliderType},${collidedType}`;
  }

  addCollisionAction(
    colliderType: string,
    collidedType: string,
    actionApplicator: ICollisionHandler,
  ) {
    const key = this.toKey(colliderType, collidedType);
    this.pairs.set(key, actionApplicator);
  }

  hasCollisionAction(colliderType: string, collidedType: string): boolean {
    const key = this.toKey(colliderType, collidedType);
    return this.pairs.has(key);
  }

  applyCollisionAction(collider: IActor, collided: IActor): void {
    const key = this.toKey(collider.type, collided.type);
    if (this.pairs.has(key)) {
      const handler = this.pairs.get(key)!;
      handler.applyAction(collider, collided);
    }
  }
}

export default ActorCollisionHandlers;
