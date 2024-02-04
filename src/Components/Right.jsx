import React, { useContext } from "react";
import "../Styles/Right.css";
import About from "../Assets/images/About.png";
import { Context } from "../App";
import data from "../Assets/Json/Text";

const Right = () => {
  const { setOpen, rep, speed, exercise } = useContext(Context);

  return (
    <div className="right">
      <div className="second-icon">
        <img src={About} onClick={() => setOpen(true)} alt="About" id="b7" />
      </div>
      <div className="circle">
        <span>Reps</span>
        <h1>
          {rep}
          {exercise !== null && (
            <div style={{ display: "inline" }}> / {data[exercise].reps}</div>
          )}
        </h1>
      </div>
      <div className="circle">
        <span>Speed</span>
        <h1>{speed} R/S</h1>
      </div>
    </div>
  );
};

export default Right;
