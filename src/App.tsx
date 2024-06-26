import "./App.css";
import { useEffect } from "react";
import Game from "./Game";
import GameController from "./GameController";
import ActorCollisionHandlers from "./ActorCollisionHandlers";
import SnakeCollisionFoodHandler from "./SnakeCollisionFoodHandler";
import SnakeSnakeCollisionHandler from "./SnakeSnakeCollisionHandler";

export default function App() {
  useEffect(() => {
    document.getElementById("output")!.innerText = "OUTPUT:\n";

    const game = new Game();
    const gameController = new GameController(game);

    const collisionHandlers = new ActorCollisionHandlers();
    collisionHandlers.addCollisionAction(
      "snake",
      "food",
      new SnakeCollisionFoodHandler(),
    );
    collisionHandlers.addCollisionAction(
      "snake",
      "snake",
      new SnakeSnakeCollisionHandler(),
    );

    gameController.init({ numOfHumanPlayers: 1, numOfAIPlayers: 1 });
  }, []);

  return (
    <div className="App">
      <pre id="output">
        OUTPUT: <br />
      </pre>
    </div>
  );
}
