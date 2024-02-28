import Hands from "../Assets/Sound/squats/SQUAT_correction_hands straight.mp3";
import HKMG from "../Assets/Sound/high_knees/HIGH KNEES_motivation_great.mp3";
import HKMR from "../Assets/Sound/high_knees/HIGH KNEES_motivation_reps.mp3";
import Head from "../Assets/Sound/squats/SQUAT_correction_head straight.mp3";
import Squat_low from "../Assets/Sound/squats/SQUAT_correction_squat lower.mp3";
import hips_back from "../Assets/Sound/squats/hips_back.mp3";
// import Beep from './beep.mp3'

const low_audio = new Audio(Squat_low);
const hands_audio = new Audio(Hands);
const head_audio = new Audio(Head);
const great_audio = new Audio(HKMG);
const last_few_audio = new Audio(HKMR);
const hips_audio = new Audio(hips_back);
// const beep = new Audio(Beep)

export class Squats {
  constructor() {
    this.max_nose = 1000;
    this.head = false;
    this.hips = true;
    this.squat_low = false;
    this.hands = false;
    this.again = true;
    this.right_count = 0;
    this.wrong_count = 0;
    this.p1 = 0;
    this.p2 = 0;
  }
  isValid(squat_low_condn, nose, straight_hands_condn, head_condn, hip_condn) {
    if (nose < this.max_nose) {
      this.max_nose = nose;
    }
    let condn1 = nose - this.max_nose > 100;

    if (condn1) {
      //squatting
      if (squat_low_condn) {
        this.squat_low = true;
        if (head_condn) {
          this.head = true;
        }

        if (hip_condn) {
          this.hips = true;
        }

        if (straight_hands_condn) {
          this.hands = true;
        }
      }
      this.again = false;
    } else {
      if (!this.again) {
        if (this.squat_low) {
          if (this.hips) {
            if (this.hands) {
              if (this.head) {
                this.right_count += 1;
              } else {
                this.wrong_count += 1;
                head_audio.play();
              }
            } else {
              this.wrong_count += 1;
              hands_audio.play();
            }
          } else {
            this.wrong_count += 1;
            hips_audio.play();
          }
        } else {
          low_audio.play();
        }
      }
      this.again = true;
      this.hands = false;
      this.squat_low = false;
      this.head = false;
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
