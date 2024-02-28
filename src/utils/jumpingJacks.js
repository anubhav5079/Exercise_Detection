import Hands from "../Assets/Sound/jumping_jacks/Jumping jacks_correction_lift hands higher.mp3";
import Legs from "../Assets/Sound/jumping_jacks/Jumping jacks_correction_spread your legs wider.mp3";
import Great from "../Assets/Sound/jumping_jacks/Jumping jacks_motivation_great going.mp3";
import LastFew from "../Assets/Sound/jumping_jacks/Jumping jacks_motivation_last few reps.mp3";
// import beep from './beep.mp3'

const correction = 100;

const hands_higher = new Audio(Hands);
const legs_wider = new Audio(Legs);
const great_audio = new Audio(Great);
const last_few_audio = new Audio(LastFew);
// const Beep = new Audio(beep)

export class JumpingJacks {
  constructor() {
    this.valid = 0;
    this.prev = true;
    this.right_count = 0;
    this.wrong_count = 0;
    this.high = false;
    this.p1 = 0;
    this.p2 = 0;
  }
  isValid(
    diff,
    left_elbow,
    right_elbow,
    left_shoulder,
    right_shoulder,
    shoulder_distance,
    ankle_distance,
  ) {
    let condn1 = ankle_distance > shoulder_distance;
    let condn2 = right_elbow < right_shoulder && left_elbow < left_shoulder;
    let condn3 = diff < correction;

    if ((condn1 || condn2) && condn3) {
      // jumping
      if (condn1 && !condn2) {
        //hands not moving
        this.valid = 1;
      } else if (!condn1 && condn2) {
        //legs not moving
        this.valid = 2;
      } else {
        //perfect rep
        this.high = true;
      }
      this.prev = false;
    } else {
      //on ground
      if (!this.prev && this.valid) {
        if (this.high) {
          this.right_count += 1;
        } else if (this.valid === 1) {
          this.wrong_count += 1;
          hands_higher.play();
        } else {
          this.wrong_count += 1;
          legs_wider.play();
        }
        this.valid = 0;
        this.high = false;
      }
      this.prev = true;
    }
    if (this.right_count === 20 && this.p1 !== this.right_count) {
      last_few_audio.play();
      this.p1 = this.right_count;
    }
    if (
      (this.right_count === 5 ||
        this.right_count === 10 ||
        this.right_count === 15) &&
      this.p2 !== this.right_count
    ) {
      great_audio.play();
      this.p2 = this.right_count;
    }
    return {
      right_count: this.right_count,
      wrong_count: this.wrong_count,
    };
  }
}
