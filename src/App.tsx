import React, { useState, useEffect } from "react";
import "./App.css";
import Game from "./Game";
import GameController from "./GameController";
import MainMenuController from "./MainMenuController";
import ActorCollisionHandlers from "./ActorCollisionHandlers";
import SnakeCollisionFoodHandler from "./SnakeCollisionFoodHandler";
import SnakeSnakeCollisionHandler from "./SnakeSnakeCollisionHandler";

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [game] = useState(() => new Game());

  useEffect(() => {
    document.getElementById("output")!.innerText = "OUTPUT:\n";

    if (!gameStarted) {
      const mainMenuController = new MainMenuController(game);
      mainMenuController.init({});

      const startGameHandler = (config: {
        numOfHumanPlayers: number;
        numOfAIPlayers: number;
      }) => {
        setGameStarted(true);
        initializeGame(config);
      };

      game.switchContext = startGameHandler;
    }
  }, [game, gameStarted]);

  const initializeGame = (config: {
    numOfHumanPlayers: number;
    numOfAIPlayers: number;
  }) => {
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

    gameController.init(config);
  };

  return (
    <div className="App">
      <pre id="output">
        OUTPUT: <br />
      </pre>
      {!gameStarted && <div id="menu-container"></div>}
    </div>
  );
}
