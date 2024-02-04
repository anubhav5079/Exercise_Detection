import React, { useContext } from "react";
import { Context } from "../App";
import Icon from "../Assets/images/About.png";
import "../Styles/InitailModal.css";
const InitailModal = (props) => {
  const { setOpen, open } = useContext(Context);

  return (
    open && (
      <div className="screen">
        <div className="modal" style={{ background: "#f5f5f5" }}>
          <div className="modal-top">
            <img className="modal-image" src={Icon} alt="" />
            <p>Guide to the best experience with our smart trainer</p>
          </div>
          <div className="bottom">
            <ul>
              <li>Grant access to your device camera</li>
              <li>Select an exercise from the menu on the left</li>
              <li>Move back till your full body is in the camera frame</li>
              <li>Start exercising!</li>
              <li>
                Our smart trainer will track your posture and count your reps!
              </li>
            </ul>
          </div>
          <div
            className="btn3"
            id="b5"
            onClick={() => {
              setOpen(false);
            }}
          >
            Okay, got it !
          </div>
        </div>
      </div>
    )
  );
};

export default InitailModal;
