/***********************************************************
* Project: R.Lloyd Gonzales Portfolio Website
* URL: RLGonzales.com
* Contact: rolandolloyd@gmail.com
* Copyright © 2019 GonzalesDesign
* Platform: Angular 6
* Service Name: CarouselService
* Revised: 04.05.19
* Note: Service Class for Sliding Carousel
***********************************************************/

import { Injectable } from '@angular/core';
import { TweenMax, Power2} from 'gsap';
import { FunksionsService } from './funksions.service';

/*---| @Injectable.providedIn works with NgModule |---*/
@Injectable({
  providedIn: 'root'
})

export class CarouselService {

  public counter: number;
  public xPos = 0; // fotoWidth used as x position
  public endOfStrip: boolean;

  constructor(private _funksions: FunksionsService) {}

  /*---==========================================================================---*//*
    fCarousel() : Service for sliding carousel. R•19.03.29
                  leftBtnIcon, rightBtnIcon = triggering button icons
                  elem = kontainer that holds the images to carousel
                  slideDirection = either 'left' or 'right'. parallax effect
                  imgWidth = image width based on width of the mask in the host component
                  imgsToDisplay = amount specified in the host component. amount of
                                  image(s) visible inside the carousel window.
                  imageCount = amount of images per carousel or project.
                  displayMaskWidth =
                  xPos = elem x position trigger by the buttons.
  *//*---==========================================================================---*/
  public fCarousel(leftBtnIcon, rightBtnIcon, elem, slideDirection, imgWidth, imgsToDisplay, imageCount) {
    const displayMaskWidth = (imgWidth * imgsToDisplay);
    console.log('displayMaskWidth: ', displayMaskWidth);
    console.log('this.xPos: ', this.xPos);

    /*--= on enter leftBtnIcon will have opacity =--*/
    if (this.counter >= 0) {
      this.counter = 0;
      this.xPos = (displayMaskWidth * this.counter);
      this._funksions.fElementOpacity(leftBtnIcon, .25);
    }

    /*--= if right button is clicked, image kontainer slides left =--*/
    if ( slideDirection === 'left' ) {
      this.counter--;
      this.xPos = (displayMaskWidth * this.counter);
      this._funksions.fElementOpacity(leftBtnIcon, 1);

      /*--= at the end of the last image =--*/
      if (this.counter <= -(imageCount - 1)) {
        this.counter = -(imageCount - 1);
        this.xPos = (displayMaskWidth * this.counter);
        this._funksions.fElementOpacity(rightBtnIcon, .25);
      }

    /*--= if left button is clicked, image kontainer slides right =--*/
    } else if ( slideDirection === 'right' ) {
        this.counter++;
        this.xPos = (displayMaskWidth * (this.counter));
        this._funksions.fElementOpacity(rightBtnIcon, 1);

        if (this.counter >= 0) {
          this.counter = 0;
          this.xPos = (displayMaskWidth * this.counter);
          this._funksions.fElementOpacity(leftBtnIcon, .25);
        }

    /*--= for screen resizing =--*/
    } else if ( slideDirection === 'none' ) {
      // const counterX = this.counter;
      this.xPos = (displayMaskWidth * this.counter);
    }

    /*---= animation using GSAP =---*/
    TweenMax.to(elem, 1, { x: this.xPos, ease: Power2.easeInOut});

  }



  // /**-----------=====| Old: Sliding Carousel Function |=====-----------**/
  // public fSlideCarouselXXX(leftBtnIcon, rightBtnIcon, elem, slideDirection, imgWidth, imgsToDisplay, imgKontainerWidth, imageCount) {

  //   const displayMaskWidth = (imgWidth * imgsToDisplay); // carousel mask width
  //   // const countImg = imageCount;
  //   // console.log('slideDirection: ', slideDirection);
  //   // console.log('countImg: ', countImg);
  //   console.log('imageCount: ', imageCount);


  //   /*--= if right button is clicked, image kontainer slides left =--*/
  //   if ( slideDirection === 'left' ) {
  //     this.counter--;
  //     // console.log('counter: ', this.counter);
  //     // console.log('imageCount: ', imageCount, slideDirection);
  //     if (this.counter > imageCount) {
  //       this.counter = imageCount;
  //       console.log('imageCount: ', imageCount);
  //     }
  //     this.xPos = (displayMaskWidth * this.counter);
  //     // this._funksions.fElementVisibility(leftBtnIcon, 'visible'); // show hidden left arrow\
  //     this._funksions.fElementOpacity(leftBtnIcon, 1); // show hidden left arrow\

  //   /*--= else if left button is clicked, image kontainer slides right =--*/
  //   } else if ( slideDirection === 'right' ) {
  //     this.counter++;
  //     console.log('counter: ', this.counter);
  //     console.log('imageCount: ', imageCount, slideDirection);
  //     if (this.counter <= imageCount) {
  //       this.counter = imageCount;
  //       console.log('imageCount: ', imageCount);

  //     }
  //     this.xPos = (displayMaskWidth * this.counter);
  //     // this._funksions.fElementVisibility(rightBtnIcon, 'visible'); // show hidden right arrow
  //     this._funksions.fElementOpacity(rightBtnIcon, 1); // show hidden right arrow

  //   /*--= else if: for resizing screen =--*/
  //   } else if ( slideDirection === 'none' ) { // called inside fCarouselInit()
  //     const counterX = this.counter;
  //     this.xPos = (displayMaskWidth * counterX);

  //     // console.log('slide=none: counterX: ', counterX);
  //     // console.log('isNaN(counterX): ', isNaN(counterX));
  //     // console.log('xPos: ', this.xPos);

  //     /*•••= WIP: Don't know why, sometimes, it makes "counterX" value
  //     to NaN when you pop a modal and click on the right arrow,
  //     image strip slides left || resize the screen then closed
  //     the pop up and open another pop up, counterX becomes NaN.
  //     Code below forced the counterX to reset to zero when isNaN:true =•••*/
  //     if (isNaN(counterX)) {
  //       // this.counter = 0;
  //       console.log('NaN: counter: ', this.counter);
  //     }
  //   }


  //   /*--- When to hide the left and right arrows ---*/
  //   if (this.xPos >= 0) {
  //     this.xPos = 0;
  //     this.counter = 0;
  //     this.endOfStrip = false;
  //     console.log('counter: ', this.counter);
  //     // console.log('xPos >= 0: ', this.xPos);
  //     // this._funksions.fElementVisibility(leftBtnIcon, 'hidden'); // at the start hide left button icon
  //     this._funksions.fElementOpacity(leftBtnIcon, .25); // at the start hide left button icon

  //   } else if (this.xPos <= -(imgKontainerWidth - displayMaskWidth)) {
  //     this.xPos = -(imgKontainerWidth - displayMaskWidth);
  //     // this._funksions.fElementVisibility(rightBtnIcon, 'hidden'); // at the last image hide the right button icon
  //     this._funksions.fElementOpacity(rightBtnIcon, .25); // at the last image hide the right button icon
  //     this.endOfStrip = true;
  //     console.log('counter: ', this.counter);
  //     // console.log('xPos <= 0: ', this.xPos);

  //   } else {
  //     this.endOfStrip = false;
  //     // show right button when photo strip isn't at the end. happens when resizing screen.
  //     // this._funksions.fElementVisibility(rightBtnIcon, 'visible');
  //     this._funksions.fElementOpacity(rightBtnIcon, 1);
  //   }

  //   /*--- animation using GSAP ---*/
  //     TweenMax.to(elem, 1, { x: this.xPos, ease: Power2.easeInOut}); // slide animation for the images

  //     // console.log('endOfStrip: ', this.endOfStrip);
  //     // console.log('counter: ', this.counter);
  //     // console.log('imgKontainerWidth: ', imgKontainerWidth);

  // }
}
