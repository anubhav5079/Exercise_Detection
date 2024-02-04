import back from "../Assets/Sound/lunges/back.mp3";
import toe from "../Assets/Sound/lunges/toe.mp3";
import knee from "../Assets/Sound/lunges/knee.mp3";
import final from "../Assets/Sound/lunges/final.mp3";

import HKMG from "../Assets/Sound/high_knees/HIGH KNEES_motivation_great.mp3";
import HKMR from "../Assets/Sound/high_knees/HIGH KNEES_motivation_reps.mp3";


const Back = new Audio(back);
const Knee = new Audio(knee);
const Toe = new Audio(toe);
const Final = new Audio(final);

const great_audio = new Audio(HKMG);
const last_few_audio = new Audio(HKMR);

export class Lunging_Hip_Flexor_Stretch {
  constructor() {
    this.p1 = 0;
    this.p2 = 0;
    this.count = 0;
    this.again = true;
    this.straight_back = true;
    this.knee_front_toe = false;
    this.enough_knee_bending = false;
    this.enough_hip_stretch = false;
  }
  isValid(
    c1,
    c2,
    right_knee_angle,
    left_knee_angle,
    knee_front_toe,
    enough_hip_stretch,
    enough_knee_bending
  ) {
    if (c1) { //user is doing exercise
      Final.play();

      if(knee_front_toe){
        this.knee_front_toe = true;
      }
      if(enough_knee_bending){
        this.enough_knee_bending = true;
      }
      if(enough_hip_stretch){
        this.enough_hip_stretch = true;
      }

      this.again = false;
    } else if (c2) { //user comes back to initial position
            if(!this.again){
              if(this.enough_knee_bending){
                 if(!this.knee_front_toe){
                   if(this.enough_hip_stretch){
                    this.count++;
                   }else{
                    Back.play(); //when hip is not stretched enough
                   }
                 }else{
                  Toe.play(); //when knee is in front of toe
                 }
              }else{ //when enough knee is not bend of the backward foot
                Knee.play();
              }
            }

            this.again=true;
            this.enough_hip_stretch=false;
            this.knee_front_toe=false;
            this.enough_knee_bending=false;
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
