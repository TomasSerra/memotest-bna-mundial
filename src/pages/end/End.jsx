import React, { useEffect } from "react";
import "./End.scss";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";

import Logo from "../../img/logo.png";
import ClockFinal from "../../img/end/clock-final.svg";
import TresDeTres from "../../img/end/3-de-3-bien.svg";

function End({ goToNextPage, hasWin }) {
  const [width, height] = useWindowSize();

  useEffect(() => {
    setDataToLocalStorage();
    setTimeout(() => {
      goToNextPage();
    }, 6000);
  }, []);

  const setDataToLocalStorage = () => {
    const jsonData = localStorage.getItem("stats-memotest-bna");
    let estadisticas = {};
    if (jsonData) {
      estadisticas = JSON.parse(jsonData);
    }
    const date = new Date();
    const dia =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    if (estadisticas[dia]) {
      estadisticas[dia] += 1;
    } else {
      estadisticas[dia] = 1;
    }
    localStorage.setItem("stats-memotest-bna", JSON.stringify(estadisticas));
  };

  return (
    <div className="end-page">
      {hasWin && (
        <Confetti
          width={width}
          height={height}
          colors={[
            "#8F8ABD",
            "#F06C29",
            "#007B5F",
            "#507385",
            "#D4AC87",
            "#65C9D8",
          ]}
          recycle={true}
          numberOfPieces={500}
          gravity={0.05}
        />
      )}
      <div className="center">
        {hasWin ? (
          <>
            <h1>¡Excelente!</h1>
            <p>
              Encontraste todos
              <br />
              los pares de productos.
            </p>
            <div className="final-img-container">
              <img src={TresDeTres} className="final-img-win zoom-in" alt="" />
            </div>
          </>
        ) : (
          <>
            <h2>
              ¡Se te acabó
              <br />
              el tiempo!
            </h2>
            <p>
              Muchas gracias
              <br />
              por participar.
            </p>
            <div className="final-img-container">
              <img
                src={ClockFinal}
                className="final-img-clock zoom-in"
                alt=""
              />
            </div>
          </>
        )}
      </div>
      <div className="footer">
        <img src={Logo} />
      </div>
    </div>
  );
}

export default End;
