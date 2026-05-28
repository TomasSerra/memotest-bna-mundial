import React from "react";
import { useEffect, useState, useRef } from "react";
import "./Memotest.scss";

import Logo from "../../img/logo.png";
import Back from "../../img/icono.png";
import CardTable from "../../components/card table/CardTable";
import TimeBar from "../../components/time bar/TimeBar";

export default function Memotest({
  size,
  time,
  goToNextPage,
  handleGlobalPoints,
  images,
}) {
  const [imgs, setImgs] = useState([]);
  const [timer, setTimer] = useState(time);
  const [points, setPoints] = useState(0);
  const [end, setEnd] = useState();
  const [order, setOrder] = useState([]);
  const intervalRef = useRef(null);

  function randomize(cant) {
    const needed = size / 2;
    const argentina = images.find((img) =>
      /argentina/i.test(img.name) || /argentina/i.test(img.src),
    );
    const rest = images.filter((img) => img !== argentina);

    const randomImgs = [];
    if (argentina) {
      randomImgs.push(argentina);
    }
    let pool = [];
    while (randomImgs.length < needed) {
      if (pool.length === 0) {
        pool = [...rest].sort(() => Math.random() - 0.5);
      }
      randomImgs.push(pool.pop());
    }
    // Shuffle so Argentina isn't always first
    randomImgs.sort(() => Math.random() - 0.5);

    setImgs(randomImgs);

    const array = [];
    while (array.length < cant) {
      const num = Math.floor(Math.random() * cant);
      if (!array.includes(num)) {
        array.push(num);
      }
    }
    return array;
  }

  function handlePoints(p) {
    setPoints((prevPoints) => prevPoints + p);
  }

  function handleTimer() {
    setTimer((prevTimer) => prevTimer - time / 1000);
  }

  useEffect(() => {
    setOrder(randomize(size));
    preloadImages(imgs);

    intervalRef.current = setInterval(() => {
      handleTimer();
    }, time);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [size, time]);

  useEffect(() => {
    if (points === size || timer <= 0) {
      clearInterval(intervalRef.current);
      setEnd(true);
      setTimeout(() => {
        handleGlobalPoints(points);
        goToNextPage();
      }, 2000);
    }
  }, [points, timer]);

  function preloadImages(imageArray) {
    imageArray.forEach((imageSrc) => {
      const img = new Image();
      img.src = imageSrc.src;
    });
  }

  return (
    <div className="memotest-page">
      <div className="timer-top">
        <TimeBar
          maxTime={time}
          actualTime={timer}
          colors={{ barColor: "#8F8ABD", backgroundColor: "#ffffffb8" }}
        />
      </div>
      <div className="title-row">
        <h2>
          ¡Apurate a encontrarlas,
          <br />
          el tiempo corre!
        </h2>
      </div>
      {order.length !== 0 && (
        <div className="table-container">
          <CardTable
            size={
              window.innerWidth <= 700
                ? 80
                : window.innerWidth >= 1000 &&
                    window.innerHeight > window.innerWidth
                  ? 87
                  : 70
            }
            space={2}
            columns={4}
            rows={5}
            order={order}
            imgs={imgs}
            back={Back}
            handlePoints={handlePoints}
            end={end}
            backImg={Back}
          />
        </div>
      )}
      <div className="footer">
        <img src={Logo} />
      </div>
    </div>
  );
}
