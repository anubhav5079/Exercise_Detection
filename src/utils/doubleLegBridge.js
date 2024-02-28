import hip from "../Assets/Sound/Glute_Bridge/Glute_bridge_hip_correction.mp3";
import arm from "../Assets/Sound/Glute_Bridge/Glute_bridge_arm_correction.mp3";
import head from "../Assets/Sound/Glute_Bridge/Glute_bridge_head_correction.mp3";

import HKMG from "../Assets/Sound/high_knees/HIGH KNEES_motivation_great.mp3";
import HKMR from "../Assets/Sound/high_knees/HIGH KNEES_motivation_reps.mp3";

const Hip = new Audio(hip);
const Arm = new Audio(arm);
const Head = new Audio(head);

const great_audio = new Audio(HKMG);
const last_few_audio = new Audio(HKMR);

export class Double_Leg_Bridge {
  constructor() {
    this.p1 = 0;
    this.p2 = 0;
    this.right_count = 0;
    this.wrong_count = 0;
    this.max1 = 0;
    this.min1 = 720;
    this.again = true;
    this.straight_back = false;
    this.knee_front_toe = false;
    this.head_up = false;
    this.hands_up = false;
  }
  isValid(c1, c2, right_knee_angle, hip_angle, straight_back, headup, handsup) {
    if (c1) {
      //user is doing exercise
      if (straight_back) {
        this.straight_back = true;
      }

      if (headup) {
        this.head_up = true;
      }

      if (handsup) {
        this.hands_up = true;
      }

      this.max2 = 0;
      this.again = false;
    } else if (c2) {
      //user comes back to initial state
      if (!this.again) {
        if (this.straight_back) {
          if (!this.hands_up) {
            if (!this.head_up) {
              this.right_count += 1;
            } else {
              this.wrong_count += 1;
              Head.play(); //when head is not on ground
            }
          } else {
            this.wrong_count += 1;
            Arm.play(); //when arms are not on ground
          }
        } else {
          this.wrong_count += 1;
          Hip.play(); //when hip is not high enough
        }
      }

      this.again = true;
      this.straight_back = false;
      this.head_up = false;
      this.hands_up = false;
    }
    if (
      (this.right_count === 5 || this.right_count === 15) &&
      this.p1 !== this.right_count
    ) {
      great_audio.play();
      this.p1 = this.right_count;
    }
    if (this.right_count === 10 && this.p2 !== this.right_count) {
      last_few_audio.play();
      this.p2 = this.right_count;
    }
    return {
      right_count: this.right_count,
      wrong_count: this.wrong_count,
    };
  }
}
