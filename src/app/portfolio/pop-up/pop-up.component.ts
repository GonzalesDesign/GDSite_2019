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
  public orientation = this.xData.orientation;
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
  public carouselFotoStripWidth: number; // any;
  // public totalImgsWidth: number;
  public photoStripSetCount: number; // foto strip width / imgs to display = set
  public commonCounterLastIndex: number;

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
    // console.log('objPopUp: ', this.objPopUp.projectData);
    this._carousel.commonCounter = 0;
    this.onSingleMutiProjects();
    // this.fOnLandscapePortrait();
    this.fResizeMe();

    /*-----= Move the arrows half way to the size of the image container.
    Actual code is ran on ngAfterViewInit =-----*/
    this.karouselArrowsTop = 0;

    // this.orientation = 'portrait';
    // console.log('this.variation: ', this.variation);
    // console.log('this.orientation: ', this.orientation);
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
    this.fGetKontainerTop();

  }

  public fGetKontainerTop() {
    /*-----= Get the imageKontainer top position =-----*/
    this.imgKontainerTop = this.imageKontainerRef.nativeElement.getBoundingClientRect().top;
    console.log('this.imgKontainerTop: ', this.imgKontainerTop);

    /*-----= Move the arrows half way to the size of the image container =-----*/
    this.karouselArrowsTop = this.imgKontainerTop + (this.fotoHeight / 2);
    // console.log('this.imgKontainerTop: ', this.imgKontainerTop);
    // console.log('this.fotoHeight: ', this.fotoHeight);
    // console.log('this.fotoHeight / 2: ', this.fotoHeight / 2);
    // console.log('this.karouselArrowsTop: ', this.karouselArrowsTop);
    // console.log('window.innerHeight: ', window.innerHeight);
    if (this.karouselArrowsTop > window.innerHeight || this.karouselArrowsTop < 0) {
      this.karouselArrowsTop = window.innerHeight / 2;
      console.log('this.karouselArrowsTop: ', this.karouselArrowsTop);
    }
  }

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

  /*---============================================================================---*/
  /* fOnLandscapePortrait() = determine whether it's on a landscape or portrait mode. */
  /*---============================================================================---*/
  public fOnLandscapePortrait() {
    // console.log('this.variation2: ', this.variation);
    // console.log('this.orientation2: ', this.orientation);
    if (this.orientation === 'landscape') {
        this.flexDirection = 'column';
        this.columnNum = 1;
        this.descriptionColumnCount = 2;
        this.carouselMaskWidth = Math.round(this.modalKontainerWidth / this.columnNum - 50);
    } else {
      // portrait
        this.flexDirection = 'row';
        this.columnNum = 2;
        this.descriptionColumnCount = 1;
        this.carouselMaskWidth = Math.round(this.modalKontainerWidth / this.columnNum - 25);
    }
    // console.log('this.carouselMaskWidth: ', this.carouselMaskWidth);
  }



  /*---==========================================================================---*/
    /*--==| fCarouselInit(): Initialize Carousel variables and load
            this.fOnLandscapePortrait() = Landscape or Portrait mode.
                                 For layout design purposes only. Set statically.
            this._carousel.fSlideCarousel(...) = Carousel Service |==--*/
    /*---==========================================================================---*/
  public fCarouselInit() {
    /*-----= Modal Width =-----*/
    this.modalKontainerWidth = Math.round(this.screenWidth * 0.9);
    /*-----= Modal Height =-----*/
    this.modalKontainerHeight = Math.round(this.screenHeight * 0.9);
    /*-----= Carousel Mask Width: Based on the modal width with 50px padding =-----*/
    // this.modalKontainerInteriorWidth = Math.round(this.modalKontainerWidth - 50);

    /*-----=| landscape or portrait mode |=-----*/
    this.fOnLandscapePortrait();

    /*-----= Foto Width =-----*/
    this.fotoWidth = Math.round(this.carouselMaskWidth / this.imgsToDisplay);
    // console.log('this.fotoWidth: ', this.fotoWidth);
    /*-----= Foto Height =-----*/
    this.fotoHeight = this.fotoWidth;
    // console.log('this.fotoHeight: ', this.fotoHeight);

    // const tst = this.imageKontainerId.getBoundingClientRect();
    // console.log('tst.top: ', tst.top);


    /*-----= Carousel Strip Width =-----*/
    this.carouselFotoStripWidth = this.fotoWidth * this.photosLength;
    /*--- Resetting photo strip x position ---*/
    this.photoStripSetCount = Math.round(this.carouselFotoStripWidth / this.modalKontainerWidth);
    this.commonCounterLastIndex = this.photoStripSetCount - 1;

    /* when resizing window, images shouldn't be cut off
       use commonCounter to dictate the last xposition to be used as a pin point */
    this._carousel.fSlideCarousel(
      this.leftArrowIcon,
      this.rightArrowIcon,
      this.imageKontainer, // elem
      'none', // slideDirection
      this.fotoWidth, // imgWidth
      this.imgsToDisplay, // imgsToDisplay
      this.carouselFotoStripWidth // imgKontainerWidth
    );
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

  /*-- method call from view when pressing the right button --*/
  fSlideLeft() {
    /*---|Call the _carousel service|---*/
    this._carousel.fSlideCarousel(
      this.leftArrowIcon,
      this.rightArrowIcon,
      this.imageKontainer,
      'left',
      this.fotoWidth,
      this.imgsToDisplay,
      this.carouselFotoStripWidth
    );
  }

  /*-- method call from view when pressing the left button --*/
  fSlideRight() {
    this._carousel.fSlideCarousel(
      this.leftArrowIcon,
      this.rightArrowIcon,
      this.imageKontainer,
      'right',
      this.fotoWidth,
      this.imgsToDisplay,
      this.carouselFotoStripWidth
    );
  }

  /**********---== RESPONSIVENESS ==---**********/

  /*---- Viewport Resize Listener ----*/
  @HostListener('window:resize', ['$event'])
  // @HostListener(this._windowRef._window(), ['$event'])
  onResize(event) {
    this.fResizeMe();
    // console.log('Screen resized!');
    this.ngAfterViewInit();
  }

  /*---- Keydown Listener ----*/
  @HostListener('document:keydown', ['$event'])
  private handleKeydown(event: KeyboardEvent) {
    if (event.keyCode === this.ESCAPE) {
      this.dialogRef.close();
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


    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;

    /*-----= Get the imageKontainer top position =-----*/
    // this.imgKontainerTop = this.imageKontainerRef.nativeElement.getBoundingClientRect().top;
    console.log('this.imgKontainerTop: ', this.imgKontainerTop);

    /*--- Reset last commonCounter index ---*/
    if (this._carousel.endOfStrip) {
      this._carousel.commonCounter = -this.commonCounterLastIndex; // counter last index is the last count during the current screen size and imgsToDisplay count
    }

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
            this.orientation = This orientation is not for the device but rather
                               on the column display.
                               portrait: modal is divided into two columns.
                               landscape: is a one column display.
            this.descriptionColumnCount = For layout only!
                               When the description text area get too wide
                               its better to divide it into two columns.
    /=---=========================================================================---=*/
    if (this.screenWidth > 1300) {
      console.log('> 1300');

    // if (window.matchMedia('(min-width: 1366px)').matches) {
      if (this.orientation === 'portrait') {
        this.imgsToDisplay = 1;
      } else {
        this.imgsToDisplay = 1;
      }
      this.orientation = 'portrait';
      this.fOnLandscapePortrait();
      this.fCarouselInit();
      this.modalTitleSize = '1.3em';
      this.descriptionColumnCount = 2;

    } else if (this.screenWidth < 1299 && this.screenWidth >= 921) {
      console.log('< 1299 >= 921');
    // } else if (window.matchMedia('(min-width: 1024px) and (max-width: 1365px)').matches) {
      if (this.orientation === 'portrait') {
        this.imgsToDisplay = 1;
      } else {
        this.imgsToDisplay = 1;
      }

      this.orientation = 'portrait';
      this.fOnLandscapePortrait();
      this.fCarouselInit();
      this.modalTitleSize = '1.3em';
      this.descriptionColumnCount = 1;

    } else if (this.screenWidth < 920  && this.screenWidth >= 640) {
      console.log('< 920 >= 640');
    // } else if (window.matchMedia('(min-width: 800px) and (max-width: 1023px)').matches) {
      if (this.orientation === 'portrait') {
        this.imgsToDisplay = 1;
      } else {
        this.imgsToDisplay = 1;
      }
      this.orientation = 'landscape';
      this.fOnLandscapePortrait();
      this.fCarouselInit();
      this.modalTitleSize = '1em';
      // this.imgsToDisplay = 1;
      this.descriptionColumnCount = 2;

    // } else if (window.matchMedia('(max-width: 799px)').matches) {
    } else {
      console.log('else');
      if (this.orientation === 'portrait') {
        this.imgsToDisplay = 1;
      } else {
        this.imgsToDisplay = 1;
      }
      this.orientation = 'landscape';
      this.fOnLandscapePortrait();
      this.fCarouselInit();
      this.modalTitleSize = '.8em';
      this.imgsToDisplay = 1;
      this.descriptionColumnCount = 1;
    }
  }
}
