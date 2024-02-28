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

export class Lunges {
  constructor() {
    this.p1 = 0;
    this.p2 = 0;
    this.right_count = 0;
    this.wrong_count = 0;
    this.again = true;
    this.straight_back = true;
    this.knee_front_toe = false;
    this.enough_knee_bending = false;
    this.final_condn = false;
  }
  isValid(
    c1,
    c2,
    straight_back,
    enough_knee_bending,
    right_knee_angle,
    left_knee_angle,
    knee_front_toe,
    final_condn,
  ) {
    if (c1) {
      // user is doing lunging
      if (!straight_back) {
        this.straight_back = false;
      }
      if (enough_knee_bending) {
        this.enough_knee_bending = true;
      }
      if (knee_front_toe) {
        this.knee_front_toe = true;
      }
      this.max1 = 0;
      this.max2 = 0;
      this.again = false;
    } else if (c2) {
      //user comes back to initial position
      if (!this.again) {
        if (final_condn) {
          this.final_condn = true;
        }
        if (this.enough_knee_bending) {
          if (!this.knee_front_toe) {
            if (this.straight_back) {
              if (this.final_condn) {
                this.right_count += 1;
              } else {
                this.wrong_count += 1;
                Final.play(); //when back is not staight when you comes back to initial position
              }
            } else {
              this.wrong_count += 1;
              Back.play(); //when back is not straight
            }
          } else {
            this.wrong_count += 1;
            Toe.play(); //when knee is in front of toe of front foot
          }
        } else {
          Knee.play(); //when enough knee is not bend enough of the backward foot
        }
      }

      this.again = true;
      this.straight_back = true;
      this.knee_front_toe = false;
      this.enough_knee_bending = false;
      this.final_condn = false;
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
