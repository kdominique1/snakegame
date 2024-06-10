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
    let key = this.toKey(colliderType, collidedType);
    this.pairs.set(key, actionApplicator);
  }

  hasCollisionAction(colliderType: string, collidedType: string): boolean {
    let key = this.toKey(colliderType, collidedType);
    return this.pairs.has(key);
  }

  applyCollisionAction(collider: IActor, collided: IActor): void {
    let key = this.toKey(collider.type, collided.type);
    if (this.pairs.has(key)) {
      let getValue = this.pairs.get(key)!;
      getValue.applyAction(collider, collided);
    }
  }
}

export default ActorCollisionHandlers;
