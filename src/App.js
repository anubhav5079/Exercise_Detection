import React, { createContext, useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./Components/SignUp";
import bg from "./Assets/images/img.png";

import Workout from "./Components/Workout";
import SelectExcercise from "./Components/SelectExcercise";

export const Context = createContext();

function App() {
  const yesClick = useRef(null);
  const playing = useRef(null);
  const [modal, setModal] = useState(null);
  const [open, setOpen] = useState(true);
  const [rep, setRep] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [exercise, setExercise] = useState(null);
  const [exerciseName, setExerciseName] = useState(null);
  const [start, setStart] = useState(false);
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [desc, setDesc] = useState("");

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  return (
    <Context.Provider
      value={{
        yesClick,
        modal,
        setModal,
        start,
        setStart,
        open,
        setOpen,
        rep,
        setRep,
        speed,
        setSpeed,
        completed,
        setCompleted,
        exercise,
        setExercise,
        exerciseName,
        setExerciseName,
        desc,
        setDesc,
        audio,
        setAudio,
        playing,
        image,
        setImage,

        name,
        setName,
        age,
        setAge,
        gender,
        setGender,
        email,
        setEmail,
        number,
        setNumber,
      }}
    >
      <div className="App">
        <div className="sp">
          <p className="hh1">
            Open this page in a larger screen to get the best experience.
          </p>
          <img src={bg} alt="bg" className="bgg" />
        </div>
        <div className="hidde">
          <Router>
            <Routes>
              <Route exact path="/" element={<SignUp />} />
              <Route
                exact
                path="/selectExcercise"
                element={<SelectExcercise />}
              />
              <Route exact path="/workout" element={<Workout />} />
            </Routes>
          </Router>
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
