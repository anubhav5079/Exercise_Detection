import Legs from "../Assets/Sound/leg_raise/Straight leg raise_correction_raise leg six inches off ground.mp3";
import Knee from "../Assets/Sound/leg_raise/Straight leg raise_correction_try not to bend leg.mp3";
import Neck from "../Assets/Sound/leg_raise/Straight leg raise_correction_keep head straight.mp3";
import Hand from "../Assets/Sound/leg_raise/Straight leg raise_correction_keep hands on floor.mp3";
const legAudio = new Audio(Legs);
const kneeAudio = new Audio(Knee);
const neckAudio = new Audio(Neck);
const handAudio = new Audio(Hand);

export class Leg_Raises {
  constructor() {
    this.again = true;
    this.leg_bending = false;
    this.knee_bending = false;
    this.neck_bending = false;
    this.hand_bending = false;
    this.opp_leg_bending = false;
    this.opp_knee_bending = false;
    this.right_count = 0;
    this.wrong_count = 0;
  }
  isValid(c1, LA, KA, NA, HA, OLA, OKA) {
    if (c1) {
      if (LA) this.leg_bending = true;
      if (KA) this.knee_bending = true;
      if (NA) this.neck_bending = true;
      if (HA) this.hand_bending = true;
      if (OLA) this.opp_leg_bending = true;
      if (OKA) this.opp_knee_bending = true;
      this.again = false;
    } else {
      if (!this.again) {
        if (this.leg_bending || this.opp_leg_bending) {
          if (this.knee_bending && this.opp_knee_bending) {
            if (this.neck_bending) {
              if (this.hand_bending) {
                this.right_count += 1;
              } else {
                this.wrong_count += 1;
                handAudio.play();
              }
            } else {
              this.wrong_count += 1;
              neckAudio.play();
            }
          } else {
            this.wrong_count += 1;
            kneeAudio.play();
          }
        } else {
          this.wrong_count += 1;
          legAudio.play();
        }
      }
      this.leg_bending = false;
      this.knee_bending = false;
      this.hand_bending = false;
      this.neck_bending = false;
      this.opp_knee_bending = false;
      this.opp_leg_bending = false;
      this.again = true;
    }
    return {
      right_count: this.right_count,
      wrong_count: this.wrong_count,
    };
  }
}
