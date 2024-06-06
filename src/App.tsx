import "./App.css";
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

export default function App() {
  useEffect(() => {
    document.getElementById("output")!.innerText = "OUTPUT:\n";

    const greenSnake = new Snake();
    const brownSnake = new Snake();
    const worldModel1 = new WorldModel(greenSnake);
    const worldModel2 = new WorldModel(brownSnake);
    const iInputHandler1 = new LRKeyInputHandler();
    const canvasWorldView = new CanvasWorldView(10);
    const snakeController1 = new SnakeController(worldModel1, greenSnake);
    const snakeController2 = new SnakeController(worldModel2, brownSnake);
    const gameController1 = new GameController(worldModel1);
    const avoidWallsPlayer1 = new AvoidWallsPlayer(snakeController1);
    const humanPlayer1 = new HumanPlayer(snakeController2, iInputHandler1);
    gameController1.player1 = avoidWallsPlayer1;
    gameController1.player2 = humanPlayer1;
    worldModel1.view = canvasWorldView;
    worldModel1.updateSteps(1);

    greenSnake.move(2);
    greenSnake.move(2);
    brownSnake.move(1);
    worldModel1.updateSteps(5);
    worldModel2.updateSteps(5);

    display("Brown snake's current position is: " + brownSnake.position);
    display("Green snake's current position is: " + worldModel1.snake.position);

    gameController1.run();
  }, []);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <pre id="output">
        OUTPUT: <br />
      </pre>
    </div>
  );
}
