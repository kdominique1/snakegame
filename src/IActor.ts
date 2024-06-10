import Point from "./Point";

interface IActor {
  position: Point;
  type: string;
  update: (steps: number) => void;
}

export default IActor;
