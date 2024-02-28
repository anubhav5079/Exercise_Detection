import React, { useContext } from "react";
import "../Styles/InitailModal.css";
import Win from "../Assets/images/win.png";
import { Context } from "../App";
import data from "../Assets/Json/Text";

const Modal2 = () => {
  const {
    exercise,
    setStart,
    completed,
    setRightCount,
    setSpeed,
    setCompleted,
  } = useContext(Context);
  return (
    completed && (
      <div className="screen">
        <div className="modal2" style={{ background: "#f5f5f5" }}>
          <div className="modal-mid">
            <img src={Win} alt="modal2" />
            <p>Bravo for completing {data[exercise].text} workout!</p>
            <p>
              Try another workout from the menu on the left or hit the "Start
              Exercise" button to redo this workout.{" "}
            </p>
          </div>
          <div className="btns">
            <div
              className="btn1"
              id="b8"
              onClick={() => {
                setRightCount(0);
                setSpeed(0);
                setCompleted(false);
                setStart(false);
              }}
            >
              Thank you !
            </div>
            <div
              className="btn2"
              id="b9"
              onClick={() => {
                setRightCount(0);
                setSpeed(0);
                setCompleted(false);
                setStart(true);
              }}
            >
              Go again
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal2;
