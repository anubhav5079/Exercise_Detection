import React, { useContext, useEffect, useState } from "react";
import * as posedetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-core";
import { Context } from "../App";
import "@tensorflow/tfjs-backend-webgl";

import { Camera } from "../utils/camera";
import cam from "../Assets/images/camera.png";
// import gif from '../Assets/images/loader.gif'
import "../Styles/Middle.css";

import { detectorConfig, model } from "../constants/model";
import Loader from "./loader";

const Middle = () => {
  const [loading, setLoading] = useState(false);
  const [allowed, setAllowed] = useState(0);
  const {
    setRightCount,
    setLeftCount,
    setSpeed,
    start,
    completed,
    exercise,
    playing,
    setCompleted,
  } = useContext(Context);
  useEffect(() => {
    let camera = null;
    let unsubscribe = null;
    let animation = null;
    const setAnimation = (x) => {
      animation = x;
    };
    const loader = async () => {
      try {
        setLoading(true);
        const createDetector = async () => {
          return posedetection.createDetector(model, detectorConfig);
        };
        async function renderResult() {
          setLoading(true);
          if (camera) {
            if (camera.video.readyState < 2) {
              await new Promise((resolve) => {
                camera.video.onloadeddata = (video) => {
                  resolve(video);
                };
              });
            }
            let poses = null;
            if (start && !completed) {
              if (detector != null) {
                try {
                  poses = await detector.estimatePoses(camera.video, {
                    maxPoses: 1,
                    flipHorizontal: false,
                  });
                } catch (error) {
                  detector.dispose();
                  detector = null;
                  alert(error);
                }
              }
            }

            camera.drawCtx();

            if (poses && poses.length > 0) {
              setLoading(false);
              camera.drawResults(poses);
              camera.do_exercise(exercise);
            }
          }
        }
        async function renderPrediction() {
          await renderResult();
          unsubscribe = requestAnimationFrame(renderPrediction);
        }
        camera = await Camera.setupCamera(
          setLeftCount,
          setRightCount,
          setSpeed,
          (audio) => (playing.current = audio),
          playing.current,
          setCompleted,
          setAnimation,
        );
        var detector = await createDetector();
        renderPrediction();
        setAllowed(1);
      } catch (error) {
        if (error === "Permission Error") {
          setAllowed(2);
        } else {
          console.log(error);
          setAllowed(1);
        }
      }
    };
    loader();
    return () => {
      clearTimeout(animation);
      camera = null;
      cancelAnimationFrame(unsubscribe);
    };
  }, [
    completed,
    exercise,
    start,
    playing,
    setCompleted,
    setSpeed,
    setRightCount,
    setLeftCount,
  ]);

  return (
    <div className="middle">
      {loading && <Loader color="transparent" />}

      <div className="canvas-wrapper" style={{ position: "relative" }}>
        <canvas id="output"></canvas>
        <video id="view" playsInline></video>
      </div>
      <div id="green"></div>
      <div id="countdown">
        <div className="counter">
          <div className="nums">
            <span className="in">3</span>
            <span>2</span>
            <span>1</span>
          </div>
          <h4 className="hs1">Get Ready</h4>
        </div>
        <div className="final">
          <h4 className="hs2">GO</h4>
        </div>
      </div>
      {allowed === 2 && (
        <div className="middle-pop">
          <img src={cam} alt="camera" />
          <p>Our smart trainer needs access to your device camera.</p>
        </div>
      )}
    </div>
  );
};

export default Middle;
