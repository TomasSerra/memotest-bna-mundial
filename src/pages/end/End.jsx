import React, { useEffect } from "react";
import "./End.scss";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";

import Logo from "../../img/logo.png";
import LoseImage from "../../img/end/lose-image.png";
import WinImage from "../../img/end/win-image.png";

function End({ goToNextPage, hasWin }) {
  const [width, height] = useWindowSize();

  useEffect(() => {
    setDataToLocalStorage();
    setTimeout(() => {
      goToNextPage();
    }, 100000);
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
          colors={["#22c4e4", "#ffffff", "#2080bf", "#e3eef3"]}
          recycle={true}
          numberOfPieces={width <= 700 ? 500 : 800}
          gravity={width <= 700 ? 0.03 : 0.05}
        />
      )}
      <div className="center">
        {hasWin ? (
          <>
            <h1>¡EXCELENTE!</h1>
            <div className="final-img-container">
              <img src={WinImage} className="final-img zoom-in" alt="" />
            </div>
            <p>
              Encontraste todos
              <br />
              los pares de banderas
            </p>
          </>
        ) : (
          <>
            <h2>
              ¡SE TE ACABÓ
              <br />
              EL TIEMPO!
            </h2>
            <div className="final-img-container">
              <img src={LoseImage} className="final-img zoom-in" alt="" />
            </div>
            <p>
              Muchas gracias
              <br />
              por participar
            </p>
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
