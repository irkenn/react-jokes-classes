import React from "react";
import "./JokeList.css";
import JokeList2 from "./ClassMethod";

function App() {
  return (
    <div className="App">
      <JokeList2 numJokesToGet={10} />
    </div>
  );
}

export default App;
