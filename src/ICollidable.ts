import IActor from "./IActor";

interface ICollidable extends IActor {
  didCollide: () => void;
}

export default ICollidable;
