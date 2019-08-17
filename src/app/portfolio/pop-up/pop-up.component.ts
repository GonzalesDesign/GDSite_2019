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
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit, AfterViewInit, AfterViewChecked, OnChanges {
  // @ViewChild('childViewTest') childViewTest;
  @ViewChild('imgKontainrRef') imageKontainerRef: ElementRef;




  // root.addEventListener("mousemove", e => {
  //   root.style.setProperty('--mouse-x', e.clientX + "px");
  //   root.style.setProperty('--mouse-y', e.clientY + "px");
  // });

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
  public responsibilidad = this.xData.responsibilities;
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

  // test
  // public divBgColor: any;

  constructor( public dialogRef: MatDialogRef<PopUpComponent>,
               @Inject(MAT_DIALOG_DATA) public xData: any,
               private _funksions: FunksionsService,
               private _carousel: CarouselService,
               private _portfolioDataService: PortfolioDataService,
               public _elemRef: ElementRef,
               public breakpointObserver: BreakpointObserver
              ) {
  }

  ngOnInit() {
    // test
    // const primaryColor = document.documentElement;
    // this.divBgColor = primaryColor.style.setProperty('--rlg-color-primary', 'orange');

    console.clear();
    this._carousel.counter = 0;
    this.onSingleMutiProjects();
    // this.fOnLandscapePortrait();
    // this.fResizeMe();

    /*-----= Move the arrows half way to the size of the image container.
    Actual code is ran on ngAfterViewInit =-----*/
    this.karouselArrowsTop = 0; // ???


    // this.breakpointObserver
    //   .observe(['(min-width: 1366px)'])
    //   .subscribe((state: BreakpointState) => {
    //     if (state.matches) {
    //       this.mediaParams(1, 'two-columns', this.fotoWidth, '1.8em', 2);
    //     } else {
    //       console.log('Viewport is getting smaller!');
    //     }
    //   });

      /*---=|••• Breakpoint Observer •••|=---*/
      this.breakpointObserver.observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Handset,
        Breakpoints.HandsetPortrait,
        Breakpoints.HandsetLandscape,
        Breakpoints.Tablet,
        Breakpoints.TabletPortrait,
        Breakpoints.TabletLandscape,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge
      ]).subscribe(result => {
        if (result.breakpoints[Breakpoints.XSmall]) {
         console.log('XSmall');
         this.mediaParams(1, 'one-column', 350, '.9em', 1);
        //  console.log('Breakpoints.XSmall: ', Breakpoints.XSmall);
        //  console.log('Breakpoints.Small: ', Breakpoints.Small);
        //  console.log('Breakpoints.Handset: ', Breakpoints.Handset);
        //  console.log('Breakpoints.HandsetPortrait: ', Breakpoints.HandsetPortrait);
        //  console.log('Breakpoints.HandsetLandscape: ', Breakpoints.HandsetLandscape);
        //  console.log('Breakpoints.Tablet: ', Breakpoints.Tablet);
        //  console.log('Breakpoints.TabletPortrait: ', Breakpoints.TabletPortrait);
        //  console.log('Breakpoints.TabletLandscape: ', Breakpoints.TabletLandscape);
        //  console.log('Breakpoints.Medium: ', Breakpoints.Medium);
        //  console.log('Breakpoints.Large: ', Breakpoints.Large);
        //  console.log('Breakpoints.XLarge: ', Breakpoints.XLarge);
        }
        if (result.breakpoints[Breakpoints.Small]) {
         console.log('Small');
        //  this.mediaParams(1, 'two-columns', 350, '.9em', 1);
        }
        if (result.breakpoints[Breakpoints.HandsetPortrait]) {
        console.log('HandsetPortrait');
        this.mediaParams(1, 'one-column', this.fotoWidth, '1.3em', 1);
        }
        if (result.breakpoints[Breakpoints.HandsetLandscape]) {
        console.log('HandsetLandscape');
        this.mediaParams(1, 'two-columns', this.fotoWidth, '1.3em', 1);
        }
        if (result.breakpoints[Breakpoints.TabletPortrait]) {
        console.log('TabletPortrait: iPad Portrait');
        this.mediaParams(1, 'one-column', this.fotoWidth, '1.5em', 1);
        }
        if (result.breakpoints[Breakpoints.TabletLandscape]) {
        console.log('TabletLandscape: iPad Landscape');
        this.mediaParams(1, 'two-columns', this.fotoWidth, '1.8em', 1);
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          console.log('Medium: iPadPro Portrait');
          this.mediaParams(1, 'two-columns', this.fotoWidth, '1.8em', 1);
        }
        if (result.breakpoints[Breakpoints.Large]) {
          console.log('Large: iPadPro Landscape');
          this.mediaParams(1, 'two-columns', this.fotoWidth, '2em', 2);
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          console.log('XLarge');
          this.mediaParams(1, 'two-columns', this.fotoWidth, '2em', 2);
        }
      });


  }

  ngAfterViewInit() {
  }


  ngOnChanges() {
  }

  ngAfterViewChecked() {
  }


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

    // this.fScreenRatio();

    if (this.layout === 'one-column') {
        this.flexDirection = 'column';
        this.columnNum = 1;
        // this.descriptionColumnCount = 2;
        // this.carouselMaskWidth = 872; // Math.round(this.modalKontainerWidth / this.columnNum - 50);
        // this.carouselMaskWidth = Math.round((922 / this.columnNum) - 50);
        this.carouselMaskWidth = Math.round(((this.screenWidth * 0.9) / this.columnNum) - 50);
        // this.carouselMaskWidth = Math.round((this.modalKontainerWidth / this.columnNum) - 50);
        // console.log('this.modalKontainerWidth 3: ', this.modalKontainerWidth);
        // console.log('this.carouselMaskWidth: ', this.carouselMaskWidth);
        // console.log('this.columnNum: ', this.columnNum);
    } else if (this.layout === 'two-columns') {
        this.flexDirection = 'row';
        this.columnNum = 2;
        // this.descriptionColumnCount = 1;
        this.carouselMaskWidth = Math.round((this.screenWidth * 0.9) / this.columnNum - 25);
        // this.carouselMaskWidth = Math.round(this.modalKontainerWidth / this.columnNum - 25);
        // console.log('this.carouselMaskWidth: ', this.carouselMaskWidth);
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
    // console.log('this.modalKontainerWidth 2: ', this.modalKontainerWidth);


    /*-----=| one-column or two-columns mode |=-----*/
    this.fOnLandscapePortrait();
    // this.fResizeMe();

    /*-----= Foto Width =-----*/
    // this.fotoWidth = Math.round(((this.screenWidth * 0.9) - 40) / this.imgsToDisplay);
    this.fotoWidth = Math.round(this.carouselMaskWidth / this.imgsToDisplay);
    // console.log('this.fotoWidth ----------: ', this.fotoWidth, 'this.imgsToDisplay: ', this.imgsToDisplay);

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
       use counter to dictate the last xposition to be used as a pin point */
    this._carousel.fCarousel(
      this.leftArrowIcon,
      this.rightArrowIcon,
      this.imageKontainer,
      'none',
      this.fotoWidth,
      this.imgsToDisplay,
      this.imageToLoad.length
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


  /**********---== RESPONSIVENESS ==---**********/

  /*---- Viewport Resize Listener ----*/
  // @HostListener('window:resize', ['$event'])
  // // @HostListener(this._windowRef._window(), ['$event'])
  // onResize(event) {
  //   // this.fResizeMe();
  //   // console.log('Screen resized!');
  //   // this.ngAfterViewInit();
  // }

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
  // @HostListener('window:scroll', ['$event'])
  // onScroll(event) {
  //   // console.log('Modal scrolled!');
  //   // this._funksions.fTMXscrollShowHide(this.modalTitleKontainerId, 20);
  // }

  private mediaParams(imgsToDisplay, layout, fotoHeight, modalTitleFontSize, descriptionColumnCount) {
    this.screenWidth = window.innerWidth; // scrnWidth;
    this.screenHeight = window.innerHeight; // scrnHeight;
    // this.screenWidth = screen.width; // scrnWidth;
    // this.screenHeight = screen.height; // scrnHeight;
    console.log('this.screenWidth 1: ', this.screenWidth);
    this.imgsToDisplay = imgsToDisplay;
    this.layout = layout;
    this.fotoHeight = fotoHeight;
    this.modalTitleSize = modalTitleFontSize;
    this.descriptionColumnCount = descriptionColumnCount;
    this.fCarouselInit();
  }
}
