

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


import { Injectable, OnInit } from '@angular/core';
// import { modelGroupProvider } from '../../node_modules/@angular/forms/src/directives/ng_model_group';
// import { Carousel3DataService } from './../services/carousel3-data.service';
import { TweenMax, TimelineMax, Power2, Elastic } from 'gsap';

@Injectable({
  providedIn: 'root'
})
// export class FunksionsService implements OnInit {

  export class FunksionsService {

  public hideElement = false;
  public tL = new TimelineMax();

  public sharedElement: string;

  constructor() {}

  /*-----=| STATIC FUNCTIONS |=-----*/

  /*- For text alignment.
      options: center, left, right, justify ----*/

      /*---| adding the word public before the found match
      \s(f[A-Z](.*)({*))  // regex search
      public $1          // replace: add public before match
      */

    public fTextAlign(e, align) {
        const x = document.querySelector(e), s = x.style;
        s.textAlign = align;
      }

  /*- For displaying an element.
      options: none, inline, block or inline-block ----*/
 public fDisplay(e, disp) {
    // console.log(e);
    // console.log(disp);
    const x = document.querySelector(e), s = x.style;
    s.display = disp;
  }

 public fDisplayAll(e, disp) {
    const elems = document.querySelectorAll(e); // as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < elems.length; i++) {
        elems[i].style.display = disp;
        // elems[i].style.opacity = 0;
        // this.fTMxToAlfa(elems[i], 5, 1, Power2.easeOut);
        // this.fTMxFrAlpha(elems[i], 1, alfa, Power2.easeOut);
    }
    // this.fTMxFrAlpha(elems, 1, alfa, Power2.easeOut);
  }
 public fVisibilityAll(e, vis) {
    const elems = document.querySelectorAll(e); // as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < elems.length; i++) {
        elems[i].style.visibility = vis;
        // elems[i].style.opacity = 0;
        // this.fTMxToAlfa(elems[i], 5, 1, Power2.easeOut);
        // this.fTMxFrAlpha(elems[i], 1, alfa, Power2.easeOut);
    }
    // this.fTMxFrAlpha(elems, 1, alfa, Power2.easeOut);
  }

 public fRemoveLoader(e, disp, tym) {
    const x = document.querySelector(e); // , s = x.style;
    if (disp === 'none') {
      this.fTMxToAlfa(x, tym, 0, Power2.easeOut);
      setTimeout(() => {
        x.parentNode.removeChild(x);
      }, tym * 1000 );
    }
    // const elem = document.getElementById(id);
    // return elem.parentNode.removeChild(elem);
    // function(x){
    //   x.parentNode.removeChild(x);
    // })(document.getElementById(id)
}

  /*- Setting an element visibility.
      options: visible, hidden ----*/
 public fElementVisibility(e, vis) {
    // console.log('fElementVisibility: e ', e);
    // console.log('fElementVisibility: vis ', vis);
    // console.log(vis);
    const x = document.querySelector(e),
    s = x.style;
    s.visibility = vis;
  }
 public fIdVisibility(e, vis) {
    console.log('fIdVisibility: e ', e);
    console.log('fIdVisibility: vis ', vis);
    // console.log(vis);
    const x = document.getElementById(e),
    s = x.style;
    s.visibility = vis;
  }

 public fElementOpacity(e, alfa) {
    // console.log(e);
    // console.log(vis);
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
    console.log('e | fElementXPosition : ', e, ' | ', xPos);
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
    // s.translateY = yPos + 'px';
    // console.log('e | fElementXPosition : ', e, ' | ', yPos);
  }

  /*- If image is in landscape mode, cover the whole frame, else, follow media queries ---*/
  /* public fDisplayVerticalHorizontal(orientation, imgsNum2Display) {

    if (orientation === 'portrait') {
      imgsNum2Display = imgsNum2Display;
    } else if (orientation === 'landscape') {
      imgsNum2Display = 1;
    }
  } */

  /*- Checking images orientation ----*/
 public fImgOrientation(d, val) {
    d.forEach(eachObj => {
      val = eachObj.orientation; // defined in json. abstract it!
      console.log('val: ', eachObj.id, ' ', val);
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
    // el.innerHTML = 'Cont.val';
    }});
  }




  /*public fTLMx2(el, ...restArgs) {

  } */


}


