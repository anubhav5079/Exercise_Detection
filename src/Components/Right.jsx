import React, { useContext } from "react";
import "../Styles/Right.css";
import About from "../Assets/images/About.png";
import { Context } from "../App";
import data from "../Assets/Json/Text";

const Right = () => {
  const { open, setOpen, speed, exercise, wrong_count, right_count } =
    useContext(Context);

  return (
    <div className="right">
      <div className="second-icon">
        <img src={About} onClick={() => setOpen(!open)} alt="About" id="b7" />
      </div>
      <div className="circle">
        <span>Count</span>
        <h1>
          {right_count}
          {exercise !== null && (
            <div style={{ display: "inline" }}> / {data[exercise].count}</div>
          )}
        </h1>
      </div>
      <div className="circle">
        <span>Speed</span>
        <h1>{speed} C/S</h1>
      </div>
      <div className="circle">
        <span>Accuracy</span>
        <h1>
          {right_count !== 0 && wrong_count !== 0
            ? (right_count / (wrong_count + right_count)) * 100 + "%"
            : "NA"}
        </h1>
      </div>
    </div>
  );
};

export default Right;
