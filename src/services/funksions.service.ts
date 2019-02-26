

/***********************************************************
* Project: R.Lloyd Gonzales Portfolio Website
* URL: RLGonzales.com
* Contact: rolandolloyd@gmail.com
* Copyright © 2019 GonzalesDesign
* Platform: Angular 6
* Service Name: FunksionsService
* Version: 090418
* Note: Miscellaneous functions that can be called anywhere
***********************************************************/


import { Injectable } from '@angular/core';
import { TweenMax, TimelineMax, TweenLite, Power2, Elastic } from 'gsap';

@Injectable({
  providedIn: 'root'
})

  export class FunksionsService {

  public hideElement = false;
  public tL = new TimelineMax();

  public sharedElement: string;

  constructor() {}

  /*-----=| STATIC FUNCTIONS |=-----*/


  /*---| For text alignment:
      options = [center, left, right, justify] |----*/

  public fTextAlign(e, align) {
    const x = document.querySelector(e), s = x.style;
    s.textAlign = align;
  }

  /*- For displaying an element.
      options: none, inline, block or inline-block ----*/
 public fDisplay(e, disp) {
    // console.log(e, disp);
    const x = document.querySelector(e), s = x.style;
    s.display = disp;
  }

 public fDisplayAll(e, disp) {
    const elems = document.querySelectorAll(e); // as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < elems.length; i++) {
        elems[i].style.display = disp;
    }
  }
 public fVisibilityAll(e, vis) {
    const elems = document.querySelectorAll(e); // as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < elems.length; i++) {
        elems[i].style.visibility = vis;
    }
  }

 public fRemoveLoader(e, disp, tym) {
    const x = document.querySelector(e); // , s = x.style;
    if (disp === 'none') {
      this.fTMxToAlfa(x, tym, 0, Power2.easeOut);
      setTimeout(() => {
        x.parentNode.removeChild(x);
      }, tym * 1000 );
    }
}

  /*- Setting an element visibility.
      options: visible, hidden ----*/
 public fElementVisibility(e, vis) {
    const x = document.querySelector(e),
    s = x.style;
    s.visibility = vis;
  }
 public fIdVisibility(e, vis) {
    const x = document.getElementById(e),
    s = x.style;
    s.visibility = vis;
  }

 public fElementOpacity(e, alfa) {
    const x = document.querySelector(e),
    s = x.style;
    s.opacity = alfa;
  }

  /*- Setting width of an element. ----*/
 public fElementWidth(e, w) {
    const x = document.querySelector(e), s = x.style;
    s.width = w + 'px';
    // console.log('e | w : ', e, ' | ', w);
  }
 public fElementWidthId(id, w) {
    const x = document.getElementById(id), s = x.style;
    s.width = w + 'px';
    // console.log('e | w : ', e, ' | ', w);
  }

  /*- Setting height of an element. ----*/
 public fElementHeight(e, h) {
    const x = document.querySelector(e), s = x.style;
    s.height = h;
    console.log('fElementHeight : ', e, ' | ', h);
  }

  /*- Setting an element horizontal position. ----*/
 public fElementXPosition(e, xPos) {
    const x = document.querySelector(e), s = x.style;
    // s.left = xPos + 'px';
    s.translateX = xPos + 'px';
    console.log('fElementXPosition');
  }

  // public fElementXPositionId(e, xPos) {
  //   const x = document.getElementById(e), s = x.style;
  //   // s.left = xPos + 'px';
  //   s.translateX = xPos + 'px';
  //   console.log('e | fElementXPositionId : ', e, ' | ', xPos);
  // }

  /*- Setting an element vertical position. ----*/
 public fElementYPosition(e, yPos) {
    const x = document.querySelector(e), s = x.style;
    s.top = yPos + 'vh';
    console.log('fElementYPosition');
  }

  /*- Checking images orientation ----*/
 public fImgOrientation(d, val) {
    d.forEach(eachObj => {
      val = eachObj.orientation; // defined in json. abstract it!
      console.log('fImgOrientation');
    });
  }

  /*-----=| ANIMATED FUNCTIONS |=-----*/

  /*--- GSAP2 Animation Engine: TweenMax ---*/
 public fTMxFrX(e, tym, val, easing) {
    TweenMax.from(e, tym, {x: val, ease: easing});
  }

 public fTMxToX(e, tym, val, easing) {
    TweenMax.to(e, tym, {x: val, ease: easing});
  }
 public fTMxToX2(e, tym, val) {
    TweenMax.to(e, tym, {x: val, ease: Power2.easeOut});
  }
 public fTMxToAlfa(e, tym, val, easing) {
    TweenMax.to(e, tym, {opacity: val, ease: easing});
  }
 public fTMxToRotate(e, tym, val) {
    TweenMax.to(e, tym, {rotation: val, ease: Power2.easeOut});
    console.log('e rotation: ', e);
  }

 public fTMxFrY(e, tym, val, easing) {
    TweenMax.from(e, tym, {y: val, ease: easing});
  }

 public fTMxFrAlpha(e, tym, val, easing) {
    TweenMax.from(e, tym, {alpha: val, ease: easing});
  }

  /*- Setting width of an element. ----*/
 public fTMxToWidth(e, tym, val, easing) {
    TweenMax.from(e, tym, {width: val, ease: easing});
  }

  /*--- GSAP2 Animation Engine: TimelineMax ---*/
 public fTLMx(e1, e2) {
    this.tL
    .from(e1, 1, { alpha: 0, ease: Power2.easeOut, delay: .5 })
    .from(e2, 2, { y: -100, alpha: 0, ease: Elastic.easeOut, delay: 1 });
  }

 public fLoadTimer(el, tym) {
    const Cont = {val: 0};
    const NewVal = 100 ;
    const animTym = tym / 1000; // converting setTimeout x000 format to gsap
    // console.log('el: ', el);
    TweenMax.to(Cont, animTym, {val: NewVal, roundProps: 'val', onUpdate: function() {
      document.querySelector(el).innerHTML = Cont.val + '%';
    }});
  }

}


