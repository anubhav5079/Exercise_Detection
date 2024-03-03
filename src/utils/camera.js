import * as posedetection from "@tensorflow-models/pose-detection";

import { JumpingJacks } from "./jumpingJacks";

import { HighKnees } from "./highKnees";

import { Squats } from "./squats";

import { Double_Leg_Bridge } from "./doubleLegBridge";

import { Lateral_Shoulder_Stretch } from "./latsStretch";

import { Lunging_Hip_Flexor_Stretch } from "./lungingHipStretch";

import { Lunges } from "./lunges";

import { Knee_Extensions } from "./kneeExtensions";

import data from "../Assets/Json/Text";

import {
  model,
  videoConfig,
  body,
  scoreThreshold,
  exercises,
} from "../constants/model";

import HKEnd from "../Assets/Sound/high_knees/HIGH KNEES_end.mp3";
import { Leg_Raises } from "./legRaises";

// const Beep = new Audio(beep)

export class Camera {
  constructor() {
    this.video = document.getElementById("view");
    this.canvas = document.getElementById("output");
    this.ctx = this.canvas.getContext("2d");
    this.width = this.video.offsetWidth;
    this.height = this.video.offsetHeight;
    this.exercise_count = 0;
    this.right_count = 0;
    this.wrong_count = 0;
    this.high_knee = new HighKnees();
    this.jumping_jack = new JumpingJacks();
    this.squat = new Squats();
    this.lunges = new Lunges();
    this.double_leg_bridge = new Double_Leg_Bridge();
    this.lateral_shoulder_stretch = new Lateral_Shoulder_Stretch();
    this.lunging_hip_flexor_stretch = new Lunging_Hip_Flexor_Stretch();
    this.knee_extension = new Knee_Extensions();
    this.leg_raises = new Leg_Raises();
    this.start_played = false;
    this.countdown_end = false;
  }

  static async setupCamera(
    setRightCount,
    setWrongCount,
    setSpeed,
    setPlaying,
    playing,
    setCompleted,
    setAnimation,
  ) {
    let l = document.querySelector(".left").offsetWidth;
    let r = document.querySelector(".right").offsetWidth;
    let w = window.innerWidth;
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error(
        "Browser API navigator.mediaDevices.getUserMedia not available",
      );
    }

    let stream = null;
    try {
      stream = await navigator.mediaDevices.getUserMedia(videoConfig);

      const camera = new Camera();
      camera.setRightCount = setRightCount;
      camera.setWrongCount = setWrongCount;
      camera.setSpeed = setSpeed;
      camera.setPlaying = setPlaying;
      camera.playing = playing;
      camera.setCompleted = setCompleted;
      camera.setAnimation = setAnimation;
      camera.video.srcObject = stream;

      await new Promise((resolve) => {
        camera.video.onloadedmetadata = (video) => {
          resolve(video);
        };
      });

      camera.video.play();

      const videoWidth = camera.video.videoWidth;
      const videoHeight = camera.video.videoHeight;
      // Must set below two lines, otherwise video element doesn't show.
      camera.video.width = videoWidth;
      camera.video.height = videoHeight;

      //setting size of full body validator
      document.querySelector("#green").style.width = w - l - r - 2.5 + "px";

      camera.canvas.width = videoWidth;
      camera.canvas.height = videoHeight;
      const canvasContainer = document.querySelector(".canvas-wrapper");
      canvasContainer.style = `width: ${videoWidth}px; height: ${videoHeight}px`;

      // Because the image from camera is mirrored, need to flip horizontally.
      camera.ctx.translate(camera.video.videoWidth, 0);
      camera.ctx.scale(-1, 1);

      return camera;
    } catch (error) {
      throw new Error("Permission Error");
    }
  }

  drawCtx() {
    this.ctx.drawImage(
      this.video,
      0,
      0,
      this.video.videoWidth,
      this.video.videoHeight,
    );
  }

  clearCtx() {
    this.ctx.clearRect(0, 0, this.video.videoWidth, this.video.videoHeight);
  }

  /**
   * Draw the keypoints && skeleton on the video.
   * @param poses A list of poses to render.
   */
  drawResults(poses) {
    this.pose = poses[0];
    for (const pose of poses) {
      this.drawResult(pose);
    }
  }

  /**
   * Draw the keypoints && skeleton on the video.
   * @param pose A pose with keypoints to render.
   */
  drawResult(pose) {
    if (pose.keypoints != null) {
      this.drawKeypoints(pose.keypoints);
      this.drawSkeleton(pose.keypoints);
    }
  }

  /**
   * Draw the keypoints on the video.
   * @param keypoints A list of keypoints.
   */
  drawKeypoints(keypoints) {
    const keypointInd = posedetection.util.getKeypointIndexBySide(model);
    this.ctx.fillStyle = "Red";
    this.ctx.strokeStyle = "White";
    this.ctx.lineWidth = 2;

    for (const i of keypointInd.middle) {
      this.drawKeypoint(keypoints[i]);
    }

    this.ctx.fillStyle = "Green";
    for (const i of keypointInd.left) {
      this.drawKeypoint(keypoints[i]);
    }

    this.ctx.fillStyle = "Orange";
    for (const i of keypointInd.right) {
      this.drawKeypoint(keypoints[i]);
    }
  }

  drawKeypoint(keypoint) {
    // If score is null, just show the keypoint.
    const score = keypoint.score != null ? keypoint.score : 1;

    if (score >= scoreThreshold) {
      const circle = new Path2D();
      circle.arc(keypoint.x, keypoint.y, 4, 0, 2 * Math.PI);
      this.ctx.fill(circle);
      this.ctx.stroke(circle);
    }
  }

  /**
   * Draw the skeleton of a body on the video.
   * @param keypoints A list of keypoints.
   */
  drawSkeleton(keypoints) {
    // Each poseId is mapped to a color in the color palette.
    const color = "White";
    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 2;

    posedetection.util.getAdjacentPairs(model).forEach(([i, j]) => {
      const kp1 = keypoints[i];
      const kp2 = keypoints[j];

      // If score is null, just show the keypoint.
      const score1 = kp1.score != null ? kp1.score : 1;
      const score2 = kp2.score != null ? kp2.score : 1;

      if (score1 >= scoreThreshold && score2 >= scoreThreshold) {
        this.ctx.beginPath();
        this.ctx.moveTo(kp1.x, kp1.y);
        this.ctx.lineTo(kp2.x, kp2.y);
        this.ctx.stroke();
      }
    });
  }
  // draw text of values provided
  drawText(a, b = 0, c = 0, d = 0) {
    this.ctx.font = "30px Arial";
    this.ctx.fillText(a, 300, 30);
    this.ctx.fillText(b, 300, 60);
    this.ctx.fillText(c, 300, 100);
    this.ctx.fillText(d, 300, 150);
  }
  // find angle bw 3 keypoints
  getAngle(a, b, c) {
    let ang =
      (180 / Math.PI) *
      (Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x));
    if (ang < 0) {
      return ang + 360;
    }
    return ang;
  }
  //find angle bw 3 points in z axis
  radians_to_degrees(radians) {
    return radians * (180 / Math.PI);
  }

  dist(p1, p2, message = null) {
    const distance = Math.sqrt(
      Math.pow(p1.x - p2.x, 2) +
        Math.pow(p1.y - p2.y, 2) +
        Math.pow(p1.z - p2.z, 2),
    );

    if (message) {
      console.log(`✅ ${message} with ditance ${distance}`);
    }

    return distance;
  }

  // Function to find the angle in 3D space

  find_angle(a, b, c) {
    const ab = this.dist(a, b);
    const bc = this.dist(b, c);
    const ac = this.dist(a, c);

    const angle =
      (Math.pow(ab, 2) + Math.pow(bc, 2) - Math.pow(ac, 2)) / (2 * ab * bc);
    return this.radians_to_degrees(Math.acos(angle));
  }

  // find distance bw 2 keypoints
  distance(a, b) {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
  }

  // validate if head to toe is in frame
  heels_valid(validator, ex) {
    try {
      let coordinates = this.pose.keypoints;
      let right_ankle = coordinates[body.right_ankle];
      let left_ankle = coordinates[body.left_ankle];
      let nose = coordinates[body.nose];
      if (
        (right_ankle.score > scoreThreshold ||
          left_ankle.score > scoreThreshold) &&
        nose.score > scoreThreshold
      ) {
        document.getElementById("green").style.border = "5px solid green";
        if (!this.start_played) {
          this.countdownAudio(ex);
        }
        if (this.countdown_end) {
          let { right_count, wrong_count } = validator();
          if (right_count + wrong_count !== this.exercise_count) {
            this.update_values(right_count, wrong_count, ex);
          }
        }
        return true;
      }
      // else {
      //     console.log(right_ankle.score, left_ankle.score, nose.score)
      //     Beep.play()
      // }
      document.getElementById("green").style.border = "none";
      return false;
    } catch (error) {
      console.log(error);
    }
  }
  // initial audio + countdwon animation
  countdownAudio = (ex) => {
    let audio = data[ex].aud2;
    if (this.playing) {
      this.playing.pause();
      this.playing.currentTime = 0;
    }
    audio.play();
    this.setPlaying(audio);
    this.start_played = true;
    const nums = document.querySelectorAll(".nums span");
    const counter = document.querySelector(".counter");
    const finalMessage = document.querySelector(".final");

    var cc = document.getElementById("countdown");
    function resetDOM() {
      counter.classList.remove("hide");
      finalMessage.classList.remove("show");

      nums.forEach((num) => {
        num.classList.value = "";
      });

      nums[0].classList.add("in");
    }
    const runAnimation = () => {
      nums.forEach((num, idx) => {
        const penultimate = nums.length - 1;
        num.addEventListener("animationend", (e) => {
          if (e.animationName === "goIn" && idx !== penultimate) {
            num.classList.remove("in");
            num.classList.add("out");
          } else if (e.animationName === "goOut" && num.nextElementSibling) {
            num.nextElementSibling.classList.add("in");
          } else {
            counter.classList.add("hide");
            finalMessage.classList.add("show");
            setTimeout(() => {
              cc.style.display = "none";
              resetDOM();
              this.countdown_end = true;
              this.start_time = new Date().getTime();
            }, 500);
          }
        });
      });
    };
    let an = setTimeout(() => {
      cc.style.display = "inline-block";
      runAnimation();
    }, data[ex].aud2len);
    this.setAnimation(an);
  };
  //updates rep count and speed in ui
  update_values = (right_count, wrong_count, ex) => {
    this.exercise_count = right_count + wrong_count;
    this.right_count = right_count;
    this.wrong_count = wrong_count;
    let time_taken = new Date().getTime() - this.start_time;
    this.setRightCount(right_count);
    this.setWrongCount(wrong_count);
    if (time_taken) {
      // console.log(time_taken, count)
      this.setSpeed(((1000 * right_count) / time_taken).toFixed(2));
    }
    if (right_count === data[ex].count) {
      this.setCompleted(true);
      new Audio(HKEnd).play();
    }
  };

  // switch bw exercises
  do_exercise(exercise) {
    switch (exercise) {
      case exercises.High_Knees:
        this.heels_valid(this.validateHighKnees, 0);
        break;

      case exercises.Jumping_Jacks:
        this.heels_valid(this.validateJumpingJacks, 1);
        break;

      case exercises.Squats:
        this.heels_valid(this.validateSquats, 2);
        break;

      case exercises.Lunges:
        this.heels_valid(this.validateLunges, 3);
        break;

      case exercises.Double_Leg_Bridge:
        this.heels_valid(this.validateDoubleLegBridge, 4);
        break;

      case exercises.Knee_Extensions:
        this.heels_valid(this.validateKneeExtensions, 5);
        break;

      case exercises.Leg_Raises:
        this.heels_valid(this.validateLegRaises, 6);
        break;

      default:
        break;
    }
  }

  //function to check the range
  inRange(input, value, upperThreshold, lowerThreshold, message = null) {
    let angle = input;
    // if (input > 180) {
    //   angle = 360 - input;
    // }
    if (upperThreshold && lowerThreshold) {
      if (angle >= value - lowerThreshold && angle <= value + upperThreshold) {
        if (message) {
          console.log(`✅ ${message} correct with angle ${angle}`);
        }
        return true;
      } else {
        if (message) {
          console.log(`❌ ${message} wrong with angle ${angle}`);
        }
        return false;
      }
    }
  }

  //lunging hip flexor stretch
  validateLungingStretch = () => {
    let coordinates = this.pose.keypoints;
    let right_ankle = coordinates[body.right_ankle];
    let right_shoulder = coordinates[body.right_shoulder];
    let right_toe = coordinates[body.right_foot_index];
    let right_knee = coordinates[body.right_knee];
    let right_hip = coordinates[body.right_hip];

    let left_ankle = coordinates[body.left_ankle];
    let left_shoulder = coordinates[body.left_shoulder];
    let left_toe = coordinates[body.left_foot_index];
    let left_knee = coordinates[body.left_knee];
    let left_hip = coordinates[body.left_hip];

    var right_knee_angle = this.getAngle(right_hip, right_knee, right_ankle);
    var left_knee_angle = this.getAngle(left_hip, left_knee, left_ankle);

    //user is facing right side
    if (left_shoulder.z < 0) {
      if (left_toe.x > right_toe.x) {
        //right in front
        var c1 = right_knee_angle < 80 && left_knee_angle < 130; //user is doing exercise
        var c2 = right_knee_angle > 165 && left_knee_angle > 170; //user came back to rest position
        var knee_front_toe = right_knee.x < right_toe.x;
        var enough_knee_bending = left_knee.y >= left_ankle.y;
        var enough_hip_stretch = left_knee.x - left_hip.x >= 90;
      }

      if (left_toe.x < right_toe.x) {
        //left in front
        c1 = left_knee_angle < 80 && right_knee_angle < 130; //user is doing exercise
        c2 = left_knee_angle > 165 && right_knee_angle > 170; //user came back to rest position
        knee_front_toe = left_knee.x < left_toe.x;
        enough_knee_bending = right_knee.y >= right_ankle.y;
        enough_hip_stretch = right_knee.x - right_hip.x >= 90;
      }
    }

    //user is facing left side
    if (right_shoulder.z < 0) {
      if (left_toe.x > right_toe.x) {
        //left in front
        c1 = left_knee_angle > 280 && right_knee_angle > 240; //user is doing exercise
        c2 = left_knee_angle < 190 && right_knee_angle < 190; //user came back to rest position
        knee_front_toe = left_knee.x > left_toe.x;
        enough_knee_bending = right_knee.y >= right_ankle.y;
        enough_hip_stretch = right_knee.y - right_hip.y >= 90;
      }

      if (left_toe.x < right_toe.x) {
        //right in front
        c1 = right_knee_angle > 280 && left_knee_angle > 240; //user is doing exercise
        c2 = right_knee_angle < 190 && left_knee_angle < 190; //user came back to rest position
        knee_front_toe = right_knee.x > right_toe.x;
        enough_knee_bending = left_knee.y >= left_ankle.y;
        enough_hip_stretch = left_knee.y - left_hip.y >= 90;
      }
    }

    let count = this.lunging_hip_flexor_stretch.isValid(
      c1,
      c2,
      right_knee_angle,
      left_knee_angle,
      knee_front_toe,
      enough_hip_stretch,
      enough_knee_bending,
    );

    return count;
  };

  // lateral shoulder stretch
  validateLatsStretch = () => {
    let coordinates = this.pose.keypoints;
    let right_ankle = coordinates[body.right_ankle];
    let right_knee = coordinates[body.right_knee];
    let right_shoulder = coordinates[body.right_shoulder];
    let right_hip = coordinates[body.right_hip];
    let right_elbow = coordinates[body.right_elbow];
    let right_wrist = coordinates[body.right_wrist];
    let right_toe = coordinates[body.right_foot_index];
    var right_knee_angle = this.getAngle(right_hip, right_knee, right_ankle);
    var right_arm_angle = this.getAngle(right_hip, right_shoulder, right_elbow);

    let left_ankle = coordinates[body.left_ankle];
    let left_knee = coordinates[body.left_knee];
    let left_shoulder = coordinates[body.left_shoulder];
    let left_hip = coordinates[body.left_hip];
    let left_elbow = coordinates[body.left_elbow];
    let left_wrist = coordinates[body.left_wrist];
    let left_toe = coordinates[body.left_foot_index];
    var left_knee_angle = this.getAngle(left_hip, left_knee, left_ankle);
    var left_arm_angle = this.getAngle(left_hip, left_shoulder, left_elbow);

    // user is facing left side
    if (right_shoulder.z < 0) {
      var straight_back = Math.abs(right_shoulder.y - right_hip.y) <= 30;
      var straight_arm = Math.abs(right_elbow.y - right_wrist.y) <= 20;
      var knee_front_toe = right_knee.x > right_toe.x;
      var c1 = right_knee_angle > 200 && right_arm_angle < 190; //user doing exercise
      var c2 = right_knee_angle < 190; //user comes back to initial state
    }

    //user is facing right side
    if (left_shoulder.z < 0) {
      straight_back = Math.abs(left_shoulder.y - left_hip.y) <= 30;
      straight_arm = Math.abs(left_elbow.y - left_wrist.y) <= 20;
      knee_front_toe = left_knee.x < left_toe.x;
      c1 = left_knee_angle < 160 && left_arm_angle > 170; //user doing exercise
      c2 = left_knee_angle > 170; //user comes back to initial state
    }

    let count = this.lateral_shoulder_stretch.isValid(
      c1,
      c2,
      straight_back,
      straight_arm,
      knee_front_toe,
      right_knee_angle,
      right_arm_angle,
    );

    return count;
  };

  // diuble leg bridge validation
  validateDoubleLegBridge = () => {
    let coordinates = this.pose.keypoints;
    let right_ankle = coordinates[body.right_ankle];
    let right_knee = coordinates[body.right_knee];
    let right_shoulder = coordinates[body.right_shoulder];
    let right_hip = coordinates[body.right_hip];
    let right_wrist = coordinates[body.right_wrist];
    let right_ear = coordinates[body.right_ear];

    let left_ankle = coordinates[body.left_ankle];
    let left_knee = coordinates[body.left_knee];
    let left_shoulder = coordinates[body.left_shoulder];
    let left_hip = coordinates[body.left_hip];
    let left_wrist = coordinates[body.left_wrist];
    let left_ear = coordinates[body.left_ear];

    // var Lthresholdhead = left_ear.y;
    // var Rthresholdhead = right_ear.y;

    var right_knee_angle = this.getAngle(right_hip, right_knee, right_ankle);
    var hip_angle = this.getAngle(right_shoulder, right_hip, right_knee);

    var left_knee_angle = this.getAngle(left_hip, left_knee, left_ankle);
    var left_hip_angle = this.getAngle(left_shoulder, left_hip, left_knee);

    console.log("left_knee_angle", left_knee_angle);
    console.log("left_hip_angle", left_hip_angle);

    //user is facing right side
    if (left_shoulder.z < 0) {
      //var c1 = left_knee_angle > 70 && left_hip_angle < 195; //user is doing exercise
      var c1 = left_shoulder.y - left_hip.y > 40;
      //var c2 = left_knee_angle < 60 && left_hip_angle > 220; //user comes back to initial position
      var c2 = left_shoulder.y - left_hip.y < 40;
      var straight_back = hip_angle < 195; //it was 185
      var headup = left_shoulder.y - left_ear.y > 28;
      var handsup = left_wrist.y < left_shoulder.y;
    }

    //user is facing left side
    if (right_shoulder.z < 0) {
      //c1 = right_knee_angle < 296 && hip_angle > 165; //user is doing exercise
      c1 = right_shoulder.y - right_hip.y > 40;
      //c2 = right_knee_angle > 298 && hip_angle < 150; //user comes back to initial position
      c2 = right_shoulder.y - right_hip.y < 40;
      straight_back = hip_angle > 165; //it was 175
      headup = right_shoulder.y - right_ear.y > 28;
      handsup = right_wrist.y < right_shoulder.y;
    }

    let count = this.double_leg_bridge.isValid(
      c1,
      c2,
      right_knee_angle,
      hip_angle,
      straight_back,
      headup,
      handsup,
    );

    return count;
  };

  //lunges validation
  validateLunges = () => {
    let coordinates = this.pose.keypoints;
    // let nose = coordinates[body.nose]
    let right_ankle = coordinates[body.right_ankle];
    let left_ankle = coordinates[body.left_ankle];
    let left_shoulder = coordinates[body.left_shoulder];
    let right_shoulder = coordinates[body.right_shoulder];

    let left_toe = coordinates[body.left_foot_index];
    let right_toe = coordinates[body.right_foot_index];
    let right_knee = coordinates[body.right_knee];
    let left_knee = coordinates[body.left_knee];
    let right_hip = coordinates[body.right_hip];
    let left_hip = coordinates[body.left_hip];

    //when user is facing right side
    if (left_shoulder.z < 0) {
      if (left_toe.x > right_toe.x) {
        //right foot in front
        var right_knee_angle = this.getAngle(
          right_hip,
          right_knee,
          right_ankle,
        );
        var left_knee_angle = this.getAngle(left_hip, left_knee, left_ankle);

        var straight_back =
          left_shoulder.x - left_hip.x < 45 &&
          left_shoulder.x - left_hip.x > -42;

        var enough_knee_bending = left_knee.y - left_ankle.y >= 0;
        var final_condn = left_knee_angle > 150;
        var knee_front_toe = right_knee.x < right_toe.x;

        var c1 = left_knee_angle < 150 && right_knee_angle < 120; //user is doing exercise
        var c2 = right_knee_angle > 165; //user comes back to starting position
      }

      if (left_toe.x < right_toe.x) {
        //left foot in front
        right_knee_angle = this.getAngle(right_hip, right_knee, right_ankle);
        left_knee_angle = this.getAngle(left_hip, left_knee, left_ankle);

        straight_back =
          left_shoulder.x - left_hip.x < 45 &&
          left_shoulder.x - left_hip.x > -42;

        enough_knee_bending = right_knee.y - right_ankle.y >= 0;
        final_condn = right_knee_angle > 150;
        knee_front_toe = left_knee.x < left_toe.x;

        c1 = right_knee_angle < 150 && left_knee_angle < 120; //user is doing exercise
        c2 = left_knee_angle > 165; //user comes back to starting position
      }
    }

    //when user is facing left side
    if (right_shoulder.z < 0) {
      if (left_toe.x < right_toe.x) {
        //left foot in front
        right_knee_angle = this.getAngle(right_hip, right_knee, right_ankle);
        left_knee_angle = this.getAngle(left_hip, left_knee, left_ankle);

        console.log(right_knee_angle);
        console.log(left_knee_angle);

        straight_back =
          right_shoulder.x - right_hip.x < 45 &&
          right_shoulder.x - right_hip.x > -42;

        enough_knee_bending = left_knee.y - left_ankle.y >= 0;
        final_condn = left_knee_angle < 200;
        knee_front_toe = right_knee.x > right_toe.x;

        console.log("left", left_knee_angle, "right", right_knee_angle);
        c1 = left_knee_angle > 200 && right_knee_angle > 210; //user is doing exercise
        c2 = right_knee_angle < 200; //user comes back to starting position
      }

      if (left_toe.x > right_toe.x) {
        //right foot in front
        right_knee_angle = this.getAngle(right_hip, right_knee, right_ankle);
        left_knee_angle = this.getAngle(left_hip, left_knee, left_ankle);

        console.log("right", right_knee_angle);
        console.log("left", left_knee_angle);

        straight_back =
          right_shoulder.x - right_hip.x < 45 &&
          right_shoulder.x - right_hip.x > -42;

        enough_knee_bending = right_knee.y - right_ankle.y >= 0;
        final_condn = right_knee_angle < 200;
        knee_front_toe = left_knee.x > left_toe.x;

        console.log("left", left_knee_angle, "right", right_knee_angle);
        c1 = right_knee_angle > 200 && left_knee_angle > 210; //user is doing exercise
        c2 = left_knee_angle < 200; //user comes back to starting position
      }
    }

    let count = this.lunges.isValid(
      c1,
      c2,
      straight_back,
      enough_knee_bending,
      right_knee_angle,
      left_knee_angle,
      knee_front_toe,
      final_condn,
    );

    return count;
  };

  // high knees validation
  validateHighKnees = () => {
    let coordinates = this.pose.keypoints;
    let right_ankle = coordinates[body.right_ankle];
    let left_ankle = coordinates[body.left_ankle];

    let right_knee = coordinates[body.right_knee];
    let left_knee = coordinates[body.left_knee];
    let right_hip = coordinates[body.right_hip];
    let left_hip = coordinates[body.left_hip];

    let RLD = Math.abs(right_ankle.y - left_ankle.y);
    let count = this.high_knee.isValid(
      RLD,
      right_knee.y,
      left_knee.y,
      right_hip.y,
      left_hip.y,
      right_ankle.y,
      left_ankle.y,
    );

    return count;
  };

  // jumping jacks validation
  validateJumpingJacks = () => {
    let coordinates = this.pose.keypoints;
    let right_shoulder = coordinates[body.right_shoulder];
    let left_shoulder = coordinates[body.left_shoulder];
    let right_ankle = coordinates[body.right_ankle];
    let left_ankle = coordinates[body.left_ankle];
    let right_elbow = coordinates[body.right_elbow];
    let left_elbow = coordinates[body.left_elbow];

    let ankle_mid_point = (left_shoulder.x + right_shoulder.x) / 2;

    let shoulder_distance = this.distance(left_shoulder, right_shoulder);
    let ankle_distance = this.distance(left_ankle, right_ankle);
    let ld = left_ankle.x - ankle_mid_point;
    let rd = ankle_mid_point - right_ankle.x;
    let diff = Math.abs(ld - rd);
    let count = this.jumping_jack.isValid(
      diff,
      left_elbow.y,
      right_elbow.y,
      left_shoulder.y,
      right_shoulder.y,
      shoulder_distance,
      ankle_distance,
    );

    return count;
  };

  // squats validation
  validateSquats = () => {
    let coordinates = this.pose.keypoints;
    let correction = 25;
    let nose = coordinates[body.nose];
    let right_ankle = coordinates[body.right_ankle];
    let left_ankle = coordinates[body.left_ankle];
    let left_hip = coordinates[body.left_hip];
    let right_hip = coordinates[body.right_hip];
    let left_knee = coordinates[body.left_knee];
    let right_knee = coordinates[body.right_knee];
    let left_wrist = coordinates[body.left_wrist];
    let right_wrist = coordinates[body.right_wrist];
    let left_shoulder = coordinates[body.left_shoulder];
    let right_shoulder = coordinates[body.right_shoulder];

    let profile = left_wrist.x > left_shoulder.x ? "right" : "left";
    let left_wrist_shoulder_ankle_angle = this.getAngle(
      left_wrist,
      left_shoulder,
      left_ankle,
    );
    let right_wrist_shoulder_ankle_angle = this.getAngle(
      right_wrist,
      right_shoulder,
      right_ankle,
    );

    let straight_hands_condn =
      profile === "left"
        ? (left_wrist_shoulder_ankle_angle >= 250 &&
            left_wrist_shoulder_ankle_angle <= 290) ||
          (right_wrist_shoulder_ankle_angle >= 250 &&
            right_wrist_shoulder_ankle_angle <= 290)
        : (left_wrist_shoulder_ankle_angle >= 70 &&
            left_wrist_shoulder_ankle_angle <= 110) ||
          (right_wrist_shoulder_ankle_angle >= 70 &&
            right_wrist_shoulder_ankle_angle <= 110);

    let squat_low_condn =
      left_hip.y + correction >= left_knee.y ||
      right_hip.y + correction >= right_knee.y;

    let head_condn = nose.y <= left_shoulder.y || nose.y <= right_shoulder.y;

    let left_shoulder_hip_knee_angle = this.getAngle(
      left_shoulder,
      left_hip,
      left_knee,
    );
    let right_shoulder_hip_knee_angle = this.getAngle(
      right_shoulder,
      right_hip,
      right_knee,
    );
    let hips_condn =
      (left_shoulder_hip_knee_angle >= 20 &&
        left_shoulder_hip_knee_angle <= 35) ||
      (right_shoulder_hip_knee_angle >= 11 &&
        right_shoulder_hip_knee_angle <= 42);

    // this.drawText([squat_low_condn, nose.y], [straight_hands_condn, head_condn], hips_condn)

    return this.squat.isValid(
      squat_low_condn,
      nose.y,
      straight_hands_condn,
      head_condn,
      hips_condn,
    );
  };

  //validate leg raises
  validateLegRaises = () => {
    let coordinates = this.pose.keypoints;

    let right_hip = coordinates[body.right_hip];
    let left_hip = coordinates[body.left_hip];

    let right_shoulder = coordinates[body.right_shoulder];
    let left_shoulder = coordinates[body.left_shoulder];

    let right_knee = coordinates[body.right_knee];
    let left_knee = coordinates[body.left_knee];

    let right_ankle = coordinates[body.right_ankle];
    let left_ankle = coordinates[body.left_ankle];

    let right_wrist = coordinates[body.right_wrist];
    let left_wrist = coordinates[body.left_wrist];

    let right_ear = coordinates[body.right_ear];
    let left_ear = coordinates[body.left_ear];

    let right_elbow = coordinates[body.right_elbow];
    let left_elbow = coordinates[body.left_elbow];

    const yDist = (a, b, message = null) => {
      const dist = Math.abs(a.y - b.y);
      if (message) {
        console.log(`✅ ${message} distance is ${dist} units`);
      }
      return dist;
    };

    if (right_shoulder.z < 0) {
      let leg_angle = this.find_angle(right_shoulder, right_hip, right_ankle);
      let hand_position = yDist(right_elbow, right_wrist);
      let knee_angle = this.find_angle(right_hip, right_knee, right_ankle);
      let neck_angle = this.find_angle(right_ear, right_shoulder, right_hip);
      let opp_leg_angle = this.find_angle(left_shoulder, left_hip, left_ankle);
      let opp_knee_angle = this.find_angle(left_hip, left_knee, left_ankle);

      let leg_valid = this.inRange(leg_angle, 140, 10, Infinity);
      let opp_leg_valid = this.inRange(opp_leg_angle, 140, 10, Infinity);
      let knee_valid = this.inRange(knee_angle, 160, 20, 10);
      let opp_knee_valid = this.inRange(opp_knee_angle, 160, 20, 10);
      let neck_valid = this.inRange(neck_angle, 160, Infinity, 10);
      let hand_valid = this.inRange(hand_position, 5, 20, Infinity);
      let c1 =
        !this.inRange(leg_angle, 170, 10, 10) ||
        !this.inRange(opp_leg_angle, 170, 10, 10);

      return this.leg_raises.isValid(
        c1,
        leg_valid,
        knee_valid,
        neck_valid,
        hand_valid,
        opp_leg_valid,
        opp_knee_valid,
      );
    } else {
      let leg_angle = this.find_angle(left_shoulder, left_hip, left_ankle);
      let opp_leg_angle = this.find_angle(
        right_shoulder,
        right_hip,
        right_ankle,
      );
      let opp_knee_angle = this.find_angle(right_hip, right_knee, right_ankle);
      let hand_position = yDist(left_elbow, left_wrist);
      let knee_angle = this.find_angle(left_hip, left_knee, left_ankle);
      let neck_angle = this.find_angle(left_ear, left_shoulder, left_hip);

      let leg_valid = this.inRange(leg_angle, 140, 10, Infinity);
      let knee_valid = this.inRange(knee_angle, 160, 20, 10);
      let neck_valid = this.inRange(neck_angle, 160, Infinity, 10);
      let hand_valid = this.inRange(hand_position, 5, 20, Infinity);
      let opp_leg_valid = this.inRange(opp_leg_angle, 140, 10, Infinity);
      let opp_knee_valid = this.inRange(opp_knee_angle, 160, 20, 10);

      let c1 =
        !this.inRange(leg_angle, 170, 10, 10) ||
        !this.inRange(opp_leg_angle, 170, 10, 10);

      return this.leg_raises.isValid(
        c1,
        leg_valid,
        knee_valid,
        neck_valid,
        hand_valid,
        opp_leg_valid,
        opp_knee_valid,
      );
    }
  };

  validateKneeExtensions = () => {
    let coordinates = this.pose.keypoints;

    let right_hip = coordinates[body.right_hip];
    let left_hip = coordinates[body.left_hip];

    let right_shoulder = coordinates[body.right_shoulder];
    // let left_shoulder = coordinates[body.left_shoulder];

    let right_knee = coordinates[body.right_knee];
    let left_knee = coordinates[body.left_knee];

    let right_ankle = coordinates[body.right_ankle];
    let left_ankle = coordinates[body.left_ankle];

    let right_ear = coordinates[body.right_ear];
    // let left_ear = coordinates[body.left_ear];

    let right_foot_index = coordinates[body.right_foot_index];
    let left_foot_index = coordinates[body.left_foot_index];

    if (right_shoulder.z < 0) {
      let opp_knee_angle = this.find_angle(left_hip, left_knee, left_ankle);
      let knee_angle = this.find_angle(right_hip, right_knee, right_ankle);

      let back_angle = this.find_angle(right_knee, right_hip, right_shoulder);

      let neck_angle = this.find_angle(right_hip, right_shoulder, right_ear);

      let ankle_angle = this.find_angle(
        right_foot_index,
        right_ankle,
        right_knee,
      );

      let opp_ankle_angle = this.find_angle(
        left_foot_index,
        left_ankle,
        left_knee,
      );

      //checking if the angles are in range
      let valid_knee_angle = this.inRange(knee_angle, 170, 20, 20);
      let valid_opp_knee_angle = this.inRange(opp_knee_angle, 170, 20, 20);

      let valid_back_angle = this.inRange(back_angle, 90, 30, 15);

      let valid_neck_angle = this.inRange(neck_angle, 160, 20, 20);

      let valid_ankle = this.inRange(ankle_angle, 110, 30, Infinity);
      let valid_opp_ankle = this.inRange(opp_ankle_angle, 110, 30, Infinity);

      let c1 =
        !this.inRange(knee_angle, 100, 30, Infinity) ||
        !this.inRange(opp_knee_angle, 100, 30, Infinity);

      return this.knee_extension.isValid(
        c1, //the condition when the person starts the exercise
        valid_knee_angle,
        valid_opp_knee_angle,
        valid_back_angle,
        valid_neck_angle,
        valid_ankle,
        valid_opp_ankle,
      );
    }
  };

  // validateActiveHipAbduction = () => {
  //   this.actvie_hip_abduction.isValid();
  //   console.log("come fast");
  // };
}
