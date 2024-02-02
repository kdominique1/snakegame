import "./App.css";
import "./App.css";
import Snake from "./Snake";
import WorldModel from "./WorldModel";
import display from "./display";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    document.getElementById("output")!.innerText = "OUTPUT:\n";
    const greenSnake = new Snake();
    const brownSnake = new Snake();
    const redSnake = new Snake();
    const worldModel1 = new WorldModel(redSnake);
    greenSnake.move(2);
    greenSnake.move(2);
    brownSnake.move(1);
    worldModel1.updateSteps(3);
    display("Green snake's current position is: " + greenSnake.position);
    display("Brown snake's current position is: " + brownSnake.position);
    display("Red snake's current position is: " + worldModel1.worldSnake.position);
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
