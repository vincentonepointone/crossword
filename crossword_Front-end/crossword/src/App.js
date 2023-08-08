// App.js
import React from "react";
import Puzzle from "./puzzle";
import "./App.css";

function App() {


  return (
    <div className="App">
      <h1 className="bg-primary p-3 text-light">Crossword Puzzle's</h1>
        <div className="d-flex justify-content-center mb-5">
            <a className="btn btn-dark" href="./admin.html" role="button">Create Crossword Puzzle</a>
        </div>
      <Puzzle />
    </div>
  );
}

export default App;
