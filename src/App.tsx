import "./App.css";
import "./App.css";
import Snake from "./Snake";
import WorldModel from "./WorldModel";
import display from "./display";
import { useEffect } from "react";

export default function App() {
  // Add Snake Tests with display below
  useEffect(() => {
    // Include your display statements to test below
    document.getElementById("output")!.innerText = "OUTPUT:\n";
    display("hey");
    const greenSnake = new Snake();
    const brownSnake = new Snake();
    // Step 8: Create new snake and new world model and pass the snake to the world model
    const redSnake = new Snake();
    const worldModel1 = new WorldModel(redSnake);
    greenSnake.move(1);
    greenSnake.move(2);
    brownSnake.move(1);
    worldModel1.updateSteps(1);
    display("Green snake's current position is: " + greenSnake.position);
    display("Brown snake's current position is: " + brownSnake.position);
    display("Red snake's current position is: " + redSnake.position);
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
