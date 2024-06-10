import IActor from "./IActor";

interface ICollisionHandler {
  applyAction: (actor1: IActor, actor2: IActor) => void;
}

export default ICollisionHandler;
