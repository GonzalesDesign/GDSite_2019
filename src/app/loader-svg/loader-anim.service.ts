



/***********************************************
* Project: R.Lloyd Gonzales Portfolio Website
* URL: RLGonzales.com
* Contact: rolandolloyd@gmail.com
* Copyright © 2019 GonzalesDesign
* Platform: Angular 6
* Service Name: LoaderAnimService
* Note: Service for carousel3.component.ts
        to run loader-svg.component.ts
************************************************/


import { Injectable } from '@angular/core';
import { FunksionsService } from './../../services/funksions.service';
import { TweenMax, TimelineMax, Power2, Power4, Elastic } from 'gsap';

@Injectable({
  providedIn: 'root'
})
export class LoaderAnimService {

  public tMx = TweenMax;

  // public circle: HTMLElement;
  public archSVG = '#svgArch-id';
  public circ2 = '#circ2';
  public circ4 = '#circ4';
  public circ5 = '#circ5';
  public circ6 = '#circ6';
  public circ7 = '#circ7';
  public circ8 = '#circ8';

  constructor(private _funksions: FunksionsService) { }

  /* fCreateCircle(parentEl) {
    const e = document.createElement('div');
    e.id = 'circle';
    const parent = document.getElementById(parentEl);
    parent.appendChild(e);
    // this.fCircleStyling(e, 3);
    console.log(e, ' | ', parent);
    console.log('tagName: ', e.tagName, ' |  id:', e.id);
    console.log('parent tagName: ', parent.tagName, ' |  id:', parent.id);
  } */

  /* fCircleStyling(e, thickness) {
    const x = document.querySelector(e), s = x.style;
    s.border = thickness + 'px' + 'solid' + 'yellow';
    s.color = 'rgba(120, 120, 120, .5)';
    console.log('x: ', x);
  } */

  /* SVG loader animation */
  fArchSVG() {
    // dash
    this.tMx.to(this.circ2, 0, {scale: 1, transformOrigin: '50% 50%'});
    this.tMx.to(this.circ2, 2, {scale: .4, rotation: 360, transformOrigin: '50% 50%',
      // delay: .25,
      repeat: -1,
      repeatDelay: 1,
      yoyo: true,
      ease: Elastic.easeInOut});

    this.tMx.to(this.circ4, 0, {scale: 1, transformOrigin: '50% 50%'});
    this.tMx.to(this.circ4, 2, {scale: 1, rotation: -360, transformOrigin: '50% 50%',
      // delay: .25,
      repeat: -1,
      repeatDelay: 1,
      yoyo: true,
      ease: Elastic.easeOut});

    this.tMx.to(this.circ5, 0, {rotation: 100, scale: 1, transformOrigin: '50% 50%'});
    this.tMx.to(this.circ5, 3, {scale: 1, rotation: 720, transformOrigin: '50% 50%',
      // delay: .25,
      repeat: -1,
      repeatDelay: 1,
      yoyo: true,
      ease: Elastic.easeInOut});

    // dash
    this.tMx.to(this.circ6, 4, {scale: 1, rotation: 360, transformOrigin: '50% 50%',
      // delay: .25,
      repeat: -1,
      // repeatDelay: 1,
      // yoyo: true,
      ease: Power2.easeInOut});

    this.tMx.to(this.circ7, 2, {scale: 1, rotation: 720, transformOrigin: '50% 50%',
      // delay: .25,
      repeat: -1,
      repeatDelay: 1,
      yoyo: true,
      ease: Elastic.easeInOut});

    this.tMx.to(this.circ8, 2, {scale: 1, rotation: 720, transformOrigin: '50% 50%',
      // delay: .25,
      repeat: -1,
      repeatDelay: 1,
      yoyo: true,
      ease: Elastic.easeInOut});
  }

}
