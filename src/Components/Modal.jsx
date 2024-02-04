import React, { useContext } from "react";
import { Context } from "../App";
import Icon from "../Assets/images/About.png";
import "../Styles/InitailModal.css";

const Modal = () => {
  const { modal, setModal, setStart, yesClick } = useContext(Context);
  return (
    modal !== null && (
      <div className="screen">
        <div className="modal2" style={{ background: "#f5f5f5" }}>
          <div className="modal-mid">
            <img src={Icon} alt="info" />
            <p>Do you want to change exercise?</p>
          </div>
          <div className="btns">
            <div
              className="btn1"
              id="b10"
              onClick={() => {
                yesClick.current = true;
                setStart(false);
                setModal(null);
                //time taken to set states
                setTimeout(
                  () => document.getElementsByClassName("card")[modal].click(),
                  500,
                );
              }}
            >
              Yes
            </div>
            <div
              className="btn2"
              id="b11"
              onClick={() => {
                setModal(null);
              }}
            >
              No
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
