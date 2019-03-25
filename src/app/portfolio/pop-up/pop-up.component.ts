/***********************************************************
 * Project: R.Lloyd Gonzales Portfolio Website
 * URL: RLGonzales.com
 * Contact: rolandolloyd@gmail.com
 * Copyright © 2019 GonzalesDesign
 * Platform: Angular 6
 * Component Name: Pop-Up
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
  Input
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FunksionsService } from './../../../services/funksions.service';
import { CarouselService } from './../../../services/carousel.service';
// import { MasonModalCarouselDataService } from './../../../services/mason-modal-carousel-data.service';
import { PortfolioDataService } from './../../../services/portfolio-data.service';
import { Elastic, Power2 } from 'gsap';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit, AfterViewInit, AfterViewChecked {
  // @ViewChild('childViewTest') childViewTest;

  // @Input() childMessage: string;

  public bShow = false;

  // Keycode for ESCAPE
  private ESCAPE = 27;

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
  public buttonDisplay; // = this.xData.variedProjects2[1].varBtnDisplay;
  public aButtonDisplay = [];
  // public aDisplayFlexNone = ['flex', 'flex', 'none', 'none', 'flex', 'none', 'none', 'flex', 'flex'];
  // public aDisplaySHowBtn = ['true', 'true', 'false', 'false', 'true', 'false', 'false', 'true', 'true'];

  public varProjectTitle; // = this.xData.variedProjects2[0].varProjectTitle;
  public linx = this.xData.linx[0];
  // public linx = this.xData.linx[0];
  public linx1 = this.xData.linx[1];
  // public linx2 = this.xData.linx[1];

  // public title = '.title';

  /*---= Modal properties =---*/
  public screenWidth: number; // = window.innerWidth;
  public screenHeight: number; // = window.innerHeight;
  // public modalKontainerId = '#modal-kontainer-id'; //
  // public modalKontainerId = document.getElementById('modalKontainerId');
  public modalKontainerWidth: number; // any;
  public modalKontainerHeight: number; // any;
  // public modalMaxWidth: any; //  = this._portfolioDataService.modalMaxWidth; // width info from service
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
  // public matDialogKontainer = '.mat-dialog-container'; // material modal
  // public matDialogKontainerClass = document.getElementsByClassName('mat-dialog-container'); // material modal
  // public cdkOverlayPane = document.getElementsByClassName('cdk-overlay-pane'); // material modal
  public fotoWidth: number; // any;
  public fotoHeight = 70;
  // public marginsx = 100;
  public imgsToDisplay: number;
  public photosLength: number;
  /*---= Carousel buttons properties =---*/
  public leftArrowIcon = '.left-arrow';
  public rightArrowIcon = '.right-arrow';

  public matFabExtended = '.matFabExtended';

  public displayElement: boolean;

  public hideBackgroundLeft: boolean;
  public hideBackgroundRight: boolean;
  public changeBGColor: boolean;
  public changeCloseBGColor: boolean;

  public flexDirection: string;
  public columnNum: number;
  public descriptionColumnCount: number;
  public popUpTitleSize = '1.3em';

  constructor( public dialogRef: MatDialogRef<PopUpComponent>,
               @Inject(MAT_DIALOG_DATA) public xData: any,
               private _funksions: FunksionsService,
               private _carousel: CarouselService,
               private _portfolioDataService: PortfolioDataService
              ) {
  }

  ngOnInit() {
    this._carousel.commonCounter = 0;
    this.onSingleMutiProjects();
    this.fOnLandscapePortrait();
    this.fResizeMe();
     /*--= Triggering fResizeMedia on enter =--*/
    //  setTimeout(() => {
    //   this._carousel.commonCounter = 0;
    //   this.onSingleMutiProjects();
    //   this.fOnLandscapePortrait();
    //   this.fResizeMe();
    //   // this.fResizeMedia();
    // }, 100);

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
      or multiple projcts content.
      this.displayElement = triggers the *ngIf="displayElement in the html.
  *//*---==========================================================================---*/
  public onSingleMutiProjects() {
    if (this.variation === 'single-project') {
      /*----| Load single project |---*/
      this.displayElement = false;
      this.photosLength = this.imageToLoad.length; // number of images to load on single project
    } else {
      /*---| Load multiple projects |---*/
      for (let i = 0; i < this.xData.variedProjects2.length; i++) {
        this.buttonDisplay = this.xData.variedProjects2[i].varBtnDisplay;
        this.aVariedProj[this.aVariedProj.length] = this.xData.variedProjects2[i]; // push all variedProjects data
        this.varProjectTitle = this.aVariedProj[i].varProjectTitle;
        this.variedProjsImg[this.variedProjsImg.length] = this.xData.variedProjects2[i].image; // push all variedProjects.image data
        this.aVariedId[this.aVariedId.length] = '#' + this.xData.variedProjects2[i].varId; // push
        this._funksions.fTMxToX(this.aVariedId[i], 10, 400, Power2);
        this.aVarLinkName[this.aVarLinkName.length] = this.xData.variedProjects2[i].varLinkName; // push
        this.aButtonDisplay[this.aButtonDisplay.length] = this.xData.variedProjects2[i].varBtnDisplay; // push
      }
      /*---|boolean trigger multi projects|---*/
      this.displayElement = true;
      this.photosLength = this.variedProjects.length; // number of images to load on multi projects
      // this._funksions.fElementVisibility(this.matFabExtended, 'hidden');
      this._funksions.fDisplay(this.matFabExtended, 'none');
    }
  }

  /*---============================================================================---*/
  /* fOnLandscapePortrait() = determine whether it's on a landscape or portrait mode. */
  /*---============================================================================---*/
  public fOnLandscapePortrait() {
    if (this.orientation === 'landscape') {
        this.flexDirection = 'column';
        this.columnNum = 1;
        this.descriptionColumnCount = 2;
        this.carouselMaskWidth = Math.round(this.modalKontainerWidth / this.columnNum - 50);
    } else {
      // portrait
        this.flexDirection = '';
        this.columnNum = 2;
        this.descriptionColumnCount = 1;
        this.carouselMaskWidth = Math.round(this.modalKontainerWidth / this.columnNum - 25);
    }
    // console.log('this.carouselMaskWidth: ', this.carouselMaskWidth);
  }

  ngAfterViewInit() {
    // console.log('|-----= ngAfterViewInit() =-----|');
  }

  ngAfterViewChecked() {
    /* this life cycle hook also resized pop up and its content */
    // console.log(''|-----= ngAfterViewChecked() =-----|');
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

  /*---- Viewport Resize ----*/
  @HostListener('window:resize', ['$event'])
  // @HostListener(this._windowRef._window(), ['$event'])
  onResize(event) {
    this.fResizeMe();
  }

  // Listen on keydown events on a document level
  @HostListener('document:keydown', ['$event'])
  private handleKeydown(event: KeyboardEvent) {
    if (event.keyCode === this.ESCAPE) {
      this.dialogRef.close();
    }
  }

  /*=--========================================--=
		   fResizeMe: Viewport resize media queries
	=----========================================--=*/
  public fResizeMe() {

    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;

    /*--- Reset last commonCounter index ---*/
    if (this._carousel.endOfStrip) {
      this._carousel.commonCounter = -this.commonCounterLastIndex; // counter last index is the last count during the current screen size and imgsToDisplay count
    }

    /*---==========================================================================---*/
    /*--==| Media queries: For the pop-up component |==-------------------------------=
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
    // if (window.matchMedia('(min-width: 1366px)').matches) {
      if (this.orientation === 'portrait') {
        this.imgsToDisplay = 1;
      } else {
        this.imgsToDisplay = 1;
      }
      this.fCarouselInit();
      this.orientation = 'portrait';
      this.popUpTitleSize = '1.3em';
      this.descriptionColumnCount = 2;

    } else if (this.screenWidth < 1299 && this.screenWidth >= 921) {
    // } else if (window.matchMedia('(min-width: 1024px) and (max-width: 1365px)').matches) {
      if (this.orientation === 'portrait') {
        this.imgsToDisplay = 1;
      } else {
        this.imgsToDisplay = 1;
      }
      this.fCarouselInit();
      this.orientation = 'portrait';
      this.popUpTitleSize = '1.3em';
      this.descriptionColumnCount = 1;

    } else if (this.screenWidth < 920  && this.screenWidth >= 640) {
    // } else if (window.matchMedia('(min-width: 800px) and (max-width: 1023px)').matches) {
      if (this.orientation === 'portrait') {
        this.imgsToDisplay = 1;
      } else {
        this.imgsToDisplay = 1;
      }
      this.fCarouselInit();
      this.orientation = 'landscape';
      this.popUpTitleSize = '1em';
      // this.imgsToDisplay = 1;
      this.descriptionColumnCount = 2;

    // } else if (window.matchMedia('(max-width: 799px)').matches) {
    } else {
      // if (this.orientation === 'portrait') {
      //   this.imgsToDisplay = 1;
      // } else {
      //   this.imgsToDisplay = 1;
      // }
      this.fCarouselInit();
      this.orientation = 'landscape';
      this.popUpTitleSize = '.8em';
      this.imgsToDisplay = 1;
      this.descriptionColumnCount = 1;
    }
  }
}
