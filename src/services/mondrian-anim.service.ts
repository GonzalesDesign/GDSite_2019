/***********************************************************
* Project: R.Lloyd Gonzales Portfolio Website
* URL: RLGonzales.com
* Contact: rolandolloyd@gmail.com
* Copyright © 2019 GonzalesDesign
* Platform: Angular 6
* Service Name: Mondrian Animations
* Note: Animation service for stacking images
***********************************************************/

import { FunksionsService } from './funksions.service';
import { Injectable } from '@angular/core';
import { TweenMax, TimelineMax, Power2, Power4, Elastic } from "gsap/TweenMax";
// import { FunksionsService} from './funksions.service';

@Injectable({
  providedIn: 'root'
})
export class MondrianAnimService {

  public tMx = TweenMax;
  public tLMx = new TimelineMax();

  constructor() { }

  public fTranslateAnim2(elem, tym, xp, yp, zp = 100, w?: any, h?: any, alfa = 1) {
    this.tMx
    .to(elem, tym, {
      x: xp,
      y: yp,
      zIndex: zp,
      width: w,
      height: h,
      opacity: alfa,
      ease: Power2.easeOut, delay: .5 });
    // .from(e2, 2, { y: -100, alpha: 0, ease: Elastic.easeOut, delay: 1 });
  }


  public backgroundImageTransform2(elem, tym, bgSize?: any, hPos?: any, vPos?: any): any {
    this.tMx
    .to(elem, tym, {
      backgroundSize: bgSize,
      backgroundPositionX: hPos,
      backgroundPositionY: vPos,
      ease: Power2.easeOut
    });
  }


  public fTranslateAnim(elem, tym, xp, yp, zp = 100, w?: any, h?: any, sizeFont?: any, alfa = 1) {
    this.tMx
    .to(elem, tym, {
      x: xp,
      y: yp,
      zIndex: zp,
      width: w,
      height: h,
      fontSize: sizeFont,
      opacity: alfa,
      ease: Power2.easeOut, delay: .5 });
    // .from(e2, 2, { y: -100, alpha: 0, ease: Elastic.easeOut, delay: 1 });
  }

  public backgroundImageTransform(elem, tym, w, h, bgSize, hPos, vPos): any {
      this.tMx
      .to(elem, tym, {
        width: w,
        height: h,
        scale: 1,
        backgroundSize: bgSize,
        backgroundPositionX: hPos,
        backgroundPositionY: vPos,
        opacity: 1,
        ease: Power2.easeOut
      });
    }

  }

