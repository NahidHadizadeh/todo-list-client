import "./timer.css";
import React, { useState, useEffect } from "react";

const Timer = ({ deadline }, e) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // const deadline = "March, 9, 2023, 14:50:40";
  const d = new Date();
  const deadline2 = deadline
    ? deadline?.setSeconds(deadline?.getSeconds() + 5)
    : new Date();

  const getTime = () => {
    const time = deadline2 - Date.now();
    if (time > 0) {
      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    } else {
      console.log(e.target);
      return;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="timer" role="timer">
      <div className="">
        <div className="box">
          <p id="day">{days < 10 ? "0" + days : days}D</p>
        </div>
      </div>
      <div className="">
        <div className="box">
          <p id="hour">{hours < 10 ? "0" + hours : hours}h</p>
        </div>
      </div>
      <div className="">
        <div className="box">
          <p id="minute">{minutes < 10 ? "0" + minutes : minutes}m</p>
        </div>
      </div>
      <div className="">
        <div className="box">
          <p id="second">{seconds < 10 ? "0" + seconds : seconds}s</p>
        </div>
      </div>
    </div>
  );
};
export default Timer;
