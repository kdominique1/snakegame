import IActor from "./IActor";

interface ICollidable extends IActor {
  didCollide: (s: IActor) => boolean;
}

export default ICollidable;
