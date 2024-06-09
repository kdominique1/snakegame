import "./App.css";
import Snake from "./Snake";
import WorldModel from "./WorldModel";
import display from "./display";
import { useEffect } from "react";
import CanvasWorldView from "./CanvasWorldView";
import GameController from "./GameController";
import HumanPlayer from "./HumanPlayer";
import SnakeController from "./SnakeController";
import IInputHandler from "./IInputHandler";
import LRKeyInputHandler from "./LRKeyInputHandler";
import AvoidWallsPlayer from "./AvoidWallsPlayer";
import Point from "./Point";

export default function App() {
  useEffect(() => {
    document.getElementById("output")!.innerText = "OUTPUT:\n";

    const greenSnake = new Snake(new Point(0, 0), 5);
    const brownSnake = new Snake(new Point(7, 7), 5);
    const worldModel = new WorldModel();
    worldModel.addSnake(greenSnake);
    worldModel.addSnake(brownSnake);

    const iInputHandler1 = new LRKeyInputHandler();
    const canvasWorldView = new CanvasWorldView(7);
    worldModel.addView(canvasWorldView);

    const snakeController1 = new SnakeController(worldModel, greenSnake);
    const snakeController2 = new SnakeController(worldModel, brownSnake);
    const gameController = new GameController(worldModel);
    const avoidWallsPlayer1 = new AvoidWallsPlayer(snakeController1);
    const humanPlayer1 = new HumanPlayer(snakeController2, iInputHandler1);

    gameController.player1 = avoidWallsPlayer1;
    gameController.player2 = humanPlayer1;

    worldModel.updateSteps(1);

    greenSnake.move(2);
    greenSnake.move(2);
    brownSnake.move(1);
    worldModel.updateSteps(5);

    display(
      "Brown snake's current position is: " + brownSnake.position.toString(),
    );
    display(
      "Green snake's current position is: " + greenSnake.position.toString(),
    );

    gameController.run();
  }, []);

  return (
    <div className="App">
      {/* <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2> */}
      <pre id="output">
        OUTPUT: <br />
      </pre>
    </div>
  );
}
