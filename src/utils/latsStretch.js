// import Beep from './beep.mp3'

import back from "../Assets/Sound/lunges/back.mp3";
import toe from "../Assets/Sound/lunges/toe.mp3";
import knee from "../Assets/Sound/lunges/knee.mp3";
import final from "../Assets/Sound/lunges/final.mp3";

import HKMG from "../Assets/Sound/high_knees/HIGH KNEES_motivation_great.mp3";
import HKMR from "../Assets/Sound/high_knees/HIGH KNEES_motivation_reps.mp3";

// const beep = new Audio(Beep)

const Back = new Audio(back);
const Knee = new Audio(knee);
const Toe = new Audio(toe);
const Final = new Audio(final);

const great_audio = new Audio(HKMG);
const last_few_audio = new Audio(HKMR);

export class Lateral_Shoulder_Stretch {
  constructor() {
    this.p1 = 0;
    this.p2 = 0;
    this.count = 0;
    this.min = 720;
    this.again = true;
    this.straight_back = false;
    this.knee_front_toe = false;
    this.straight_arm = false;
  }
  isValid(
    c1,
    c2,
    straight_back,
    straight_arm,
    knee_front_toe,
    right_knee_angle,
    right_arm_angle
  ) {
    if (c1) { //user is doing exercise
      Knee.play();
      if(straight_back){
        this.straight_back=true;
      }

      if (straight_arm) {
        this.straight_arm = true;
      }
      if (knee_front_toe) {
        this.knee_front_toe = true;
      }

      this.again = false;
    } else if (c2) { //user comes back to initial position
      if (!this.again) {
        if (this.straight_back) {
          if (!this.knee_front_toe) {
            if (this.straight_arm) {
              this.count++;  
            } else {
              Final.play(); //when arm is not straight
            }
          } else {
            Toe.play(); // when knee is in front of toe
          }
        } else { //when back is not straight
          Back.play();
        }
      }

      this.again = true;
      this.straight_back = false;
      this.straight_arm = false;
      this.knee_front_toe = false;
    }

    if ((this.count === 5 || this.count === 15) && this.p1 !== this.count) {
      great_audio.play();
      this.p1 = this.count;
    }
    if (this.count === 10 && this.p2 !== this.count) {
      last_few_audio.play();
      this.p2 = this.count;
    }
    return this.count;
  }
}
