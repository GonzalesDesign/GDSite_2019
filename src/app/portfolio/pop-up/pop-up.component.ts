/***********************************************************
 * Project: R.Lloyd Gonzales Portfolio Website
 * URL: RLGonzales.com
 * Contact: rolandolloyd@gmail.com
 * Copyright © 2019 GonzalesDesign
 * Platform: Angular 6
 * Component Name: modal
 * Version: 090418
 * Note: Modal page open from portfolio component.
 ***********************************************************/

import {
  Component,
  OnInit,
  ViewChild,
  ViewChildren,
  AfterViewInit,
  AfterViewChecked,
  Inject,
  ElementRef,
  HostListener,
  Input,
  OnChanges
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FunksionsService } from './../../../services/funksions.service';
import { CarouselService } from './../../../services/carousel.service';
import { PortfolioDataService } from './../../../services/portfolio-data.service';
import { Elastic, Power2 } from 'gsap';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit, AfterViewInit, AfterViewChecked, OnChanges {
  // @ViewChild('childViewTest') childViewTest;
  @ViewChild('imgKontainrRef') imageKontainerRef: ElementRef;

  public imgKontainerTop: number;
  // @Input() childMessage: string;

  public bShow = false;

  // Keycode for ESCAPE
  private ESCAPE = 27;
  // Keycode for Right Arrow
  private RIGHT_ARROW = 39;
  // Keycode for Left Arrow
  private LEFT_ARROW = 37;
  /*---= PopUp Object =---*/
  public objPopUp = {
    projectData: this.xData,
    popImagePath: this.xData.imgPath,
  };

  public showMainKontainer: boolean;


  /*---= PopUp params properties =---*/
  public aProjects = [];
  public projectData = this.xData;
  public popImagePath = this.xData.imgPath;
  public imageToLoad = this.xData.imahe;
  public titolo = this.xData.titolo;
  public subTitle = this.xData.subTitle;
  public layout: string; // = this.xData.orientation;
  public popDescription = this.xData.deskription;
  public variation = this.xData.variation;
  public aVariedProj = [];
  public variedProjects = this.xData.variedProjects2;
  public variedProjsImg = [];
  public varNameLink = '.var-name-link';
  public mdcButtonText = '.mdc-button-text';
  public multiProjLink = '.multi-proj-link';
  public aVariedId = [];
  public aNoLink = [];
  public aVarLinkName = [];
  public buttonDisplay;
  public aButtonDisplay = [];

  public varProjectTitle;
  public linx = this.xData.linx[0];
  public linx1 = this.xData.linx[1];

  /*---= Modal properties =---*/
  public screenWidth: number; // = window.innerWidth;
  public screenHeight: number; // = window.innerHeight;
  public modalKontainerId = ('modalKontainerId');
  // public modalKontainerId = '#modal-kontainer-id'; //
  // public modalKontainerId = document.getElementById('modalKontainerId');
  public modalKontainerWidth: number;
  public modalKontainerHeight: number;
  public modalMaxHeight = this._portfolioDataService.modalHeightVH; // height info from service
  public modalKontainerInteriorWidth: number; // Modal container internal width. Declared in HTML.

  /*---= Carousel properties =---*/
  public carouselMaskWidth: number; // any;
  // public carouselKontainerId = '#carousel-kontainer-id'; // ul: photos strip
  // public carouselKontainer = '.carousel-kontainer';
  // public carouselFotoStripWidth: number; // any;
  // public totalImgsWidth: number;
  // public photoStripSetCount: number; // foto strip width / imgs to display = set
  // public commonCounterLastIndex: number;

  /*---= Images properties =---*/
  public imageKontainer = '.image-kontainer';
  // public imageKontainerId = document.getElementById('#imageKontainerId');
  // public matDialogKontainer = '.mat-dialog-container'; // material modal
  // public matDialogKontainerClass = document.getElementsByClassName('mat-dialog-container'); // material modal
  // public cdkOverlayPane = document.getElementsByClassName('cdk-overlay-pane'); // material modal
  public fotoWidth: number; // any;
  public fotoHeight: number; // = 70;
  public karouselArrowsTop: number;
  // public marginsx = 100;
  public imgsToDisplay: number;
  public photosLength: number;
  /*---= Carousel buttons properties =---*/
  public leftArrowIcon = '.left-arrow';
  public rightArrowIcon = '.right-arrow';
  public arrowSize = '2.3';

  public matFabExtended = '.matFabExtended';

  public displayMultiProjects: boolean;

  public hideBackgroundLeft: boolean;
  public hideBackgroundRight: boolean;
  public changeBGColor: boolean;
  public changeCloseBGColor: boolean;

  public flexDirection: string;
  public columnNum: number;
  public descriptionColumnCount: number;
  public modalTitleSize = '1.3em';
  public modalTitleId = ('modalTitleId');
  public modalTitleKontainerId = ('modalTitleKontainerId');
  public titleBarKontainer = ('.title-bar-kontainer');
  public titleBarId = ('titleBarId');

  constructor( public dialogRef: MatDialogRef<PopUpComponent>,
               @Inject(MAT_DIALOG_DATA) public xData: any,
               private _funksions: FunksionsService,
               private _carousel: CarouselService,
               private _portfolioDataService: PortfolioDataService,
               public _elemRef: ElementRef
              ) {
  }

  ngOnInit() {
    console.clear();
    // console.log('this.imageToLoad.length: ', this.imageToLoad.length);

    // console.log('objPopUp: ', this.objPopUp.projectData);
    this._carousel.commonCounter = 0;
    this.onSingleMutiProjects();
    // this.fOnLandscapePortrait();
    this.fResizeMe();

    /*-----= Move the arrows half way to the size of the image container.
    Actual code is ran on ngAfterViewInit =-----*/
    this.karouselArrowsTop = 0; // ???

    // this.layout = 'two-columns';
    // console.log('this.variation: ', this.variation);
    // console.log('this.layout: ', this.layout);
    // this.columnNum = 1;

     /*--= Triggering fResizeMedia on enter =--*/
    //  setTimeout(() => {
    //   this._carousel.commonCounter = 0;
    //   this.onSingleMutiProjects();
    //   this.fOnLandscapePortrait();
    //   this.fResizeMe();
    //   // this.fResizeMedia();
    // }, 100);

    /*--===| fShowHideTopNav |===--*/
    // DOESN'T WORK WITH MODAL!
    // this.fShowHideTopNav('topNavBarKontainerId', '-20', '-100');
    // this.fShowHideTopNav('topNavBarKontainerId', '-20', '-100');
    // this._funksions.fShowHideTopNav(this.titleBarId, '-20', '100'); //////
    // this._funksions.fShowHideTopNav(this.titleBarKontainer, '-20', '-100');
    // this._funksions.fShowHideTopNav(this.modalTitleId, '-50', '-100');
    // this._funksions.fTMXscrollShowHide(this.modalTitleKontainerId, 20);
    // this._funksions.fTMXscrollShowHide(this.titleBarKontainer, 20);

  }

  ngAfterViewInit() {
    // console.log('|-----= ngAfterViewInit() =-----|');

    /*-----= TEST: Getting scroll to work inside Material Modal =-----*/
    // const content = document.querySelector('#titleBarId');
    // const scroll$ = fromEvent(content, 'scroll').pipe(map(() => content));

    // scroll$.subscribe(element => {
    //   // do whatever
    //   console.log('|-----= ngAfterViewInit() Modal =-----|');
    //   this._funksions.fShowHideTopNav(content, '-20', '100');
    // });
    /*-----= ************************************************ =-----*/

    //  /*-----= Get the imageKontainer top position =-----*/
    // this.imgKontainerTop = this.imageKontainerRef.nativeElement.getBoundingClientRect().top;
    // console.log('this.imgKontainerTop: ', this.imgKontainerTop);

    // /*-----= Move the arrows half way to the size of the image container =-----*/
    // this.karouselArrowsTop = this.imgKontainerTop + (this.fotoHeight / 2);
    // // console.log('this.imgKontainerTop: ', this.imgKontainerTop);
    // // console.log('this.fotoHeight: ', this.fotoHeight);
    // // console.log('this.fotoHeight / 2: ', this.fotoHeight / 2);
    // // console.log('this.karouselArrowsTop: ', this.karouselArrowsTop);
    // // console.log('window.innerHeight: ', window.innerHeight);
    // if (this.karouselArrowsTop > window.innerHeight) {
    //   this.karouselArrowsTop = window.innerHeight / 2;
    //   console.log('this.karouselArrowsTop: ', this.karouselArrowsTop);
    // }
    // this.fGetKontainerTop();

  }

  // public fGetKontainerTop() {
  //   console.log('fGetKontainerTop()');
  //   /*-----= Get the imageKontainer top position =-----*/
  //   this.imgKontainerTop = this.imageKontainerRef.nativeElement.getBoundingClientRect().top;
  //   // console.log('this.imgKontainerTop: ', this.imgKontainerTop);

  //   /*-----= Move the arrows half way to the size of the image container =-----*/
  //   this.karouselArrowsTop = this.imgKontainerTop + (this.fotoHeight / 2); // ?????
  //   // console.log('this.imgKontainerTop: ', this.imgKontainerTop);
  //   // console.log('this.fotoHeight: ', this.fotoHeight);
  //   // console.log('this.fotoHeight / 2: ', this.fotoHeight / 2);
  //   // console.log('this.karouselArrowsTop: ', this.karouselArrowsTop);
  //   // console.log('window.innerHeight: ', window.innerHeight);
  //   if (this.karouselArrowsTop > window.innerHeight || this.karouselArrowsTop < 0) {
  //     this.karouselArrowsTop = window.innerHeight / 2;
  //     // console.log('this.karouselArrowsTop: ', this.karouselArrowsTop);
  //   }
  // }

  ngOnChanges() {
    // this.ngAfterViewInit();
  }

  /*-----= Get the imageKontainer top position =-----*/
  // public fGetKontainerTopPosition() {
  //   this.imgKontainerTop = this.imageKontainerRef.nativeElement.getBoundingClientRect().top;
  //   console.log('this.imgKontainerTop: ', this.imgKontainerTop);
  // }

  ngAfterViewChecked() {
    /* this life cycle hook also resized pop up and its content */
    // console.log(''|-----= ngAfterViewChecked() =-----|');
    // this.ngAfterViewInit();
  }

  // public fDisplayBtn(e, d) {
  //   if (e === 'no-link') {
  //     d = 'none';
  //   } else {
  //     d = 'flex';
  //   }
  // }

  /*---==========================================================================---*//*
      onSingleMutiProjects() = determine whether it's a single project content
                              or multiple projects content.
      this.displayMultiProjects = triggers the *ngIf="displayMultiProjects in the html.
  *//*---==========================================================================---*/
  public onSingleMutiProjects() {
    if (this.variation === 'single-project') {
      /*----| Load single project |---*/
      this.displayMultiProjects = false;
      this.photosLength = this.imageToLoad.length; // number of images to load on single project
    } else {
      /*---| Load multiple projects |---*/
      for (let i = 0; i < this.xData.variedProjects2.length; i++) {
        this.buttonDisplay = this.xData.variedProjects2[i].varBtnDisplay;
        this.aVariedProj[this.aVariedProj.length] = this.xData.variedProjects2[i]; // push all variedProjects data
        this.varProjectTitle = this.aVariedProj[i].varProjectTitle;
        this.variedProjsImg[this.variedProjsImg.length] = this.xData.variedProjects2[i].image; // push all variedProjects.image data
        this.aVariedId[this.aVariedId.length] = '#' + this.xData.variedProjects2[i].varId; // push
        // this._funksions.fTMxToX(this.aVariedId[i], 10, 400, Power2); //
        // console.log('this.aVariedId[i]: ', this.aVariedId[i]);

        this.aVarLinkName[this.aVarLinkName.length] = this.xData.variedProjects2[i].varLinkName; // push
        this.aButtonDisplay[this.aButtonDisplay.length] = this.xData.variedProjects2[i].varBtnDisplay; // push
      }
      /*---|boolean trigger multi projects|---*/
      this.displayMultiProjects = true;
      this.photosLength = this.variedProjects.length; // number of images to load on multi projects
      // this._funksions.fElementVisibility(this.matFabExtended, 'hidden');
      this._funksions.fDisplay(this.matFabExtended, 'none');
    }
  }

  /*--===============================================================--*//*
  Calculate screen ratio: Control the layout for either one-column or
    two-columns display based on vertical or horizontal orientations.
    this.layout gets a string value that's use on fOnLandscapePortrait()
  *//*--===============================================================--*/
  public fScreenRatio() {
    /*--= Window: innerWidth & innerHeight =--*/
    const scrnWidth = this.screenWidth;
    const scrnHeight = this.screenHeight;
    // const scrnWidth = window.innerWidth;
    // const scrnHeight = window.innerHeight;
    // const scrnWidth = screen.width;
    // const scrnHeight = screen.height;

    console.log('this.modalKontainerWidth 4: ', this.modalKontainerWidth);

    const ratio = scrnWidth / scrnHeight;
    // console.log('ratio: ', ratio);
    console.log('scrnWidth: ', scrnWidth, ' || scrnHeight: ', scrnHeight);
    console.log('screen.width: ', screen.width, ' || screen.availWidth: ', screen.availWidth);
    // console.log('scrnHeight: ', scrnHeight);

    /*--= Vertical display =--*/
    if ( ratio <= .79) {
      this.layout = 'one-column';
      // console.log('vertical display');

    /*--= Squarish display display =--*/
    } else if (ratio > .8 && ratio <= 1.25) {
      this.layout = 'two-columns';
      // console.log('squarish display');

    /*--= Horizontal display =--*/
    } else {
      this.layout = 'two-columns';
      // console.log('horizontal display');
    }
  }

  /*---============================================================================---*/
  /* fOnLandscapePortrait() = determine whether it's on a one-column or two-columns mode. */
  /*---============================================================================---*/
  public fOnLandscapePortrait() {

    this.fScreenRatio();

    if (this.layout === 'one-column') {
        this.flexDirection = 'column';
        this.columnNum = 1;
        // this.descriptionColumnCount = 2;
        // this.carouselMaskWidth = 872; // Math.round(this.modalKontainerWidth / this.columnNum - 50);
        // this.carouselMaskWidth = Math.round((922 / this.columnNum) - 50);
        this.carouselMaskWidth = Math.round((this.modalKontainerWidth / this.columnNum) - 50);
        console.log('this.modalKontainerWidth 3: ', this.modalKontainerWidth);
        console.log('this.carouselMaskWidth: ', this.carouselMaskWidth);
        // console.log('this.columnNum: ', this.columnNum);
    } else {
      // two-columns
        this.flexDirection = 'row';
        this.columnNum = 2;
        // this.descriptionColumnCount = 1;
        this.carouselMaskWidth = Math.round(this.modalKontainerWidth / this.columnNum - 25);
        console.log('this.carouselMaskWidth: ', this.carouselMaskWidth);
    }
  }

  /*---==========================================================================---*//*
    fCarouselInit(): Initialize Carousel variables and load
      this.fOnLandscapePortrait() = Landscape or Portrait mode. For layout design
                                    purposes only. Set statically.
      this._carousel.fSlideCarousel(...) = Carousel Service
  *//*---==========================================================================---*/
  public fCarouselInit() {
    // /*-----= Modal Width =-----*/
    // this.modalKontainerWidth = Math.round(this.screenWidth * 0.9);
    // /*-----= Modal Height =-----*/
    // this.modalKontainerHeight = Math.round(this.screenHeight * 0.9);
    /*-----= Carousel Mask Width: Based on the modal width with 50px padding =-----*/
    // this.modalKontainerInteriorWidth = Math.round(this.modalKontainerWidth - 50);
    console.log('this.modalKontainerWidth 2: ', this.modalKontainerWidth);


    /*-----=| one-column or two-columns mode |=-----*/
    this.fOnLandscapePortrait();
    // this.fResizeMe();

    /*-----= Foto Width =-----*/
    this.fotoWidth = Math.round(this.carouselMaskWidth / this.imgsToDisplay);
    console.log('this.fotoWidth ----------: ', this.fotoWidth);
    /*-----= Foto Height: squared =-----*/
    this.fotoHeight = this.fotoWidth;
    // console.log('this.fotoHeight: ', this.fotoHeight);

    // const tst = this.imageKontainerId.getBoundingClientRect();
    // console.log('tst.top: ', tst.top);


    // /*-----= Carousel Strip Width =-----*/
    // this.carouselFotoStripWidth = this.fotoWidth * this.photosLength;
    // console.log('this.carouselFotoStripWidth: ', this.carouselFotoStripWidth);

    // /*--- Resetting photo strip x position ---*/
    // this.photoStripSetCount = Math.round(this.carouselFotoStripWidth / this.modalKontainerWidth);
    // console.log('this.photoStripSetCount: ', this.photoStripSetCount);

    // this.commonCounterLastIndex = this.photoStripSetCount - 1;

    /* when resizing window, images shouldn't be cut off
       use commonCounter to dictate the last xposition to be used as a pin point */
    this._carousel.fCarousel(
      this.leftArrowIcon,
      this.rightArrowIcon,
      this.imageKontainer,
      'none',
      this.fotoWidth,
      this.imgsToDisplay,
      this.imageToLoad.length
    );
    // this._carousel.fSlideCarousel(
    //   this.leftArrowIcon,
    //   this.rightArrowIcon,
    //   this.imageKontainer, // elem
    //   'none', // slideDirection
    //   this.fotoWidth, // imgWidth
    //   this.imgsToDisplay, // imgsToDisplay
    //   this.carouselFotoStripWidth,
    //   this.imageToLoad.length
    // );
  }

  /*---| Button to open external links |---*/
  public fOpenXLinks(link) {
    window.open(link, 'xWindow', '', true);
    // console.log('link: ', link);
  }

  /*---| Button to open external links from Multi Projects |---*/
  public fOpenVariedLinks(link) {
    window.open(link, 'xWindow');
  }

  public fClose(): void {
    this.dialogRef.close();
  }

  public fSlideLeft() {
    this._carousel.fCarousel(
      this.leftArrowIcon,
      this.rightArrowIcon,
      this.imageKontainer,
      'left',
      this.fotoWidth,
      this.imgsToDisplay,
      this.photosLength);
  }
  public fSlideRight() {
    this._carousel.fCarousel(
      this.leftArrowIcon,
      this.rightArrowIcon,
      this.imageKontainer,
      'right',
      this.fotoWidth,
      this.imgsToDisplay,
      this.photosLength);
  }
  /*-- method call from view when pressing the right button --*/
  // fSlideLeftX() {
  //   /*---|Call the _carousel service|---*/
  //   this._carousel.fSlideCarousel(
  //     this.leftArrowIcon,
  //     this.rightArrowIcon,
  //     this.imageKontainer,
  //     'left',
  //     this.fotoWidth,
  //     this.imgsToDisplay,
  //     this.carouselFotoStripWidth,
  //     this.imageToLoad.length
  //   );
  // }

  /*-- method call from view when pressing the left button --*/
  // fSlideRightX() {
  //   this._carousel.fSlideCarousel(
  //     this.leftArrowIcon,
  //     this.rightArrowIcon,
  //     this.imageKontainer,
  //     'right',
  //     this.fotoWidth,
  //     this.imgsToDisplay,
  //     this.carouselFotoStripWidth,
  //     this.imageToLoad.length
  //   );
  // }

  /**********---== RESPONSIVENESS ==---**********/

  /*---- Viewport Resize Listener ----*/
  @HostListener('window:resize', ['$event'])
  // @HostListener(this._windowRef._window(), ['$event'])
  onResize(event) {
    this.fResizeMe();
    // console.log('Screen resized!');
    // this.ngAfterViewInit();
  }

  /*---- Keydown Listener ----*/
  @HostListener('document:keydown', ['$event'])
  private handleKeydown(event: KeyboardEvent) {
    if (event.keyCode === this.ESCAPE) {
      this.dialogRef.close();

    } else if (event.keyCode === this.RIGHT_ARROW) {
      this.fSlideLeft();

    } else if (event.keyCode === this.LEFT_ARROW) {
      this.fSlideRight();
    }


  }

  /*---- Window Scroll Listener ----*/
  /* angular material blocks the scroll event. do it in ngAfterViewInit */
  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    // console.log('Modal scrolled!');
    // this._funksions.fTMXscrollShowHide(this.modalTitleKontainerId, 20);
  }
  // public fTestScroll(){
  //   const test = document.querySelector('.test-kontainer');
  //   console.log('Modal clicked scrolled!');
  //   this._funksions.fTMXscrollShowHide(this.modalTitleKontainerId, 50);
  //   // this._funksions.fTMXscrollShowHide(test, 50);
  // }

  /*=--========================================--=
		   fResizeMe: Viewport resize media queries
	=----========================================--=*/
  public fResizeMe() {
    // this.screenWidth = window.innerWidth;
    // this.screenHeight = window.innerHeight;
    // console.log('this.screenWidth: ', this.screenWidth);
    // console.log('this.screenHeight: ', this.screenHeight);

    // /*--= Window: innerWidth & innerHeight =--*/
    // const scrnWidth = window.innerWidth;
    // const scrnHeight = window.innerHeight;

    // /*--===============================================================--*//*
    // Calculate screen ratio: Control the layout for either one-column or
    //   two-columns display based on vertical or horizontal orientations.
    //   this.layout gets a string value that's use on fOnLandscapePortrait()
    // *//*--===============================================================--*/
    // const ratio = scrnWidth / scrnHeight;
    // // console.log('ratio: ', ratio);
    // console.log('scrnWidth: ', scrnWidth, ' || scrnHeight: ', scrnHeight);
    // // console.log('scrnHeight: ', scrnHeight);

    // /*--= Vertical display =--*/
    // if ( ratio <= .79) {
    //   this.layout = 'one-column';
    //   // console.log('vertical display');

    // /*--= Squarish display display =--*/
    // } else if (ratio > .8 && ratio <= 1.25) {
    //   this.layout = 'two-columns';
    //   // console.log('squarish display');

    // /*--= Horizontal display =--*/
    // } else {
    //   this.layout = 'two-columns';
    //   // console.log('horizontal display');
    // }


    this.screenWidth = window.innerWidth; // scrnWidth;
    this.screenHeight = window.innerHeight; // scrnHeight;
    // this.screenWidth = screen.width; // scrnWidth;
    // this.screenHeight = screen.height; // scrnHeight;
    console.log('this.screenWidth 1: ', this.screenWidth);

    /*-----= Modal Width =-----*/
    this.modalKontainerWidth = Math.round(this.screenWidth * 0.9);
    console.log('this.modalKontainerWidth 1: ', this.modalKontainerWidth, parseInt('90vh', 0), '----------------');
    /*-----= Modal Height =-----*/
    this.modalKontainerHeight = Math.round(this.screenHeight * 0.9);



    /*-----= Get the imageKontainer top position =-----*/
    // this.imgKontainerTop = this.imageKontainerRef.nativeElement.getBoundingClientRect().top;
    // console.log('this.imgKontainerTop: ', this.imgKontainerTop);

    /*--- Reset last commonCounter index ---*/
    // if (this._carousel.endOfStrip) { // ???????
    //   this._carousel.commonCounter = -this.commonCounterLastIndex; // counter last index is the last count during the current screen size and imgsToDisplay count
    // }

    // /*-----= Move the arrows half way to the size of the image container =-----*/
    // this.karouselArrowsTop = this.imgKontainerTop + (this.fotoHeight / 2);
    // // console.log('this.imgKontainerTop: ', this.imgKontainerTop);
    // // console.log('this.fotoHeight: ', this.fotoHeight);
    // // console.log('this.fotoHeight / 2: ', this.fotoHeight / 2);
    // console.log('this.karouselArrowsTop: ', this.karouselArrowsTop);
    // console.log('window.innerHeight: ', window.innerHeight);
    // if (this.karouselArrowsTop > window.innerHeight) {
    //   this.karouselArrowsTop = window.innerHeight / 2;
    //   console.log('this.karouselArrowsTop: ', this.karouselArrowsTop);
    // }

    /*---==========================================================================---*/
    /*--==| Media queries: For the modal component |==-------------------------------=
            this.imgsToDisplay = Number of images to display on the image container.
                                 For layout design purposes only. Set statically.
            this.layout = This layout is not for the device but rather
                               on the column display.
                               two-columns: modal is divided into two columns.
                               one-column: is a one column modal display.
            this.descriptionColumnCount = For layout only!
                               When the description text area get too wide
                               its better to divide it into two columns.
    /=---=========================================================================---=*/

    /*---======================| Match Media |======================================---/
      min-width: 1366px = largest screen
    /=---=========================================================================---=*/
    if (window.matchMedia('(min-width: 1366px)').matches) {
      this.imgsToDisplay = 1;
      this.fCarouselInit();
      this.modalTitleSize = '1.3em';
      this.descriptionColumnCount = 2;

    /*---======================| Match Media |======================================---/
      1000px to 1365px = iPad screens or others
    /=---=========================================================================---=*/
    } else if (window.matchMedia('(min-width: 1000px) and (max-width: 1365px)').matches) {
        this.imgsToDisplay = 1;
        this.fCarouselInit();
        this.modalTitleSize = '1.3em';
        this.descriptionColumnCount = 1;

    /*---======================| Match Media |======================================---/
      800px to 999px = iPhoneX screens or others
    /=---=========================================================================---=*/
    } else if (window.matchMedia('(min-width: 800px) and (max-width: 999px)').matches) {
        this.imgsToDisplay = 1;
        this.fCarouselInit();
        this.modalTitleSize = '1.3em';
        this.descriptionColumnCount = 1;
        this.fotoHeight = this.fotoWidth;

    /*---======================| Match Media |======================================---/
      up to 799px = iPhoneX screens or others
    /=---=========================================================================---=*/
    } else if (window.matchMedia('(max-width: 799px)').matches) {
      this.imgsToDisplay = 1;
      this.fCarouselInit();
      this.modalTitleSize = '.8em';
      this.descriptionColumnCount = 1;
      this.fotoHeight = this.fotoWidth;
    }

    /*--= Max height: 375px =--*/
    if (window.matchMedia('(max-height: 375px)').matches) {
      this.imgsToDisplay = 1;
      this.fCarouselInit();
      this.modalTitleSize = '1em';
      this.descriptionColumnCount = 1;
      this.fotoHeight = 350;
      console.log('max-height: 375px');
    }
  }
}
