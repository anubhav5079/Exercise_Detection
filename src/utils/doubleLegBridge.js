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
    this.count = 0;
    this.max1 = 0;
    this.min1=720;
    this.again = true;
    this.straight_back = false;
    this.knee_front_toe = false;
    this.head_up = false;
    this.hands_up = false;
  }
  isValid(
    c1,
    c2,
    right_knee_angle,
    hip_angle,
    straight_back,
    headup,
    handsup,
  ) {
    if (c1) {
      //user is doing exercise
      if(straight_back){
        this.straight_back = true;
      }

      if(headup){
        this.head_up = true;
      }

      if(handsup){
        this.hands_up = true;
      }

      this.max2 = 0;
      this.again = false;
    } else if(c2){ //user comes back to initial state
        if (!this.again) {
            if(this.straight_back){
                if(!this.hands_up){
                  if(!this.head_up){
                    this.count++;
                  }else{
                    Head.play(); //when head is not on ground
                  }
                }else{
                  Arm.play(); //when arms are not on ground
                }
            }else{
                Hip.play(); //when hip is not high enough
            }
        }

        this.again = true;
        this.straight_back = false;
        this.head_up=false;
        this.hands_up = false;
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
