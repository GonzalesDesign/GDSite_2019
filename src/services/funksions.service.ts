

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
import { TweenMax, TimelineMax, ScrollToPlugin, CSSPlugin, Power2, Elastic } from 'gsap/all';

@Injectable({
  providedIn: 'root'
})

  export class FunksionsService {

  public hideElement = false;
  public tL = new TimelineMax();
  public tMx = TweenMax;
  public plugins = [CSSPlugin, ScrollToPlugin];

  public sharedElement: string;

  constructor() {}

  /*-----=| STATIC FUNCTIONS |=-----*/


  /*---| For text alignment:
      options = [center, left, right, justify] |----*/

  public fTextAlign(e, align) {
    const x = document.querySelector(e), s = x.style;
    s.textAlign = align;
  }

  public fStyleMe(e, styleValue) {
    const x = document.querySelector(e), s = x.style;
    // let t = s.fontSize;
    s.fontSize = styleValue;
    // s.backgroundColor = 'red';
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

  public fTMXVisibility(elem, tym, showHide) {
    this.tMx
    .to(elem, tym, {
      visibility: showHide,
      ease: Power2.easeOut, delay: .5 });
    // .from(e2, 2, { y: -100, alpha: 0, ease: Elastic.easeOut, delay: 1 });
  }

  public fTMXfontSize(elem, tym, sizeFont?: any) {
    this.tMx
    .to(elem, tym, {
      fontFamily: 'Open Sans',
      fontKerning: '1px',
      letterSpacing: '1px',
      fontSize: sizeFont,
      // backgroundColor: 'red',
      ease: Power2.easeOut, delay: .5 });
    // .from(e2, 2, { y: -100, alpha: 0, ease: Elastic.easeOut, delay: 1 });
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

  public fGetRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
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

  public fLoadTimer(el, tym) {
    const Cont = {val: 0};
    const NewVal = 100 ;
    const animTym = tym / 1000; // converting setTimeout x000 format to gsap
    // console.log('el: ', el);
    TweenMax.to(Cont, animTym, {val: NewVal, roundProps: 'val', onUpdate: function() {
      document.querySelector(el).innerHTML = Cont.val + '%';
    }});
  }

  /*=--===============================================================================---=/
    fShowHideTopNav: Hide top nav bar when scroll up. Show top nav bar on scroll down.
                   Usage: Hide up and show down top nav or other elem.
                          Call in ts, set id in html, anim in scss
                   R:19.03.25
	/=-================================================================================---=*/
  public fShowHideTopNav(id, showPos, hidePos) {
    let prevScrollpos = window.pageYOffset;
    console.log('prevScrollpos 1: ', prevScrollpos, id, showPos, hidePos);
    window.onscroll = () => { // function()
    const currentScrollPos = window.pageYOffset;
        console.log('prevScrollpos 2: ', prevScrollpos, id, showPos, hidePos);
        if (prevScrollpos > currentScrollPos) {
        // document.getElementById('r3NavBarKontainer').style.top = '0';
        document.getElementById(id).style.top = showPos + 'px'; // '0';
        } else {
        // document.getElementById('r3NavBarKontainer').style.top = '-50px';
        document.getElementById(id).style.top = hidePos + 'px'; // '-50px';
        }
        prevScrollpos = currentScrollPos;
        console.log('prevScrollpos: ', prevScrollpos);

    };
  }

  public fTMXscrollShowHide(elem, showPos) {
    console.log('elem: ', elem);
    TweenMax.to(elem, 1, {rotation: 360, ease: Power2.easeOut});
    // TweenMax.to(elem, 2, {scrollTo: showPos + 'px'});
  }

}


