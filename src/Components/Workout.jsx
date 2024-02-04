import React, { useContext } from "react";
import InitailModal from "./InitailModal";
import Left from "./Left";
import Middle from "./Middle";
import Modal from "./Modal";
import Modal2 from "./Modal2";
import Right from "./Right";
import "../Styles/Workout.css";
import { Navigate } from "react-router-dom";
import { Context } from "../App";

function Workout() {
  const { name, age, desc } = useContext(Context);
  if (name === "" || age === 0 || desc === "") {
    return <Navigate to="/" />;
  }

  return (
    <div className="app">
      <Left key={"left"} />
      <Middle key={"middle"} />
      <Modal2 />
      <InitailModal key={"modal"} />
      <Modal />
      <Right />
    </div>
  );
}

export default Workout;
