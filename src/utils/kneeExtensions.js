import Legs from '../Assets/Sound/knee_extensions/Knee extension_correction_extend leg fully.mp3';
import Back from '../Assets/Sound/knee_extensions/Knee extension_correction_keep your back straight.mp3';
import Neck from '../Assets/Sound/knee_extensions/Knee extension_correction_keep head straight.mp3';
import Ankles from '../Assets/Sound/knee_extensions/Knee extension_correction_avoid bending ankle.mp3';

import HKMG from '../Assets/Sound/high_knees/HIGH KNEES_motivation_great.mp3';
import HKMR from '../Assets/Sound/high_knees/HIGH KNEES_motivation_reps.mp3';

const knee_audio = new Audio(Legs);
const back_audio = new Audio(Back);
const neck_audio = new Audio(Neck);
const ankle_audio = new Audio(Ankles);

const great_audio = new Audio(HKMG);
const last_few_audio = new Audio(HKMR);
export class Knee_Extensions {
  constructor() {
    this.straight_back = false;
    this.enough_knee_bending = false;
    this.enough_ankle_bending = true;
    this.enough_neck_bending = false;
    this.enough_knee_bending_opposite = false;
    this.enough_ankle_bending_opposite = true;
    this.again = true;
    this.count = 0;
  }

  /*c1 is the condition for rest, c2 is the condition for ongoing exercise
  SB is the condition for Straight Back 
  EKB is the condition for enough knee angle
  EAB is the condition for enough ankle angle
  ENB is the condition for enough neck angle
  EKBO is the condition for enough knee angle for opposite leg
  EABO is the condition for enough ankle angle for opposite leg
  */

  // isValid(c1, c2, SB, EKB, EAB, ENB, EKBO, EABO) {
  //   if (c1) {
  //     if (SB) this.straight_back = true;
  //     if (EKB) this.enough_knee_bending = true;
  //     if (ENB) this.enough_neck_bending = true;
  //     if (EAB) this.enough_ankle_bending = true;
  //     if (EKB) {
  //       if (!EAB) this.enough_ankle_bending = false;
  //     }
  //     if (EKBO) this.enough_knee_bending_opposite = true;
  //     if (EKBO) {
  //       if (EABO) this.enough_ankle_bending_opposite = true;
  //     }

  //     this.again = false;
  //   } else if (c2) {
  //     if (!this.again) {
  //       if (this.enough_knee_bending) {
  //         if (this.enough_ankle_bending) {
  //           if (this.straight_back) {
  //             if (this.enough_neck_bending) {
  //               this.count += 1;
  //             } else neck_audio.play();
  //           } else back_audio.play();
  //         } else ankle_audio.play();
  //       } else knee_audio.play();
  //     }
  //     this.again = true;
  //     this.straight_back = false;
  //     this.enough_knee_bending = false;
  //     this.enough_ankle_bending = false;
  //     this.enough_neck_bending = false;
  //     this.enough_knee_bending_opposite = false;
  //     this.enough_ankle_bending_opposite = false;
  //   }
  //   if ((this.count === 5 || this.count === 15) && this.p1 !== this.count) {
  //     great_audio.play();
  //     this.p1 = this.count;
  //   }
  //   if (this.count === 10 && this.p2 !== this.count) {
  //     last_few_audio.play();
  //     this.p2 = this.count;
  //   }
  //   return this.count;
  // }
  isValid(c1, KA, OKA, SB, NA, VA, OVA) {
    if (c1) {
      if (KA) this.enough_knee_bending = true;
      if (OKA) this.enough_knee_bending_opposite = true;
      if (SB) this.straight_back = true;
      if (NA) this.enough_neck_bending = true;
      if (!VA) this.enough_ankle_bending = false;
      if (!OVA) this.enough_ankle_bending_opposite = false;
      this.again = false;
    } else {
      if (!this.again) {
        if (this.enough_knee_bending || this.enough_knee_bending_opposite) {
          if (this.straight_back) {
            if (this.enough_neck_bending) {
              if (
                this.enough_ankle_bending ||
                this.enough_ankle_bending_opposite
              ) {
                this.count += 1;
              } else {
                ankle_audio.play();
              }
            } else {
              neck_audio.play();
            }
          } else {
            back_audio.play();
          }
        } else {
          knee_audio.play();
        }
      }
      this.enough_knee_bending = false;
      this.enough_knee_bending_opposite = false;
      this.straight_back = false;
      this.enough_neck_bending = false;
      this.again = true;
      this.enough_ankle_bending = true;
    }
    if ((this.count === 5 || this.count === 20) && this.p1 !== this.count) {
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
