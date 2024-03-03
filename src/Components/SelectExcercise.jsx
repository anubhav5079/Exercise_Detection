import styles from "./SelectExcercise.module.css";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import data from "../Assets/Json/Text";
import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../App";

function WorkoutList() {
  const {
    setExercise,
    setExerciseName,
    setAudio,
    setDesc,
    setImage,
    setRightCount,
    setSpeed,
    setCompleted,
    setStart,
  } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    setRightCount(0);
    setSpeed(0);
    setCompleted(false);
    setStart(false);
    setExercise(null);
  }, [setRightCount, setSpeed, setCompleted, setStart, setExercise]);

  return (
    <>
      <div className={styles.select}>Select an excercise</div>
      <div className={styles.box}>
        {data.map((item, index) => {
          return (
            <div className={styles.excercisebox} id={index} key={index}>
              <img src={item.image} className={styles.boximage} alt="" />
              <div className={styles.name}>{item.text}</div>
              <div className={styles.desc}>
                <ul
                  style={{
                    listStyleType: "number",
                  }}
                >
                  {item.description.map((li) => {
                    return <li key={li}>{li}</li>;
                  })}
                </ul>
              </div>
              <div
                onClick={() => {
                  setExercise(index);
                  setExerciseName(item.text);
                  setAudio(item.audio);
                  setDesc(item.description);
                  setImage(item.image);

                  navigate("/workout");
                }}
                className={styles.startbutton}
              >
                Go to Excercise
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function SelectExcercise() {
  const { name, age, gender } = useContext(Context);

  if (name === "" || age === 0) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.titlebox}>
          <div>{name}</div>
          <div>{age}</div>
          <div>{gender}</div>
        </div>
      </div>
      <WorkoutList />
      <center>
        <a
          style={{ color: "white" }}
          href="https://master--yogadetection.netlify.app/"
        >
          In Beta - Yoga Detection
        </a>
      </center>
    </div>
  );
}

export default SelectExcercise;
