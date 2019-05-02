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
import { TweenMax, Power2, Power4, Elastic } from 'gsap/TweenMax';
// import { FunksionsService} from './funksions.service';

@Injectable({
  providedIn: 'root'
})
export class MondrianAnimService {

  public tMx = TweenMax;
  // public tLMx = new TimelineMax();
  // public randTime: number;

  constructor() { }

  public fGetRandomArbitrary(min, max, decimalPlaces) {
    // return Math.random() * ((max - min) + min);
    // return Math.floor(Math.random() * (max - min) + min)/100;
    const rand = Math.random() * (max - min) + min;
    const power = Math.pow(10, decimalPlaces);
    return Math.floor(rand * power) / power;
  }
  // const randTime = this._funksions.fGetRandomArbitrary(.1, .5);
  //   const tym = randTime + .25;

  public fTranslateAnim2(elem, tym, xp, yp, zp = 100, w?: any, h?: any, alfa = 1) {
    const randTime = this.fGetRandomArbitrary(.1, .9, 2);
    const sec = randTime + tym;
    // console.log('sec: ', sec);

    this.tMx
    .to(elem, sec, {
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


  public fTranslateAnim(elem, tym, xp, yp, zp = 100, w, h?: any, sizeFont?: any, alfa = 1) {
    // const elemId = elem;
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
      // if (alfa === 0){
      //   visibility: hidden;
      // } else {
      //   visibility: visible;
      // }
    // .from(e2, 2, { y: -100, alpha: 0, ease: Elastic.easeOut, delay: 1 });
  }

  public fTranslateAnim3(elem, tym, xp, yp, zp = 100, w, h?: any, sizeFont?: any, scale = 1) {
    // const elemId = elem;
    this.tMx
    .to(elem, tym, {
      x: xp,
      y: yp,
      zIndex: zp,
      width: w,
      height: h,
      fontSize: sizeFont,
      scale: scale,
      ease: Power2.easeOut, delay: .5 });
      // if (alfa === 0){
      //   visibility: hidden;
      // } else {
      //   visibility: visible;
      // }
    // .from(e2, 2, { y: -100, alpha: 0, ease: Elastic.easeOut, delay: 1 });
  }

  // Move this to funksions service
  // public fTMXfontSize(elem, tym, sizeFont?: any) {
  //   this.tMx
  //   .to(elem, tym, {
  //     fontFamily: 'Open Sans',
  //     fontKerning: '1px',
  //     letterSpacing: '1px',
  //     fontSize: sizeFont,
  //     // backgroundColor: 'red',
  //     ease: Power2.easeOut, delay: .5 });
  //   // .from(e2, 2, { y: -100, alpha: 0, ease: Elastic.easeOut, delay: 1 });
  // }
  // public fTMXVisibility(elem, tym, showHide) {
  //   this.tMx
  //   .to(elem, tym, {
  //     visibility: showHide,
  //     ease: Power2.easeOut, delay: .5 });
  //   // .from(e2, 2, { y: -100, alpha: 0, ease: Elastic.easeOut, delay: 1 });
  // }

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

