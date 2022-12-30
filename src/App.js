import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [button, setButton] = useState(false);

  async function fetchStates() {
    const response = await fetch(
      "https://arduino-shitshow-default-rtdb.asia-southeast1.firebasedatabase.app/.json"
    );
    const data = await response.json();

    console.log(data);

    setButton(data.button);
  }

  useEffect(() => {
    fetchStates();
  }, []);

  async function pushStates() {
    const response = await fetch('https://arduino-shitshow-default-rtdb.asia-southeast1.firebasedatabase.app/.json', {
      method: 'PATCH',
      body: JSON.stringify({button: button}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();

  }

  useEffect(() => {
    pushStates()
  }, [button])

  return (
    <div className="App">
      <h1>Arduino controller :)</h1>
      <h2>Controller LED</h2>
      <h3>
        Current state {"->"} {button ? "on" : "off"}
      </h3>
      <button
        onClick={() => {
          setButton(!button);
        }}
      >
        TOGGLE BUTTON
      </button>
    </div>
  );
}

export default App;
