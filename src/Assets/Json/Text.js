import second from "../images/jumping.gif";
import first from "../images/high_knees.gif";
import third from "../images/squats.gif";
import fourth from "../images/split-lunges.gif";
import fifth from "../images/glute-bridge-exercise.gif";
import sixth from "../images/knee_extension.gif";
import seventh from "../images/leg_raises.gif";

import HKintro from "../../Assets/Sound/high_knees/HIGH KNEES_Intro.mp3";
import HKSCM from "../../Assets/Sound/high_knees/high-knees-start_countdown_merged.mp3";

import JJIntro from "../../Assets/Sound/jumping_jacks/Jumping jacks_intro+start.mp3";
import JJIcnt from "../../Assets/Sound/jumping_jacks/Jumping jacks_intro+start+countdown.mp3";

import SIntro from "../../Assets/Sound/squats/squat_tab.mp3";
import SStart from "../../Assets/Sound/squats/SQUAT_start.mp3";

import LIntro from "../../Assets/Sound/lunges/LungesIntro.mp3";
import LStart from "../../Assets/Sound/lunges/lungesstartstart2.mp3";

import GBIntro from "../../Assets/Sound/Glute_Bridge/Glute_bridge_Intro.mp3";
import GBStart from "../../Assets/Sound/Glute_Bridge/Glute_bridge_start.mp3";

import KEIntro from "../../Assets/Sound/knee_extensions/Knee extension_intro.mp3";
import KEStart from "../../Assets/Sound/knee_extensions/Knee extension_start.mp3";

import LRIntro from "../../Assets/Sound/leg_raise/Straight leg raise_intro.mp3";
import LRStart from "../../Assets/Sound/leg_raise/Straight leg raise_start.mp3";

// import DevSound from '../../Assets/Sound/Development/voicebooking-speech.wav';

const data = [
  {
    text: "High Knees",
    image: first,
    description: [
      "Make sure your full body is in the camera frame",
      "Face the camera",
      "Start high knees",
    ],
    audio: new Audio(HKintro),
    aud2: new Audio(HKSCM),
    aud2len: 19600,
    reps: 20,
  },
  {
    text: "Jumping Jacks",
    image: second,
    description: [
      "Make sure your full body is in the camera frame",
      "Face the camera",
      "Start jumping jacks",
    ],
    audio: new Audio(JJIntro),
    aud2: new Audio(JJIcnt),
    aud2len: 14000,
    reps: 25,
  },
  {
    text: "Squats",
    image: third,
    description: [
      "Make sure your full body is in the camera frame",
      " Turn to your left or right, so your profile is visible to the camera",
      "Start squatting",
    ],
    audio: new Audio(SIntro),
    aud2: new Audio(SStart),
    aud2len: 25000,
    reps: 20,
  },
  {
    text: "Lunges",
    image: fourth,
    description: [
      "Make sure your full body is in the camera frame",
      "Turn to your left or right, so your profile is visible to the camera",
      "Start doing lunges",
    ],
    audio: new Audio(LIntro),
    aud2: new Audio(LStart),
    aud2len: 32000,
    reps: 20,
  },
  {
    text: "Double Leg Bridge",
    image: fifth,
    description: [
      "Make sure your full body is in the camera frame",
      "Lie on your back, with knees bent, with your profile is visible to the camera",
      "Start doing a glute bridge",
    ],
    audio: new Audio(GBIntro),
    aud2: new Audio(GBStart),
    aud2len: 34000,
    reps: 15,
  },
  {
    text: "Knee Extension",
    image: sixth,
    description: [
      "Sit down on a chair with your back straight",
      "Fully extend one leg then go down and repeat",
      "Start Knee Extensions",
    ],
    audio: new Audio(KEIntro),
    aud2: new Audio(KEStart),
    aud2len: 15000,
    reps: 20,
  },
  {
    text: "Straight Leg Raise",
    image: seventh,
    description: [
      "Lie on your back with the leg straight",
      "	Bend your other knee and rest that foot on the floor next to your straight leg.",
      "Start straight leg Raise",
    ],
    audio: new Audio(LRIntro),
    aud2: new Audio(LRStart),
    aud2len: 33600,
    reps: 15,
  },
  // {
  //   text: "Active hip abduction",
  //   image: fourth,
  //   description: [
  //     "Lie on your back with your legs straight.",
  //     "Slide your right leg out to the side as far as you can, .",
  //     "Do not turn your knee.",
  //   ],
  //   audio: new Audio(KEIntro),
  //   aud2: new Audio(KEStart),
  //   aud2len: 1,
  //   reps: 15,
  // },
  // {
  //   text: "Lateral Shoulder Stretch",
  //   image: second,
  //   description: [
  //     "Make sure your full body is in the camera frame",
  //     "Face the camera",
  //     "Start jumping jacks",
  //   ],
  //   audio: new Audio(JJIntro),
  //   aud2: new Audio(JJIcnt),
  //   aud2len: 14000,
  //   reps: 15,
  // },
  // {
  //   text: "Lunging Hip Flexor Stretch",
  //   image: second,
  //   description: [
  //     "Make sure your full body is in the camera frame",
  //     "Face the camera",
  //     "Start jumping jacks",
  //   ],
  //   audio: new Audio(JJIntro),
  //   aud2: new Audio(JJIcnt),
  //   aud2len: 14000,
  //   reps: 15,
  // },
];

export default data;
