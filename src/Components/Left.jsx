import React, { useContext } from "react";
import "../Styles/Left.css";
import { Context } from "../App";
import { useNavigate } from "react-router-dom";
import styles from "./Left.module.css";

const Left = () => {
  const {
    name,
    age,
    gender,
    exerciseName,
    playing,
    setStart,
    start,
    setRightCount,
    audio,
    desc,
    setSpeed,
    setCompleted,
  } = useContext(Context);

  const navigate = useNavigate();

  return (
    <div className="left">
      <h2
        className={"top"}
        onClick={() => {
          if (playing.current) {
            playing.current.pause();
            playing.current.currentTime = 0;
          }
          navigate("/selectExcercise");
        }}
      >
        <div>Go back</div>
      </h2>
      <div className={styles.main}>
        <div className={styles.first}>
          <div>Name: {name}</div>
          <div>Age: {age}</div>
          <div>Gender: {gender}</div>
        </div>
        <div className={styles.second}>
          <h4>{exerciseName} instructions:</h4>
          <ul
            style={{
              listStyleType: "number",
            }}
          >
            {desc.map((li) => {
              return <li key={li}>{li}</li>;
            })}
          </ul>
        </div>
        <button
          className={styles.start}
          onClick={() => {
            if (playing.current) {
              playing.current.pause();
              playing.current.currentTime = 0;
            }
            if (!start) {
              playing.current = audio;
              setRightCount(0);
              setSpeed(0);
              setCompleted(false);
              setStart(true);
              setTimeout(() => {
                audio.play();
              }, 500);
            }
            if (start) {
            }
            setStart(!start);
          }}
        >
          {start ? "Stop" : "Start"} Excercise
        </button>
      </div>
    </div>
  );
};

export default Left;
