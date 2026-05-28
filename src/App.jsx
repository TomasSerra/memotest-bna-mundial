import "./App.scss";
import { useEffect, useState } from "react";
import Home from "./pages/home/Home";
import Memotest from "./pages/game/Memotest";
import End from "./pages/end/End";

import FLAGS from "./flags";

function App() {
  const [page, setPage] = useState(2);
  const [time, setTime] = useState(60);

  const [points, setPoints] = useState(20);
  const size = 20;

  function handlePage(p) {
    setPage(p);
  }
  function handlePoints(s) {
    setPoints(s);
  }

  useEffect(() => {
    console.log(points);
  }, [points]);

  useEffect(() => {
    bloquearGestos();
  }, []);

  function bloquearGestos() {
    document.addEventListener("contextmenu", (event) => event.preventDefault());
    document.addEventListener("selectstart", (event) => event.preventDefault());
  }

  return (
    <div className="App">
      {page === 0 && (
        <Home
          goToNextPage={() => {
            handlePage(1);
          }}
        />
      )}
      {page === 1 && (
        <Memotest
          goToNextPage={() => {
            handlePage(2);
          }}
          handleGlobalPoints={handlePoints}
          size={size}
          time={time}
          images={FLAGS}
        />
      )}
      {page === 2 && (
        <End
          goToNextPage={() => {
            handlePage(0);
          }}
          hasWin={points === size}
        />
      )}
    </div>
  );
}

export default App;
