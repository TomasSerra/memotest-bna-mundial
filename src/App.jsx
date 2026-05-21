import "./App.scss";
import { useEffect, useState } from "react";
import Home from "./pages/home/Home";
import Memotest from "./pages/game/Memotest";
import End from "./pages/end/End";

import F1 from "./img/fichas/1.png";
import F2 from "./img/fichas/2.png";
import F3 from "./img/fichas/3.png";
import F4 from "./img/fichas/4.png";
import F5 from "./img/fichas/5.png";
import F6 from "./img/fichas/6.png";
import F7 from "./img/fichas/7.png";
import F8 from "./img/fichas/8.png";

function App() {
  const [page, setPage] = useState(0);
  const [time, setTime] = useState(55);

  const [points, setPoints] = useState(0);
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
          images={[F1, F2, F3, F4, F5, F6, F7, F8]}
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
