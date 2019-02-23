
import { Component, OnInit, ViewChild, ViewChildren,
         AfterViewInit, AfterViewChecked, Inject, ElementRef,
         HostListener, Input } from '@angular/core';
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

  @ViewChild('childViewTest') childViewTest;

  // @Input() childMessage: string;

  public bShow = false;

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
  public aDisplaySHowBtn = ['true', 'true', 'false', 'false', 'true', 'false', 'false', 'true', 'true'];

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
  public modalKontainerId = document.getElementById('modalKontainerId');
  public modalKontainerWidth: number; // any;
  public modalKontainerHeight: number; // any;
  // public modalMaxWidth: any; //  = this._portfolioDataService.modalMaxWidth; // width info from service
  public modalMaxHeight = this._portfolioDataService.modalHeightVH; // height info from service

  public modalKontainerInteriorWidth: number; // Modal container internal width. Declared in HTML.

  /*---= Carousel properties =---*/
  public carouselMaskWidth: number; // any;
  // public carouselKontainerId = '#carousel-kontainer-id'; // ul: photos strip
  public carouselKontainer = '.carousel-kontainer';
  public carouselFotoStripWidth: number; // any;
  // public totalImgsWidth: number;
  public photoStripSetCount: number; // foto strip width / imgs to display = set
  public commonCounterLastIndex: number;

  /*---= Images properties =---*/
  public imageKontainer = '.image-kontainer';
  public matDialogKontainer = '.mat-dialog-container'; // material modal
  // public matDialogKontainerClass = document.getElementsByClassName('mat-dialog-container'); // material modal
  // public cdkOverlayPane = document.getElementsByClassName('cdk-overlay-pane'); // material modal
  public fotoWidth: number; // any;
  public fotoHeight = 70;
  // public marginsx = 100;
  public imgsToDisplay: number;
  public photosLength: number;
  /*---= Carousel buttons properties =---*/
  public leftArrowIcon = ('.left-arrow');
  public rightArrowIcon = ('.right-arrow');
  public arrowButtonsKontainer = ('.arrow-buttons-kontainer');
  public arrowButtonsKontainerYPos: number; // any;
  public leftArrowButtonsKontainer = ('.left-button-kontainer');
  public rightArrowButtonsKontainer = ('.right-button-kontainer');
  public rightArrowButtonsKontainerXPos: number; // any;
  public btnKontainerWidth = 200;
  public carouselArrows = ('.carouselArrows');

  // public testWidth: number; // any;

  public testProjectDetail = 'Project Detail';

  public singleProject = '.bg-image'; // nada
  public multiProjects = '.multi-projects'; // nada
  public multiProjectsId = '#multi-projects-id'; // nada
  public multiProjTitle = '.multi-proj-title';
  // public multiProjTitleId = '#multiProjTitleId';

  public mdcFabExtended = '.mdcFabExtended';

  public stringFrPortfolio: string;

  public displayElement: boolean;
  public noLink: boolean;
  public showBtn: boolean;

  public flexDirection: string;
  public columnNum: number;
  public descriptionColumnCount: number;
  // private element: any;
  // public about = document.getElementsByClassName('about');
  public about = ('.about');
  public hideBtn = '.hideBtn';
  public btnX: string;
  public btnDisplay: string;
  // public btnMultiProjLink = '.btnMultiProjLink';


  constructor(
    public dialogRef: MatDialogRef<PopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public xData: any,
    private _funksions: FunksionsService,
    private _carousel: CarouselService,
    private _portfolioDataService: PortfolioDataService) {
      // this.element = getElementBy (el.nativeElement);
    }

  ngOnInit() {
    // console.log('|-----= ngOnInit() =-----|');
    this._carousel.commonCounter = 0;

    this.onSingleMutiProjects();
    this.onLandscapePortrait();
    // console.log ('xData: ', this.xData); // Returns all data of the selected pop up project

    this.fResizeMe();

  }


  public fDisplayBtn(e, d) {
    if (e === 'no-link') {
      d = 'none';
    } else {
      d = 'flex';
    }
  }

  public onSingleMutiProjects() {

    if (this.variation === 'single-project') {  /*----| Load single project |---*/
      console.log ('this.variation: ', this.variation);
      this.displayElement = false;

      // TEST
      // const x = document.querySelector('.carousel-kontainer') as HTMLElement;
      // x.style.opacity = '.15';

      this.photosLength = this.imageToLoad.length; // number of images to load on single project

     } else { /*---| Load multiple projects |---*/

      // this.showBtn = false;

      console.log ('this.variation: ', this.variation);
      console.log('this.aButtonDisplay: ', this.aButtonDisplay);
      console.log('this.buttonDisplay: ', this.buttonDisplay);
      for (let i = 0; i < this.xData.variedProjects2.length; i++) {

        this.buttonDisplay = this.xData.variedProjects2[i].varBtnDisplay;

        this.aVariedProj[this.aVariedProj.length] = this.xData.variedProjects2[i]; // push all variedProjects data
        this.varProjectTitle = this.aVariedProj[i].varProjectTitle;
        // console.log('this.varProjectTitle: ', this.varProjectTitle);

        this.variedProjsImg[this.variedProjsImg.length] = this.xData.variedProjects2[i].image; // push all variedProjects.image data

        // this.aVariedId[this.aVariedId.length] = '#' + this.xData.variedProjects2[i].varId; // push
        this.aVariedId[this.aVariedId.length] = '#' + this.xData.variedProjects2[i].varId; // push
        // console.log('this.aVariedId: ', this.aVariedId);

        this._funksions.fTMxToX(this.aVariedId[i], 10, 400, Power2);
        // this._funksions.fTMxFrX(this.aVariedId[i], 10, 400, Power2);
        // const x = document.querySelector (this.aVariedId[i]);
        // const x = document.querySelector(this.aVariedId[0]) as HTMLElement;
        // const x = document.getElementById('#' + this.xData.variedProjects2[i].varId) as HTMLElement;
        // x.style.opacity = '.5';
        // console.log('x: ', x);

        this.btnDisplay = 'none';

        this.aVarLinkName[this.aVarLinkName.length] = this.xData.variedProjects2[i].varLinkName; // push
        // console.log('this.aVarLinkName: ', this.aVarLinkName);

        this.aButtonDisplay[this.aButtonDisplay.length] = this.xData.variedProjects2[i].varBtnDisplay; // push
        // console.log('this.aButtonDisplay: ', this.aButtonDisplay);
        // this.aButtonDisplay.forEach(eachObj => {
        //   console.log('eachObj: ', [i], eachObj);
        // });

        // this.aButtonDisplay.forEach(function(element) {
        //   console.log('element: ', element);
        // });

        /*--= Triggering fDisplayBtn on enter =--*/
        // this.fDisplayBtn(this.aVarLinkName[i], this.btnDisplay);
        // setTimeout(() => {
        //   this.fDisplayBtn(this.aVarLinkName[i], this.btnDisplay);
        // }, 100);

        // if (this.aVarLinkName[0]) {
        // if (this.xData.variedProjects2[0].varLinkName === 'no-link') {
        //   this.btnDisplay = 'block';
        // } else {
        //   this.btnDisplay = 'none';
        // }

        // if (this.aVarLinkName[i] === 'no-link') {
        //   this.btnDisplay = 'none';
        // } else {
        //   this.btnDisplay = 'flex';
        // }
        // if ( this.aVariedProj[i].varLinkName === 'no-link' ) {
        //   this.btnDisplay = 'none';
        //   console.log('this.btnDisplay 1: ', this.btnDisplay);

        // } else if (this.aVariedProj[i].varLinkName !== 'no-link') {
        //   this.btnDisplay = 'flex';
        //   console.log('this.btnDisplay 2: ', this.btnDisplay);

        // } else {
        //   console.log('this.btnDisplay 3: ', this.btnDisplay);
        // }

        // console.log('this.aVariedId.lengthx: ', this.aVariedId.length);
        // console.log('this.aVariedId: ', this.aVariedId);
        // console.log ('this.xData.variedProjects2[i].varLinkName: ', this.xData.variedProjects2[i].varLinkName);

        // if ( this.xData.variedProjects2[i].varLinkName === 'no-link' ) {
        /*---
        if ( this.aVariedProj[i].varLinkName === 'no-link' ) {
          console.log ('varLinkName', [i], ': ', this.xData.variedProjects2[i].varLinkName);
          this.xData.variedProjects2[i].varLinkName = '';
          this.btnX = 'xBtn';
          this.aNoLink[this.aNoLink.length] = this.xData.variedProjects2[i].varId;
          console.log('this.aNoLink: ', this.aNoLink);
          // this._funksions.fElementVisibility(this.mdcButtonText, 'hidden');
          // this.xData.variedProjects2[i].varUrl = '';
          // this._funksions.fDisplay(this.mdcButtonText, 'none');

          // const x = document.querySelector('.mdc-button') as HTMLElement;
          // x.style.opacity = '.5';

          // const x2 = document.querySelector('#' + this.aNoLink) as HTMLElement;
          // x2.style.opacity = '.15';

          // console.log('[x]: ', [i]);

          // console.log('childViewTest: ', this.childViewTest.nativeElement);

          this.btnDisplay = 'none';
          this.noLink = true;
          console.log('this.noLink: ', this.noLink);

          // const aNew = [];
          // aNew[aNew.length] = [i]; // push
          // const removedI = [i];
          // const index = this.aVariedId.indexOf([i]);
          // console.log('[i]: ', [i]);
          // console.log('aNew[i]: ', aNew[i]);
          // console.log('removedI: ', removedI);
          // // console.log('index: ', index);
          // // this.aVariedId.splice(index, 0);

          // if (index > -1) {
          //   this.aVariedId.splice(this.aVariedId[i]);
          // }

          // console.log('this.aVariedIdSpliced: ', this.aVariedId);

         }  else {

          // const x2 = document.querySelector(this.btnX) as HTMLElement;
          // x2.style.opacity = '1';

          this.btnDisplay = 'flex';
          this.noLink = false;
          console.log('this.noLink: ', this.noLink);

        } ---*/

      }

      // console.log ('this.multiProjTitle: ', this.multiProjTitle);

      /*---|boolean trigger multi projects|---*/
      this.displayElement = true;

      this.photosLength = this.variedProjects.length; // number of images to load on multi projects

      // this._funksions.fElementVisibility(this.mdcFabExtended, 'hidden');
      this._funksions.fDisplay(this.mdcFabExtended, 'none');
      // this._funksions.fDisplay(this.about, 'none');
      // this._funksions.fDisplay(this.btnMultiProjLink, 'none');

      // this._funksions.fElementOpacity(this.about, '.25');

      // this._funksions.fElementVisibility(this.mdcButtonText, 'hidden');
    }
  }

  public onLandscapePortrait() {
    if (this.orientation === 'landscape') {
      this.flexDirection = 'column'; // column-reverse
      this.columnNum = 1;
      this.descriptionColumnCount = 2;
      this.carouselMaskWidth = Math.round((this.modalKontainerWidth / this.columnNum) - 50 );
    } else { // portrait
      this.flexDirection = '';
      this.columnNum = 2;
      this.descriptionColumnCount = 1;
      this.carouselMaskWidth = Math.round((this.modalKontainerWidth / this.columnNum) - 25 );
    }
  }

  ngAfterViewInit() {
    // this.onSingleMutiProjects();
    // console.log('|-----= ngAfterViewInit() =-----|');
    // console.log('childViewTest: ', this.childViewTest.nativeElement);
    // console.log('childViewTest.value: ', this.childViewTest.nativeElement.value);
    // this._funksions.fElementVisibility(this.childViewTest, 'hidden');
    /* setTimeout(() => {
      this.carouselMaskWidth = this.carouselChildKontainer.nativeElement.clientWidth;
      console.log('carouselMaskWidth: ', this.carouselMaskWidth);
      this.fCarouselInit();
      this.fResizeMe();
    }, 50); */

  }

  ngAfterViewChecked() {
    /* this life cycle hook also resized pop up and its content */
    // // console.log(''|-----= ngAfterViewChecked() =-----|');
    // this.fCarouselInit();
    // this.fCarouselInit();
    // this.fResizeMe();
    // for (let i = 0; i < this.aButtonDisplay.length; i++) {
    //   if (this.aButtonDisplay[i] === 'hidden') {
    //     this.showBtn = true;
    //     console.log('this.aButtonDisplay: ', this.aButtonDisplay);
    //   } else {
    //     this.showBtn = false;
    //   }
    // let i = 1;
    //   if (this.aButtonDisplay[i] === 'hidden') {
    //     this.showBtn = true;
    //     i++;
    //     console.log('i: ', i);
    //   } else {
    //     i++;
    //     console.log('i: ', i);
    //     this.showBtn = false;
    //   }
    // }
    // console.log('this.aButtonDisplay: ', this.aButtonDisplay);
    // console.log('this.aButtonDisplay: ', this.aButtonDisplay.length);
  }

  public fCarouselInit() {
    console.log('|-----= fCarouselInit() =-----|');
    // this.photosLength = this.imageToLoad.length;

    // console.log('variedProjects.length: ', this.variedProjects.length);
    // const btnKontainerPadding = 72; // 24;
    /* if (this._carousel.commonCounter === NaN) { // test
      this._carousel.commonCounter = 0;
      console.log('NaN: _carousel.commonCounter: ', this._carousel.commonCounter);
    } */

    // console.log('|-----= Modal Width =-----|');
      this.modalKontainerWidth = Math.round(this.screenWidth * .90);
      console.log('modalKontainerWidth: ', this.modalKontainerWidth);

    // console.log('|-----= Modal Height =-----|');
      this.modalKontainerHeight = Math.round(this.screenHeight * .90);
      // console.log('modalKontainerHeight: ', this.modalKontainerHeight);

      // this.cdkOverlayPane = this.modalKontainerHeight; // Math.round(this.screenHeight * .90);
      // this.modalKontainerWidth = this._portfolioDataService.modalMaxWidth; // this.screenWidth * .80; // this.modalMaxWidth;

      // this._funksions.fElementHeight('#modalKontainerId', this.modalKontainerHeight);
      // this._funksions.fElementHeight('#cdk-overlay-id', this.modalKontainerHeight);

    // console.log('|-----= Carousel Mask Width: Based on the modal width with 50px padding =-----|');
      // this.carouselMaskWidth = Math.round((this.modalKontainerWidth - 50));
      this.modalKontainerInteriorWidth = Math.round((this.modalKontainerWidth - 50));
      // this.carouselMaskWidth = Math.round((this.modalKontainerWidth / 2) - 25 );
      // this.carouselMaskWidth = Math.round((this.modalKontainerWidth / this.columnNum) - 25 );
      this.onLandscapePortrait();

      console.log('columnNum: ', this.columnNum);
      // this.carouselMaskWidth = Math.round(((this.modalKontainerWidth / this.columnNum) - 0 ) * .90 );
      // this.carouselMaskWidth = Math.round((this.modalKontainerWidth) - 25 );

      console.log('carouselMaskWidth: ', this.carouselMaskWidth);
      console.log('modalKontainerInteriorWidth: ', this.modalKontainerInteriorWidth);

    // console.log('|-----= Foto Width =-----|');
      this.fotoWidth = Math.round((this.carouselMaskWidth / this.imgsToDisplay)); // - 17 ;
      // console.log('fotoWidth: ', this.fotoWidth);

    // console.log('|-----= Carousel Strip Width =-----|');
      this.carouselFotoStripWidth = this.fotoWidth * this.photosLength;
    //  console.log('carouselFotoStripWidth: ', this.carouselFotoStripWidth);

      /*--- Resetting photo strip x position ---*/
      // this.totalImgsWidth = this.carouselFotoStripWidth; // total width of all images side by side
      this.photoStripSetCount = Math.round((this.carouselFotoStripWidth / this.modalKontainerWidth));
      this.commonCounterLastIndex = this.photoStripSetCount - 1; // Math.round(this.photoStripSetCount - 1);
      // console.log('totalImgsWidth: ', this.totalImgsWidth);
      // console.log('photoStripSetCount: ', this.photoStripSetCount);
      // console.log('commonCounterLastIndex: ', this.commonCounterLastIndex);

    // console.log('|-----= Arrow Positions =-----|');
      this.rightArrowButtonsKontainerXPos = this.carouselMaskWidth - this.btnKontainerWidth; // - btnKontainerPadding;
      // this.arrowButtonsKontainerYPos = this.modalMaxHeight / 2; // / 2;

      // this._portfolioDataService.fModalWidth(this.matDialogKontainer); // set .mat-dialog-container width
      // this._portfolioDataService.fCarouselWidth(this.carouselKontainer);

      /* when resizing window, images shouldn't be cut off
       use commonCounter to dictate the last xposition to be used as a pin point */
      this._carousel.fSlideCarousel(
            this.leftArrowIcon,
            this.rightArrowIcon,
            this.imageKontainer,    // elem
            'none',                      // slideDirection
            this.fotoWidth,              // imgWidth
            this.imgsToDisplay,          // imgsToDisplay
            this.carouselFotoStripWidth  // imgKontainerWidth
      );

      // this._funksions.fTMxFrX(this.multiProjLink, 10, 400, Power2);
      // this._funksions.fTMxFrX(this.aVariedId[i], 10, 400, Power2);
  }

  /*---| Button to open external links from Single Projects |---*/
  public fOpenXLinks(link) {
    // console.log ('link: ', link);
    // console.log ('linx1: ', this.linx1);
    // location.href = this.linx1;
    // location.target = '_blank';
    // window.open(this.linx1, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
    // window.open(this.linx1.linkUrl, 'xWindow');

    // this.xData.variedProjects2.forEach(function (varLinkName) {
    //   console.log('varLinkName: ', varLinkName);
    // });

    // this._funksions.fImgOrientation(this.aProjects, 'portrait');

    // if ( this.xData.variedProjects2[i].varLinkName === 'no-link' ) {

    // } else {
      window.open(link, 'xWindow');
    // }

  }

  /*---| Button to open external links from Multi Projects |---*/
  public fOpenVariedLinks(link) {
    window.open(link, 'xWindow');
  }

  public fClose(): void {
    // console.log('Closed');
    // this.element.hide();
    // $('body').removeClass('modal-open');
    // closeDialog() {
      this.dialogRef.close();
    // }
    // console.log(`Closed : ${title} modal. ••••••`);
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
            this.carouselFotoStripWidth);
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
            this.carouselFotoStripWidth);
  }

  /* fSlideLeft() {
    this._carousel.fSlideCarousel(
    this.imageKontainer,
    this.fotoWidth,
    this.imgsToDisplay);
  } */

  /*-- called inside fCarouselInit --*/
  /* fElementWidth(e, w) {
    const x = document.querySelector(e), s = x.style;
    s.width = w;
  } */
  /**********---== RESPONSIVENESS ==---**********/

  /*---- Viewport Resize ----*/
  @HostListener('window:resize', ['$event'])
  // @HostListener(this._windowRef._window(), ['$event'])
  onResize(event) {
    this.fResizeMe();
  }

  public fResizeMe() {
    // console.log('|-----= fResizeMe() =-----|');
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;

    this.arrowButtonsKontainerYPos = this.modalMaxHeight / 2; // / 2;

    // this.fCarouselInit();

    // /*--- Resetting photo strip x position ---*/
    // const totalImgsWidth = this.carouselFotoStripWidth; // total width of all images side by side
    // const photoStripSetCount = (totalImgsWidth / this.modalKontainerWidth);
    // const commonCounterLastIndex = Math.round(photoStripSetCount - 1);
    // console.log('totalImgsWidth: ', totalImgsWidth);
    // console.log('photoStripSetCount: ', photoStripSetCount);
    // console.log('commonCounterLastIndex: ', commonCounterLastIndex);

    /*--- Reset last commonCounter index ---*/
    if (this._carousel.endOfStrip) {
      this._carousel.commonCounter = -(this.commonCounterLastIndex); // counter last index is the last count during the current screen size and imgsToDisplay count
    }

    /*---- Media queries: for the pop-up component ----*/
    if ( this.screenWidth >= 1300 ) {
      if (this.orientation === 'portrait') {
        this.imgsToDisplay = 1;
      } else {
        this.imgsToDisplay = 1;
      }
      this.fCarouselInit();

    } else if ( this.screenWidth < 1299 && this.screenWidth >= 920 ) {
      if (this.orientation === 'portrait') {
        this.imgsToDisplay = 1;
      } else {
        this.imgsToDisplay = 1;
      }

      this.fCarouselInit();

    // } else if ( this.screenWidth < 899 && this.screenWidth >= 640 ) {
    //   this.imgsToDisplay = 2;
    //   this.fCarouselInit();

    } else {
      this.imgsToDisplay = 1;
      this.fCarouselInit();
    }

  }

}
