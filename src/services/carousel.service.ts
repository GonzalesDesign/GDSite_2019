/***********************************************************
* Project: R.Lloyd Gonzales Portfolio Website
* URL: RLGonzales.com
* Contact: rolandolloyd@gmail.com
* Copyright © 2019 GonzalesDesign
* Platform: Angular 6
* Service Name: CarouselService
* Version: 022119
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

  public commonCounter: number;
  public xPos = 0;
  public endOfStrip: boolean;

  constructor(private _funksions: FunksionsService) {}

  /**-----------=====| Sliding Carousel Function |=====-----------**/
  public fSlideCarousel(leftBtnIcon, rightBtnIcon, elem, slideDirection, imgWidth, imgsToDisplay, imgKontainerWidth) {

    const displayMaskWidth = (imgWidth * imgsToDisplay); // carousel mask width

    // console.log('slideDirection: ', slideDirection);

    /*--= if right button is clicked, image kontainer slides left =--*/
    if ( slideDirection === 'left' ) {
      this.commonCounter--;
      this.xPos = (displayMaskWidth * this.commonCounter);
      this._funksions.fElementVisibility(leftBtnIcon, 'visible'); // show hidden left arrow\

    /*--= else if left button is clicked, image kontainer slides right =--*/
    } else if ( slideDirection === 'right' ) {
      this.commonCounter++;
      this.xPos = (displayMaskWidth * this.commonCounter);
      this._funksions.fElementVisibility(rightBtnIcon, 'visible'); // show hidden right arrow

    /*--= else if: for resizing screen =--*/
    } else if ( slideDirection === 'none' ) { // called inside fCarouselInit()
      const counter = this.commonCounter;
      this.xPos = (displayMaskWidth * counter);

      // console.log('slide=none: counter: ', counter);
      // console.log('isNaN(counter): ', isNaN(counter));
      // console.log('xPos: ', this.xPos);

      /*•••= WIP: Don't know why, sometimes, it makes "counter" value
      to NaN when you pop a modal and click on the right arrow,
      image strip slides left || resize the screen then closed
      the pop up and open another pop up, counter becomes NaN.
      Code below forced the counter to reset to zero when isNaN:true =•••*/
      if (isNaN(counter)) {
        this.commonCounter = 0;
        // console.log('NaN: commonCounter: ', this.commonCounter);
      }
    }


    /*--- When to hide the left and right arrows ---*/
    if (this.xPos >= 0) {
      this.xPos = 0;
      this.commonCounter = 0;
      this.endOfStrip = false;
      // console.log('xPos >= 0: ', this.xPos);
      this._funksions.fElementVisibility(leftBtnIcon, 'hidden'); // at the start hide left button icon

    } else if (this.xPos <= -(imgKontainerWidth - displayMaskWidth)) {
      this.xPos = -(imgKontainerWidth - displayMaskWidth);
      this._funksions.fElementVisibility(rightBtnIcon, 'hidden'); // at the last image hide the right button icon
      this.endOfStrip = true;
      // console.log('xPos <= 0: ', this.xPos);

    } else {
      this.endOfStrip = false;
      // show right button when photo strip isn't at the end. happens when resizing screen.
      this._funksions.fElementVisibility(rightBtnIcon, 'visible');
    }

    /*--- animation using GSAP ---*/
      TweenMax.to(elem, 1, { x: this.xPos, ease: Power2.easeInOut}); // slide animation for the images

      // console.log('endOfStrip: ', this.endOfStrip);
      // console.log('commonCounter: ', this.commonCounter);
      // console.log('imgKontainerWidth: ', imgKontainerWidth);

  }
}
