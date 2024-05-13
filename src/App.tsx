import "./App.css";
import "./App.css";
import Snake from "./Snake";
import WorldModel from "./WorldModel";
import display from "./display";
import IWorldView from "./IWorldView";
import { useEffect } from "react";
import CanvasWorldView from "./CanvasWorldView";

export default function App() {
  useEffect(() => {
    document.getElementById("output")!.innerText = "OUTPUT:\n";
    const greenSnake = new Snake();
    const brownSnake = new Snake();
    const redSnake = new Snake();
    const worldModel1 = new WorldModel(redSnake);
    const worldModel2 = new WorldModel(greenSnake);

    // Create a new CanvasWorldView with a scaling factor
    const canvasWorldView = new CanvasWorldView(10);
    worldModel2.view = canvasWorldView; // Set the view using the setter
    worldModel2.updateSteps(1); // Call update on WorldModel to see if it works

    greenSnake.move(2);
    greenSnake.move(2);
    brownSnake.move(1);
    worldModel2.updateSteps(5);
    display("Green snake's current position is: " + greenSnake.position);
    display("Brown snake's current position is: " + brownSnake.position);
    display("Red snake's current position is: " + worldModel1.snake.position);
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
