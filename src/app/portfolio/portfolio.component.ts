/***********************************************************
* Project: R.Lloyd Gonzales Portfolio Website
* URL: RLGonzales.com
* Contact: rolandolloyd@gmail.com
* Copyright © 2019 GonzalesDesign
* Platform: Angular 6
* Component Name: Portfolio
* Version: 090418
* Note: Main page layout and animation. Calls to open modal.
***********************************************************/

import { Component, OnInit, OnDestroy, AfterViewInit, HostListener } from '@angular/core';
import { Subscription, throwError, fromEvent } from 'rxjs';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { FunksionsService } from '../../services/funksions.service';
import { MondrianAnimService } from '../../services/mondrian-anim.service';
import { MatDialog } from '@angular/material';
import { PopUpComponent } from './pop-up/pop-up.component';
import { map } from '../../../node_modules/rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit, OnDestroy, AfterViewInit {

  public aAllData = [];
  public mainKontainerId = '#rlg-main-kontainer-id';
  public showMainKontainer: boolean;
  public photoKontainer = [];
  public fotoId = [];

  /*-= Photo layout container: Holds all the image containers =----*/
  public rlgKontentKontainerId = '#rlg-kontent-kontainer-id';
  public fotoInfoKontainer = '.photo-info-kontainer';
  // public showPhotoInfo: boolean;
  public rlgButtonKontainer = '.rlg-button-kontainer';
  public rlgButton = '.rlg-button';
  public showOpenModalBtn: boolean;
  public buttonLabel = '.buttonLabel'; // document.querySelector('.buttonLabel');
  // public buttonLabelId = '#button-label-id'; // document.querySelector('.buttonLabel');
  // public buttonLabel = document.getElementsByClassName('.buttonLabel');

  /*-= Title variables =----*/
  public titleContainerId = '#title-kontainer-id'; // ('title-kontainer-id'); // '#title-kontainer-id';
  public subTitleId = '#sub-title-id';
  public title = '.title';
  public subTitle = '.sub-title';

  /*---= loader props =---*/
  public loading = '.loading';
  public loadingKontainer = '.loading-kontainer';
  public cached: boolean;

  /*---= Timer =----*/
  public timeout = 2000;
  public tym1 = .5;
  public tym2 = .5;
  public tym3 = .5;

  /*-= Media queries variables =----*/
  public screenWidth: number; // = window.innerWidth;
  public screenHeight: number; // = window.innerHeight;
  public modalWidthVW = '90vw';
  public modalHeightVH = '90vh';
  // public innerWidth: any = window.innerWidth;
  // public largeScreen = 1300;
  // public mediumScreen = 850;
  // public smallScreen = 600;

  /*---=| Apple devices |=---*/
  public iPhone6 =  { 'width': 667,   'height': 375 };
  public iPhoneX =  { 'width': 812,   'height': 375 };
  public iPad =     { 'width': 1024,  'height': 768 };
  public iPadPro =  { 'width': 1366,  'height': 1024 };
  public orientation: number;

  /*---=| Dev breakpoints |=---*/
  public breakpoint: string;

  public scaling = 1; // : number;

  /*--===| rxjs: subscription |===--*/
  public subsPortfolio: Subscription;

  /*-= Error variables =----*/
  public errorMsg;

  public dialogResult: string;

  constructor(private _portfolioDataService: PortfolioDataService,
              private _popUp: MatDialog,
              private _funksions: FunksionsService,
              private _mondrianAnim: MondrianAnimService,
              public breakpointObserver: BreakpointObserver) { }

  ngOnInit() {

    // console.log('this.cached: ', this.cached, document.readyState, !localStorage.getItem('visited'), localStorage.length);
    // // if (document.cookie === '_ga=GA1.1.1158376882.1551051571') {
    // // if (this.cached) {
    //   // localStorage.clear();
    // if (!localStorage.getItem('visited')) {
    //   this.timeout = 50;
    // } else {
    //   this.timeout = 2000;
    // }
    // if (!sessionStorage.getItem('visited')) {
    //   $('.header-div').addClass('animation');
    //   sessionStorage.setItem('visited', true);
    // }

    /*---=|••• OBSERVABLE •••|=---*/
    this.subsPortfolio = this._portfolioDataService.portfolioData()
    .subscribe(data => {
      this.aAllData = data; // populate aAllData array with all the data
      this._funksions.fDisplay(this.loadingKontainer, 'flex'); // show loader
      this._funksions.fLoadTimer(this.loading, this.timeout); // simulating text percentage loading
      // console.log('this.aAllData: ', this.aAllData);
      /*--= Populating arrays =--*/
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        this.photoKontainer[this.photoKontainer.length] = '#' + element.kontainerId; // push
        this.fotoId[this.fotoId.length] = '#' + element.imageId; // push
      }
    },

      error => this.errorMsg = this.fError());
  }

  /*-==================================
		Unsubscribe to avoid memory leaks
	=====================================-*/
  ngOnDestroy() {
      this.subsPortfolio.unsubscribe();
  }

  public fError() {
    return 'SOMETHING WENT WRONG! ';
  }

  // public fHandleError(error) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     /*--= client-side error =--*/
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     /*--= server-side error =--*/
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   window.alert(errorMessage);
  //   return throwError(errorMessage);
  // }

  ngAfterViewInit() {
    // this.cached = true;
    /*---= ngAfterViewInit: same as window.onload =---*/
    setTimeout(() => {
      this._funksions.fRemoveLoader(this.loadingKontainer, 'none', .5); // remove loader
      this._funksions.fDisplay(this.mainKontainerId, 'flex'); // display mainKontainerId
      // this.fResizeMedia();
      this.fBreakpointObserver();
    }, this.timeout);
  }

  public fScreenOrientation() {
    const scrnWidth = window.innerWidth; // this.screenWidth;
    const scrnHeight = window.innerHeight; // this.screenHeight;
    const ratio = scrnWidth / scrnHeight;
    console.log('scrnWidth: ', scrnWidth, 'x scrnHeight: ', scrnHeight);
    console.log('ratio: ', ratio);
    /*--= Vertical display =--*/
    if ( ratio <= .79) {
      this.orientation = 90;
      // this.layout = 'one-column';
      console.log('orientation: vertical ', this.orientation);

    /*--= Squarish display display =--*/
    } else if (ratio > .8 && ratio <= 1.25) {
      this.orientation = 0;
      // this.layout = 'two-columns';
      console.log('orientation: squarish ', this.orientation);

    /*--= Horizontal display =--*/
    } else {
      this.orientation = 0;
      // this.layout = 'two-columns';
      console.log('orientation: horizontal ', this.orientation);
    }
  }

  public fBreakpointObserver() {
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
      console.clear();
      this.fScreenOrientation();
      // this.cached = true;
      // console.log('this.cached: ', this.cached, document.readyState);
      // console.log('document.cookie: ', document.cookie);
      // _ga=GA1.1.1158376882.1551051571
      // _ga=GA1.1.1158376882.1551051571
      // const widthInner = window.innerWidth;
      if (result.breakpoints[Breakpoints.XSmall]) {
       console.log('XSmall: (max-width: 599.99px)');
       this.handsetPortraitXSmall();
      //  this.iPhoneXVertical();
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

      if (result.breakpoints[Breakpoints.HandsetPortrait]) {
        // 0 - 599
        // this.breakpoint = 'handsetPortraitXSmall: ' + Breakpoints.HandsetPortrait;
        this.handsetPortraitXSmall();
      }

      if (result.breakpoints[Breakpoints.TabletPortrait]) {
        // this.breakpoint = 'TabletPortrait: ' + Breakpoints.TabletPortrait;
        // 600 - 839
        this.tabletPortrait();
      }

      if (result.breakpoints[Breakpoints.Small]) {
        // this.breakpoint = 'Small: tabletPortrait()' + Breakpoints.Small;
        // 840 - 959 : has to be portrait
        if (this.orientation === 90 && screen.width >= 600 && screen.width <= 812) {
          // this.breakpoint = 'iPhoneXLandscape';
          // this.iPhoneXLandscape();
          this.medium();
        } else {
          this.breakpoint = 'tabletPortrait';
          this.tabletPortrait();
        }
      }

      if (result.breakpoints[Breakpoints.HandsetLandscape]) {
        /*--= force to display this.handsetPortraitXSmall()
              orientation: 90 = landscape =--*/
        if (this.orientation === 90 && screen.width <= 600) {
          // this.breakpoint = 'handsetPortraitXSmall';
          this.handsetPortraitXSmall();
        } else if (screen.height <= 374 && screen.width <= 812) { // iPhoneX
          // this.breakpoint = 'iPhoneXLandscape';
          this.iPhoneXLandscape();
        }  else if (this.orientation === 0 && screen.width > 600) {
          // this.breakpoint = 'tabletPortrait';
          this.tabletPortrait();
        }
      }

      if (result.breakpoints[Breakpoints.TabletLandscape]) {
        // this.breakpoint = 'TabletLandscape: ' + Breakpoints.TabletLandscape;
        this.tabletLandscape();
      }

      if (result.breakpoints[Breakpoints.Medium]) {
        // this.breakpoint = 'Medium: ' + Breakpoints.Medium;
        // 960 - 1279
        this.medium();
      }

      if (result.breakpoints[Breakpoints.Large]) {
      //  this.breakpoint = 'Large: ' + Breakpoints.Large;
        // 1280 - 1919
        this.large();
      }

      if (result.breakpoints[Breakpoints.XLarge]) {
        // this.breakpoint = 'XLarge: ' + Breakpoints.XLarge;
        this.xLarge();
      }
    });
  }

  /*-----= TEST: Getting scroll to work inside Material Modal =-----*/
  public fTestScroll() {
    const content = document.querySelector('#titleBarId');
    const scroll$ = fromEvent(content, 'scroll').pipe(map(() => content));

    scroll$.subscribe(element => {
      console.log('|-----= ngAfterViewInit() Porfolio =-----|');
    });
  }

  /*-----= ************************************************ =-----*/

  /*---======================| Dynamic Breakpoint |=============================================================================================---/
    autoBreakpointsXSmall = (min-width: 375 - max-width: ≈ | height: portrait)
    Usage: Dynamically position cards based on screen width and height.
  /=---========================================================================================================================================---=*/
  public autoBreakpointsXSmall(posX) {
    const sW = window.innerWidth;
    const sH = window.innerHeight;
    const xPos = posX;
    const cardWidth = sW - (sW / 4);
    const cardPos = xPos;
  }

  /*---======================| Breakpoint Observer |=============================================================================================---/
    handsetPortraitXSmall = (min-width: 375 - max-width: ≈ | height: portrait) • For most cellphones portrait screen.
    Usage: iPhoneX Portrait,
  /=---========================================================================================================================================---=*/
  public handsetPortraitXSmall() {
    // console.clear();
    console.log('handsetPortraitXSmall');

    const tym = .5;
    const hPXSW = 360; // handsetPortraitXSmallWidth
    const hPXSH = 812; // handsetPortraitXSmallHeight
    const vCtr = hPXSW / 2;
    const mrgn = 16;
    const fotoWidth = '100%';
    const fotoHeight = '120%';

    /*=--------------------------------------------------------------------=|=--------------------------------------------------------------------=/
      this.mainKontainerId: Main Container, center kontent kontainer.
    =----------------------------------------------------------------------------------------------------------------------------------------------=
          this._mondrianAnim.fTranslateAnim2            (elem,    tym,  xp,     yp,    zp,        w,        h,  fontSize, alfa); =---*/
    this._mondrianAnim.fTranslateAnim(this.mainKontainerId,       tym,   0,      0,   100,   '100vw',  '100vh',    'null',    1);
    /*=--------------------------------------------------------------------=|=--------------------------------------------------------------------=*/

    /*=--------------------------------------------------------------------=|=--------------------------------------------------------------------=/
      this.rlgKontentKontainerId: Container wrapper for all the cards.
    =----------------------------------------------------------------------------------------------------------------------------------------------=
          this._mondrianAnim.fTranslateAnim2               (elem,         tym,       xp,      yp,    zp,        w,        h,  fontSize, alfa); =-*/
          this._mondrianAnim.fTranslateAnim(this.rlgKontentKontainerId,   tym,   'auto',  'auto',   100,    hPXSW,    hPXSH,    'null',    1);
    /*=--------------------------------------------------------------------=|=--------------------------------------------------------------------=*/

    /*--- Modal button visibility ---*/
    this._funksions.fTMXVisibility(this.rlgButtonKontainer, 1, 'visible');
    this._funksions.fTMXfontSize(this.buttonLabel, 1, '1.2em');

    /*--- Title and sub-title animation to place ---*/
    /* this._mondrianAnim.fTranslateAnim              (elem,       tym,                     xp,   yp,     zp,            w,      h,   fontSize,   alfa); */
    this._mondrianAnim.fTranslateAnim(this.titleContainerId, this.tym3,    vCtr - (hPXSW / 2) + mrgn,   22,    100,   hPXSW - (mrgn * 2),    100,     '15px',      1);
    this._funksions.fTextAlign(this.title, 'center');
    this._funksions.fTextAlign(this.subTitle, 'center');

    /*--- Photo containers animation ---*/
    /* this._mondrianAnim.fTranslateAnim                (elem,         tym,                    xp,      yp,     zp,      w,       h,  alfa); */
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[0],   this.tym1,     vCtr - (200 / 2) - mrgn,     100,    200,    200,     253,     1); // jtns   60,
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[1],   this.tym1,     vCtr - (283 / 2) - mrgn,     354,    180,    283,     187,     1); // ownphones   20,
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[2],   this.tym1,     vCtr - (244 / 2) - mrgn,     540,    160,    244,     189,     1); // misc    0,
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[3],   this.tym1,     vCtr - (212 / 2) - mrgn,     733,    140,    212,     302,     1); // illustrations  100,
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[4],   this.tym1,     vCtr - (350 / 2) - mrgn,    1000,    120,    350,     252,     1); // filipinas    0,
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[5],   this.tym1,     vCtr - (285 / 2) - mrgn,    1257,    100,    285,     285,     1); // akon   30,

    /*--- Photos animation ---*/
    /* this._mondrianAnim.backgroundImageTransform(      elem,           tym,              w,             h,      bgSize,      hPos,       vPos):---*/
    this._mondrianAnim.backgroundImageTransform(this.fotoId[0],    this.tym2,      fotoWidth,    fotoHeight,     'cover',      '0%',      '37%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[1],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[2],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '30%',       '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[3],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[4],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '50%',       '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[5],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '20%',      '20%');

  }

  /*---======================| Breakpoint Observer |=============================================================================================---/
    handsetLandscape = (min-width: 599 - max-width: ≈ | height: ≈) • For most cellphones portrait screen.
  /=---========================================================================================================================================---=*/
  public handsetPortrait() {
    // console.clear();
    // console.log('iPadPortrait(innerwidth): ', window.innerWidth);

    const handsetPortrait = 599.99;
    const fotoWidth = '100%';
    const fotoHeight = '120%';
    const xpos = 206;

    /*--- Resize layout container: Used to position all content within ---*/
    this._funksions.fElementWidth(this.rlgKontentKontainerId, handsetPortrait);

    /*--- Main Container placements ---/
          this._mondrianAnim.fTranslateAnim2            (elem,       tym,  xp,     yp,    zp,        w,        h,  fontSize, alfa); =---*/
    this._mondrianAnim.fTranslateAnim(this.mainKontainerId,    this.tym3,   0,      0,   100,   handsetPortrait,  '100vh',    'null',    1);

    /*--- Modal button visibility ---*/
    this._funksions.fTMXVisibility(this.rlgButtonKontainer, 1, 'visible');
    this._funksions.fTMXfontSize(this.buttonLabel, 1, '1.2em');

    /*--- Title and sub-title animation to place ---*/
    /* this._mondrianAnim.fTranslateAnim              (elem,       tym,     xp,   yp,     zp,     w,      h,   fontSize,   alfa); */
    this._mondrianAnim.fTranslateAnim(this.titleContainerId, this.tym3,    298,   90,    100,   400,    100,     '15px',      1);
    this._funksions.fTextAlign(this.title, 'left');
    this._funksions.fTextAlign(this.subTitle, 'left');

    /*--- Photo containers animation ---*/
    /* this._mondrianAnim.fTranslateAnim                (elem,         tym,      xp,    yp,     zp,      w,       h,  alfa); */
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[0],   this.tym1,      50,    60,    120,    220,     200,     1); // jtns
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[1],   this.tym1,     252,   174,    200,    276,     200,     1); // ownphones
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[2],   this.tym1,      38,   282,    110,    260,     200,     1); // misc
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[3],   this.tym1,     320,   397,    120,    232,     272,     1); // illustrations
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[4],   this.tym1,      11,   505,    110,    302,     200,     1); // filipinas
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[5],   this.tym1,     264,   692,    100,    242,     220,     1); // akon

    /*--- Photos animation ---*/
    /* this._mondrianAnim.backgroundImageTransform(      elem,           tym,              w,             h,      bgSize,      hPos,       vPos):---*/
    this._mondrianAnim.backgroundImageTransform(this.fotoId[0],    this.tym2,      fotoWidth,    fotoHeight,     'cover',      '0%',      '37%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[1],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[2],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '30%',       '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[3],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[4],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '50%',       '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[5],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '20%',      '20%');

  }

  /*---======================| Breakpoint Observer |=============================================================================================---/
    handsetLandscape = (min-width: 959 - max-width: ≈ | height: ≈)
  /=---========================================================================================================================================---=*/
  public handsetLandscape() {
    // console.clear();
    console.log('handsetLandscape');
    // console.log('orientation: ', orientation);

    // const randTime = this._funksions.fGetRandomArbitrary(.1, .5);
    const tym = .25;
    const handsetLandscapeW = 784; // 959.99;
    const handsetLandscapeH = 784; // 599.99;
    const fotoWidth = '100%';
    const fotoHeight = '120%';

    /*=--================================================================--=|=--================================================================--=/
      this.mainKontainerId: Main Container, center kontent kontainer.
    =----=======================================================================================================================================--=
          this._mondrianAnim.fTranslateAnim3            (elem,    tym,  xp,     yp,    zp,        w,        h,  fontSize, scale); =---*/
    this._mondrianAnim.fTranslateAnim3(this.mainKontainerId,       tym,   0,      0,   100,   '100vw',  '100vh',    'null',   this.scaling);
    /*=--================================================================--=|=--================================================================--=*/

    /*=--================================================================--=|=--================================================================--=/
      this.rlgKontentKontainerId: Container wrapper for all the cards.
    =----=======================================================================================================================================--=
          this._mondrianAnim.fTranslateAnim2               (elem,         tym,       xp,      yp,    zp,        w,        h,  fontSize, alfa); =-*/
          this._mondrianAnim.fTranslateAnim(this.rlgKontentKontainerId,   tym,   'auto',  'auto',   100,  handsetLandscapeW,  handsetLandscapeH,    'null',    1);
    /*=--================================================================--=|=--================================================================--=*/

    /*--- Modal button visibility ---*/
    this._funksions.fTMXVisibility(this.rlgButtonKontainer, 1, 'visible');
    this._funksions.fTMXfontSize(this.buttonLabel, 1, '1em');

    /*--- Title and sub-title animation to place ---*/
    /* this._mondrianAnim.fTranslateAnim              (elem,   tym,     xp,   yp,     zp,     w,      h,   fontSize,   alfa); */
    this._mondrianAnim.fTranslateAnim(this.titleContainerId,   tym,    109,   60,    100,   400,    100,     '15px',      1);
    this._funksions.fTextAlign(this.title, 'right');
    this._funksions.fTextAlign(this.subTitle, 'right');

    /*--- Photo containers animation ---*/
    /* this._mondrianAnim.fTranslateAnim                (elem,   tym,      xp,    yp,     zp,      w,       h,  alfa); */
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[0],   tym,     472,    20,    120,    200,     150,     1); // jtns
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[1],   tym,     226,   134,    200,    279,     190,     1); // ownphones
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[2],   tym,     540,   130,    110,    260,     200,     1); // misc
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[3],   tym,      42,   187,    120,    200,     250,     1); // illustrations
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[4],   tym,     168,   258,    110,    350,     248,     1); // filipinas
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[5],   tym,     504,   298,    100,    242,     220,     1); // akon

    /*--- Photos animation ---*/
    /* this._mondrianAnim.backgroundImageTransform(      elem,     tym,              w,             h,      bgSize,      hPos,       vPos):---*/
    this._mondrianAnim.backgroundImageTransform(this.fotoId[0],    tym,      fotoWidth,    fotoHeight,     'cover',      '0%',      '37%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[1],    tym,      fotoWidth,    fotoHeight,     'cover',     '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[2],    tym,      fotoWidth,    fotoHeight,     'cover',     '30%',       '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[3],    tym,      fotoWidth,    fotoHeight,     'cover',     '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[4],    tym,      fotoWidth,    fotoHeight,     'cover',     '50%',       '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[5],    tym,      fotoWidth,    fotoHeight,     'cover',     '20%',      '20%');

  }

  /*---======================| Breakpoint Observer |=============================================================================================---/
    iPhoneXLandscape = 375 x 812 : for iPhoneX landscape only
  /=---========================================================================================================================================---=*/
  public iPhoneXLandscape() {
    // console.clear();
    console.log('iPhoneXLandscape');
    // console.log('orientation: ', orientation);

    const tym = .5;
    const iPhoneXLandscapeW = 812;
    const iPhoneXLandscapeH = 374;
    const fotoWidth = '100%';
    const fotoHeight = '120%';

    /*=--------------------------------------------------------------------=|=--------------------------------------------------------------------=/
      this.mainKontainerId: Main Container, center kontent kontainer.
    =----------------------------------------------------------------------------------------------------------------------------------------------=
    this._mondrianAnim.fTranslateAnim2            (elem,    tym,  xp,     yp,    zp,        w,        h,  fontSize, alfa); =---*/
    this._mondrianAnim.fTranslateAnim(this.mainKontainerId,       tym,   0,      0,   100,   '100vw',  '100vh',    'null',    1);
    /*=--------------------------------------------------------------------=|=--------------------------------------------------------------------=*/

    /*=--------------------------------------------------------------------=|=--------------------------------------------------------------------=/
      this.rlgKontentKontainerId: Container wrapper for all the cards.
    =----------------------------------------------------------------------------------------------------------------------------------------------=
          this._mondrianAnim.fTranslateAnim2               (elem,         tym,       xp,      yp,    zp,        w,        h,  fontSize, alfa); =-*/
          this._mondrianAnim.fTranslateAnim(this.rlgKontentKontainerId,   tym,   'auto',  'auto',   100,  iPhoneXLandscapeW,  iPhoneXLandscapeH,    'null',    1);
    /*=--------------------------------------------------------------------=|=--------------------------------------------------------------------=*/

    /*--- Modal button visibility ---*/
    this._funksions.fTMXVisibility(this.rlgButtonKontainer, 1, 'visible');
    this._funksions.fTMXfontSize(this.buttonLabel, 1, '.8em');

    /*--- Title and sub-title animation to place ---*/
    /* this._mondrianAnim.fTranslateAnim              (elem,    tym,      xp,   yp,     zp,    w,       h,    fontSize, alfa); */
    this._mondrianAnim.fTranslateAnim(this.titleContainerId,    .25,     580,   80,    100,   210,    100,      '14px',    1);
    // this._mondrianAnim.fTranslateAnim(this.subTitleId,    this.tym3,       0,    0,    100,   350,    100,      '.9em',    1);
    this._funksions.fTextAlign(this.title, 'left');
    this._funksions.fTextAlign(this.subTitle, 'left');

    /*--- Photo containers animation ---*/
    /* this._mondrianAnim.fTranslateAnim                (elem,   tym,      xp,     yp,     zp,      w,       h,  alfa); */
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[0],   tym,      10,     10,    210,    180,     180,     1); // jtns
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[1],   tym,     155,    182,    200,    180,     140,     1); // ownphones
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[2],   tym,     174,     40,    210,    210,     140,     1); // misc
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[3],   tym,     375,     15,    250,    160,     180,     1); // illustrations
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[4],   tym,     540,    140,    100,    230,     180,     1); // filipinas
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[5],   tym,     357,    183,    100,    200,     180,     1); // 180
    /*--- Photos animation ---*/
    /* this._mondrianAnim.backgroundImageTransform(    element,    tym,              w,             h,      bgSize,      hPos,      vPos):---*/
    this._mondrianAnim.backgroundImageTransform(this.fotoId[0],    tym,      fotoWidth,    fotoHeight,     'cover',      '0%',      '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[1],    tym,      fotoWidth,    fotoHeight,     'cover',     '50%',     '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[2],    tym,      fotoWidth,    fotoHeight,     'cover',     '30%',      '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[3],    tym,      fotoWidth,    fotoHeight,     'cover',     '50%',     '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[4],    tym,      fotoWidth,    fotoHeight,     'cover',     '50%',      '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[5],    tym,      fotoWidth,    fotoHeight,     'cover',     '20%',     '20%');
  }

  /*---======================| Breakpoint Observer |=============================================================================================---/
    tabletPortrait = 600 x 601+ (min-width: 600 - max-width: 839 | height: ≈)
    Usage:
  /=---========================================================================================================================================---=*/
  public tabletPortrait() {
    // console.clear();h
    // console.log('tabletPortrait');
    // console.log('orientation: ', orientation);

    const tym = .5;
    const tabletPortraitW = 600;
    const tabletPortraitH = 812;
    const fotoWidth = '100%';
    const fotoHeight = '120%';

    /*=--------------------------------------------------------------------=|=--------------------------------------------------------------------=/
      this.mainKontainerId: Main Container, center kontent kontainer.
    =----------------------------------------------------------------------------------------------------------------------------------------------=
          this._mondrianAnim.fTranslateAnim2            (elem,    tym,  xp,     yp,    zp,        w,        h,  fontSize, alfa); =---*/
    this._mondrianAnim.fTranslateAnim(this.mainKontainerId,       tym,   0,      0,   100,   '100vw',  '100vh',    'null',    1);
    /*=--------------------------------------------------------------------=|=--------------------------------------------------------------------=*/

    /*=--------------------------------------------------------------------=|=--------------------------------------------------------------------=/
      this.rlgKontentKontainerId: Container wrapper for all the cards.
    =----------------------------------------------------------------------------------------------------------------------------------------------=
          this._mondrianAnim.fTranslateAnim2               (elem,         tym,       xp,      yp,    zp,        w,        h,  fontSize, alfa); =-*/
          this._mondrianAnim.fTranslateAnim(this.rlgKontentKontainerId,   tym,   'auto',  'auto',   100,  tabletPortraitW,  tabletPortraitH,    'null',    1);
    /*=--------------------------------------------------------------------=|=--------------------------------------------------------------------=*/

    /*--- Modal button visibility ---*/
    this._funksions.fTMXVisibility(this.rlgButtonKontainer, 1, 'visible');
    this._funksions.fTMXfontSize(this.buttonLabel, 1, '1.2em');

    /*--- Title and sub-title animation to place ---*/
    /* this._mondrianAnim.fTranslateAnim              (elem,       tym,     xp,   yp,     zp,     w,      h,   fontSize,   alfa); */
    this._mondrianAnim.fTranslateAnim(this.titleContainerId, this.tym3,    298,   50,    100,   400,    100,     '15px',      1);
    this._funksions.fTextAlign(this.title, 'left');
    this._funksions.fTextAlign(this.subTitle, 'left');

    /*--- Photo containers animation ---*/
    /* this._mondrianAnim.fTranslateAnim                (elem,   tym,      xp,    yp,     zp,      w,       h,  alfa); */
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[0],   tym,      50,    20,    120,    220,     200,     1); // jtns
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[1],   tym,     252,   134,    200,    276,     200,     1); // ownphones
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[2],   tym,      38,   242,    110,    260,     200,     1); // misc
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[3],   tym,     320,   357,    120,    232,     272,     1); // illustrations
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[4],   tym,      11,   465,    110,    302,     200,     1); // filipinas
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[5],   tym,     264,   652,    100,    242,     220,     1); // akon

    /*--- Photos animation ---*/
    /* this._mondrianAnim.backgroundImageTransform(      elem,     tym,              w,             h,      bgSize,      hPos,       vPos):---*/
    this._mondrianAnim.backgroundImageTransform(this.fotoId[0],    tym,      fotoWidth,    fotoHeight,     'cover',      '0%',      '37%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[1],    tym,      fotoWidth,    fotoHeight,     'cover',     '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[2],    tym,      fotoWidth,    fotoHeight,     'cover',     '30%',       '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[3],    tym,      fotoWidth,    fotoHeight,     'cover',     '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[4],    tym,      fotoWidth,    fotoHeight,     'cover',     '50%',       '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[5],    tym,      fotoWidth,    fotoHeight,     'cover',     '20%',      '20%');

  }

  /*---======================| Breakpoint Observer |=============================================================================================---/
    tabletLandscape = (min-width: 960 - max-width: 839 | height: landscape) • For most tablets landscape screen.
  /=---========================================================================================================================================---=*/
  public tabletLandscape() {
    // console.clear();
    console.log('tabletLandscape');

    const tym = .5;
    const tabletLandscapeW = 960;
    const tabletLandscapeH = 600;
    const fotoWidth = '100%';
    const fotoHeight = '120%';

    /*=--================================================================--=|=--================================================================--=/
      this.mainKontainerId: Main Container, center kontent kontainer.
    =----=======================================================================================================================================--=
          this._mondrianAnim.fTranslateAnim2            (elem,    tym,  xp,     yp,    zp,        w,        h,  fontSize, alfa); =---*/
    this._mondrianAnim.fTranslateAnim(this.mainKontainerId,       tym,   0,      0,   100,   '100vw',  '100vh',    'null',    1);
    /*=--================================================================--=|=--================================================================--=*/

    /*=--================================================================--=|=--================================================================--=/
      this.rlgKontentKontainerId: Container wrapper for all the cards.
    =----=======================================================================================================================================--=
          this._mondrianAnim.fTranslateAnim2               (elem,         tym,       xp,      yp,    zp,        w,        h,  fontSize, alfa); =-*/
          this._mondrianAnim.fTranslateAnim(this.rlgKontentKontainerId,   tym,   'auto',  'auto',   100,  tabletLandscapeW,  tabletLandscapeH,    'null',    1);
    /*=--================================================================--=|=--================================================================--=*/

    /*--- Modal button visibility ---*/
    this._funksions.fTMXVisibility(this.rlgButtonKontainer, 1, 'visible');
    this._funksions.fTMXfontSize(this.buttonLabel, 1, '1em');

    /*--- Title and sub-title animation to place ---*/
    /* this._mondrianAnim.fTranslateAnim              (elem,       tym,     xp,   yp,     zp,     w,      h,   fontSize,   alfa); */
    this._mondrianAnim.fTranslateAnim(this.titleContainerId, this.tym3,    109,   60,    100,   400,    100,     '15px',      1);
    this._funksions.fTextAlign(this.title, 'right');
    this._funksions.fTextAlign(this.subTitle, 'right');

    /*--- Photo containers animation ---*/
    /* this._mondrianAnim.fTranslateAnim                (elem,         tym,      xp,    yp,     zp,      w,       h,  alfa); */
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[0],   this.tym1,     472,    20,    120,    200,     150,     1); // jtns
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[1],   this.tym1,     226,   134,    200,    279,     190,     1); // ownphones
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[2],   this.tym1,     540,   130,    110,    260,     200,     1); // misc
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[3],   this.tym1,      42,   187,    120,    200,     250,     1); // illustrations
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[4],   this.tym1,     168,   258,    110,    350,     248,     1); // filipinas
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[5],   this.tym1,     504,   298,    100,    242,     220,     1); // akon

    /*--- Photos animation ---*/
    /* this._mondrianAnim.backgroundImageTransform(      elem,           tym,              w,             h,      bgSize,      hPos,       vPos):---*/
    this._mondrianAnim.backgroundImageTransform(this.fotoId[0],    this.tym2,      fotoWidth,    fotoHeight,     'cover',      '0%',      '37%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[1],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[2],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '30%',       '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[3],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[4],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '50%',       '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[5],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '20%',      '20%');

  }

  /*---======================| Breakpoint Observer |=============================================================================================---/
    medium = (min-width: 960 - max-width: 839 | height: 960+) • For most tablets portrait screen.
  /=---========================================================================================================================================---=*/
  public medium() {
    // console.clear();
    console.log('medium');

    // const randTime = this._funksions.fGetRandomArbitrary(.1, .5);
    const tym = .25;
    const mediumW = 960;
    const mediumH = 600;
    const fotoWidth = '100%';
    const fotoHeight = '120%';

    /*=--------------------------------------------------------------------=|=--------------------------------------------------------------------=/
      this.mainKontainerId: Main Container, center kontent kontainer.
    =----------------------------------------------------------------------------------------------------------------------------------------------=
          this._mondrianAnim.fTranslateAnim2            (elem,    tym,  xp,     yp,    zp,        w,        h,  fontSize, alfa); =---*/
    this._mondrianAnim.fTranslateAnim(this.mainKontainerId,       tym,   0,      0,   100,   '100vw',  '100vh',    'null',    1);
    /*=--------------------------------------------------------------------=|=--------------------------------------------------------------------=*/

    /*=--------------------------------------------------------------------=|=--------------------------------------------------------------------=/
      this.rlgKontentKontainerId: Container wrapper for all the cards.
    =----------------------------------------------------------------------------------------------------------------------------------------------=
          this._mondrianAnim.fTranslateAnim2               (elem,         tym,       xp,      yp,    zp,        w,        h,  fontSize, alfa); =-*/
          this._mondrianAnim.fTranslateAnim(this.rlgKontentKontainerId,   tym,   'auto',  'auto',   100,  mediumW,  mediumH,    'null',    1);
    /*=--------------------------------------------------------------------=|=--------------------------------------------------------------------=*/

    /*--- Modal button visibility ---*/
    this._funksions.fTMXVisibility(this.rlgButtonKontainer, 1, 'visible');
    this._funksions.fTMXfontSize(this.buttonLabel, 1, '1em');

    /*--- Title and sub-title animation to place ---*/
    /* this._mondrianAnim.fTranslateAnim              (elem,    tym,     xp,   yp,     zp,     w,      h,   fontSize,   alfa); */
    this._mondrianAnim.fTranslateAnim(this.titleContainerId,    tym,     54,   38,    100,   400,    100,     '18px',      1);
    this._funksions.fTextAlign(this.title, 'right');
    this._funksions.fTextAlign(this.subTitle, 'right');

    /*--- Photo containers animation ---*/
    /* this._mondrianAnim.fTranslateAnim                (elem,    tym,      xp,    yp,     zp,      w,       h,  alfa); */
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[0],    tym,     472,     9,    120,    260,     234,     1); // jtns
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[1],    tym,     226,   134,    200,    280,     190,     1); // ownphones
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[2],    tym,     585,   180,    110,    328,     200,     1); // misc
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[3],    tym,      42,   187,    120,    200,     310,     1); // illustrations
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[4],    tym,     208,   270,    110,    350,     288,     1); // filipinas
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[5],    tym,     544,   365,    100,    302,     220,     1); // akon

    /*--- Photos animation ---*/
    /* this._mondrianAnim.backgroundImageTransform(      elem,     tym,              w,             h,      bgSize,      hPos,       vPos):---*/
    this._mondrianAnim.backgroundImageTransform(this.fotoId[0],    tym,      fotoWidth,    fotoHeight,     'cover',      '0%',      '37%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[1],    tym,      fotoWidth,    fotoHeight,     'cover',     '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[2],    tym,      fotoWidth,    fotoHeight,     'cover',     '30%',       '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[3],    tym,      fotoWidth,    fotoHeight,     'cover',     '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[4],    tym,      fotoWidth,    fotoHeight,     'cover',     '50%',       '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[5],    tym,      fotoWidth,    fotoHeight,     'cover',     '20%',      '20%');

  }

  /*---======================| Breakpoint Observer |=============================================================================================---/
    large = (min-width: 1280 - max-width: ≈ | height: ≈)
  /=---========================================================================================================================================---=*/
  public large() {
    console.log('large');

    // console.clear();
    // console.log('iPadPortrait(innerwidth): ', window.innerWidth);

    const largeW = 1280;
    const largeH = 800;
    const fotoWidth = '100%';
    const fotoHeight = '120%';
    const xpos = 206;

    /*--- Resize layout container: Used to position all content within ---*/
    // this._funksions.fElementWidth(this.rlgKontentKontainerId, largeW);

    /*--- Kontent Container ---/
          this._mondrianAnim.fTranslateAnim2               (elem,          tym,       xp,      yp,    zp,        w,       h,  fontSize, alfa); =---*/
    this._mondrianAnim.fTranslateAnim(this.rlgKontentKontainerId,    this.tym3,   'auto',  'auto',   100,   largeW,  largeH,    'null',    1);

    /*--- Main Container placements ---/
          this._mondrianAnim.fTranslateAnim2         (elem,          tym,  xp,     yp,    zp,        w,         h,  fontSize, alfa); =---*/
    this._mondrianAnim.fTranslateAnim(this.mainKontainerId,    this.tym3,   0,      0,   100,   '100vw',  '100vh',    'null',    1);

    /*--- Modal button visibility ---*/
    this._funksions.fTMXVisibility(this.rlgButtonKontainer, 1, 'visible');
    this._funksions.fTMXfontSize(this.buttonLabel, 1, '1em');

    /*--- Title and sub-title animation to place ---*/
    /* this._mondrianAnim.fTranslateAnim              (elem,       tym,     xp,   yp,     zp,     w,      h,   fontSize,   alfa); */
    this._mondrianAnim.fTranslateAnim(this.titleContainerId, this.tym3,    232,   84,    100,   400,    100,     '18px',      1);
    this._funksions.fTextAlign(this.title, 'right');
    this._funksions.fTextAlign(this.subTitle, 'right');

    /*--- Photo containers animation ---*/
    /* this._mondrianAnim.fTranslateAnim                (elem,         tym,      xp,    yp,     zp,      w,       h,  alfa); */
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[0],   this.tym1,     306,   185,    120,    310,     220,     1); // jtns
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[1],   this.tym1,     310,   430,    200,    330,     190,     1); // ownphones
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[2],   this.tym1,    1000,   350,    110,    240,     190,     1); // misc
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[3],   this.tym1,      45,   327,    120,    300,     330,     1); // illustrations
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[4],   this.tym1,     640,    50,    110,    350,     248,     1); // filipinas
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[5],   this.tym1,     640,   322,    100,    406,     334,     1); // akon
    // /* this._mondrianAnim.fTranslateAnim                (elem,         tym,      xp,    yp,     zp,      w,       h,  alfa); */
    // this._mondrianAnim.fTranslateAnim2(this.photoKontainer[0],   this.tym1,     271,   127,    120,    220,     221,     1); // jtns
    // this._mondrianAnim.fTranslateAnim2(this.photoKontainer[1],   this.tym1,     216,   372,    200,    329,     190,     1); // ownphones
    // this._mondrianAnim.fTranslateAnim2(this.photoKontainer[2],   this.tym1,     813,   351,    110,    240,     191,     1); // misc
    // this._mondrianAnim.fTranslateAnim2(this.photoKontainer[3],   this.tym1,      45,   327,    120,    200,     300,     1); // illustrations
    // this._mondrianAnim.fTranslateAnim2(this.photoKontainer[4],   this.tym1,     515,    51,    110,    350,     248,     1); // filipinas
    // this._mondrianAnim.fTranslateAnim2(this.photoKontainer[5],   this.tym1,     515,   323,    100,    406,     296,     1); // akon

    /*--- Photos animation ---*/
    /* this._mondrianAnim.backgroundImageTransform(      elem,           tym,              w,             h,      bgSize,      hPos,       vPos):---*/
    this._mondrianAnim.backgroundImageTransform(this.fotoId[0],    this.tym2,      fotoWidth,    fotoHeight,     'cover',      '0%',      '37%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[1],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[2],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '30%',       '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[3],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[4],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '50%',       '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[5],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '20%',      '20%');

  }

  /*---======================| Breakpoint Observer |=============================================================================================---/
    xLarge = (min-width: 1920 - max-width: ≈ | height: 1040px) • For the largest screen.
  /=---========================================================================================================================================---=*/
  public xLarge() {
    // console.clear();
    console.log('xLarge');

    const tym = .5;
    const xLargeW = 1920;
    const xLargeH = 1040;
    const fotoWidth = '100%';
    const fotoHeight = '120%';
    const xpos = 206;

    /*=--================================================================--=|=--================================================================--=/
      this.mainKontainerId: Main Container, center kontent kontainer.
    =----=======================================================================================================================================--=
          this._mondrianAnim.fTranslateAnim2            (elem,    tym,  xp,     yp,    zp,        w,        h,  fontSize, alfa); =---*/
    this._mondrianAnim.fTranslateAnim(this.mainKontainerId,       tym,   0,      0,   100,   '100vw',  '100vh',    'null',    1);
    /*=--================================================================--=|=--================================================================--=*/

    /*=--================================================================--=|=--================================================================--=/
      this.rlgKontentKontainerId: Container wrapper for all the cards.
    =----=======================================================================================================================================--=
          this._mondrianAnim.fTranslateAnim2               (elem,         tym,       xp,      yp,    zp,        w,        h,  fontSize, alfa); =-*/
          this._mondrianAnim.fTranslateAnim(this.rlgKontentKontainerId,   tym,   'auto',  'auto',   100,  xLargeW,  xLargeH,    'null',    1);
    /*=--================================================================--=|=--================================================================--=*/


    /*--- Modal button visibility ---*/
    this._funksions.fTMXVisibility(this.rlgButtonKontainer, 1, 'visible');
    this._funksions.fTMXfontSize(this.buttonLabel, 1, '1em');

    /*--- Title and sub-title animation to place ---*/
    /* this._mondrianAnim.fTranslateAnim              (elem,    tym,     xp,   yp,     zp,     w,      h,   fontSize,   alfa); */
    this._mondrianAnim.fTranslateAnim(this.titleContainerId,    tym,    548,   60,    100,   400,    100,     '20px',      1);
    this._funksions.fTextAlign(this.title, 'right');
    this._funksions.fTextAlign(this.subTitle, 'right');

    /*--- Photo containers animation ---*/
    /* this._mondrianAnim.fTranslateAnim                (elem,   tym,      xp,    yp,     zp,      w,       h,  alfa); */
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[0],   tym,     632,   158,    120,    300,     330,     1); // jtns
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[1],   tym,     596,   512,    200,    390,     274,     1); // ownphones
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[2],   tym,    1354,   368,    110,    405,     304,     1); // misc
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[3],   tym,     218,   328,    120,    390,     390,     1); // illustrations
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[4],   tym,     960,    20,    110,    422,     295,     1); // filipinas
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[5],   tym,     960,   344,    100,    480,     390,     1); // akon

    /*--- Photos animation ---*/
    /* this._mondrianAnim.backgroundImageTransform(      elem,     tym,              w,             h,      bgSize,      hPos,       vPos):---*/
    this._mondrianAnim.backgroundImageTransform(this.fotoId[0],    tym,      fotoWidth,    fotoHeight,     'cover',      '0%',      '37%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[1],    tym,      fotoWidth,    fotoHeight,     'cover',     '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[2],    tym,      fotoWidth,    fotoHeight,     'cover',     '30%',       '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[3],    tym,      fotoWidth,    fotoHeight,     'cover',     '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[4],    tym,      fotoWidth,    fotoHeight,     'cover',     '50%',       '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[5],    tym,      fotoWidth,    fotoHeight,     'cover',     '20%',      '20%');

  }



  public iPhoneXVertical() {
    // console.clear();
    console.log('iPhoneXVertical(innerwidth): ', window.innerWidth);
    console.log('iPhoneXVertical(screen.width): ', screen.width);
    const iPhoneXPortrait = this.iPhoneX.height;
    console.log('iPhoneXPortrait: ', iPhoneXPortrait);
    // this.screenWidth = iPhoneXPortrait;

    const fotoWidth = '100%';
    const fotoHeight = '120%';

    /*--- Resize layout container: Used to position all content within ---*/
    // this._funksions.fElementWidth(this.rlgKontentKontainerId, iPhoneXPortrait);

    /*--- Main Container placements ---*/
    /* this._mondrianAnim.fTranslateAnim2            (elem,       tym,  xp,     yp,    zp,               w,        h,  fontSize, alfa); */
    this._mondrianAnim.fTranslateAnim(this.mainKontainerId, this.tym3,   0,      0,   100,   iPhoneXPortrait,  '100vh',    'null',    1);
    // this._mondrianAnim.fTranslateAnim(this.mainKontainerId, this.tym3,   0,      0,   100,       'auto',  '100vh',    'null',    1);

    /*--- Modal button visibility ---*/
    this._funksions.fTMXVisibility(this.rlgButtonKontainer, 1, 'visible'); // ?????
    this._funksions.fTMXfontSize(this.buttonLabel, 1, '.8em');

    //                               (elem,                  tym,  xp,     yp,    zp,        w,        h,  fontSize, alfa);
    // this._mondrianAnim.fTranslateAnim(this.rlgButtonKontainer, 1,   0,     10,    100,    'auto',   'auto',    'null',    1);

    /*--- Title and sub-title animation to place ---*/
    /* this._mondrianAnim.fTranslateAnim              (elem,       tym,     xp,   yp,     zp,     w,      h,  fontSize, alfa); */
    this._mondrianAnim.fTranslateAnim(this.titleContainerId, this.tym3,      0,   40,    100,   210,    100,    '12px',    1);
    this._mondrianAnim.fTranslateAnim(this.subTitleId,       this.tym3,      0,    0,    100,   350,    100,    '.9em',    1);
    this._funksions.fTextAlign(this.title, 'left');
    this._funksions.fTextAlign(this.subTitle, 'left');

    /*--- Photo containers animation ---*/
    /* this._mondrianAnim.fTranslateAnim                (elem,         tym,    xp,     yp,     zp,      w,       h,  alfa); */   // xp,
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[0],   this.tym1,     0,     100,    200,    200,     253,     1); // jtns   60,
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[1],   this.tym1,     0,     354,    180,    283,     187,     1); // ownphones   20,
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[2],   this.tym1,     0,     540,    160,    244,     189,     1); // misc    0,
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[3],   this.tym1,     0,     733,    140,    212,     302,     1); // illustrations  100,
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[4],   this.tym1,     0,    1000,    120,    350,     252,     1); // filipinas    0,
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[5],   this.tym1,     0,    1257,    100,    285,     285,     1); // akon   30,
    // this._mondrianAnim.fTranslateAnim2(this.photoKontainer[0],   this.tym1,     0,     100,    200,    200,     253,     1); // jtns   60,
    // this._mondrianAnim.fTranslateAnim2(this.photoKontainer[1],   this.tym1,     0,     354,    180,    283,     187,     1); // ownphones   20,
    // this._mondrianAnim.fTranslateAnim2(this.photoKontainer[2],   this.tym1,     0,     540,    160,    244,     189,     1); // misc    0,
    // this._mondrianAnim.fTranslateAnim2(this.photoKontainer[3],   this.tym1,     0,     733,    140,    212,     302,     1); // illustrations  100,
    // this._mondrianAnim.fTranslateAnim2(this.photoKontainer[4],   this.tym1,     0,    1000,    120,    350,     252,     1); // filipinas    0,
    // this._mondrianAnim.fTranslateAnim2(this.photoKontainer[5],   this.tym1,     0,    1257,    100,    285,     285,     1); // akon   30,

    /*--- Photos animation ---*/
    /* this._mondrianAnim.backgroundImageTransform(    element,          tym,              w,             h,      bgSize,      hPos,      vPos):---*/
    this._mondrianAnim.backgroundImageTransform(this.fotoId[0],    this.tym2,      fotoWidth,    fotoHeight,     'cover',      '0%',      '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[1],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '50%',     '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[2],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '30%',      '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[3],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '50%',     '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[4],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '50%',      '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[5],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '20%',     '20%');
  }

  public iPhoneXWide() {
    // console.clear();
    console.log('iPhoneXWide(innerwidth): ', window.innerWidth);
    console.log('iPhoneXVertical(screen.width): ', screen.width);
    const iPhoneXwidth = 797; // this.iPhoneX.width;
    console.log('iPhoneXwidth: ', iPhoneXwidth);


    const fotoWidth = '100%';
    const fotoHeight = '120%';
    // const xpos = 256;

    /*--- Main Container placements ---*/
    /* this._mondrianAnim.fTranslateAnim2            (elem,       tym,  xp,     yp,    zp,              w,        h,  fontSize, alfa); */
    this._mondrianAnim.fTranslateAnim(this.mainKontainerId, this.tym3,   0,      0,   100,   iPhoneXwidth,  '100vh',    'null',    1);
    // this._mondrianAnim.fTranslateAnim(this.mainKontainerId, this.tym3,   0,      0,   100,      'auto',  '100vh',    'null',    1);

    /*--- Content container: Content wrapper ---*/
    // this._funksions.fElementWidth(this.rlgKontentKontainerId, iPhoneXwidth);

    /*--- Modal button visibility ---*/
    // this._funksions.fTMXVisibility(this.rlgButtonKontainer, 1, 'visible'); // ???
    this._funksions.fTMXfontSize(this.buttonLabel, 1, '.8em');

    //                               (elem,                  tym,  xp,     yp,    zp,        w,        h,  fontSize, alfa);
    // this._mondrianAnim.fTranslateAnim(this.rlgButtonKontainer, 1,   0,     10,    100,    'auto',   'auto',    'null',    1);

    /*--- Title and sub-title animation to place ---*/
    /* this._mondrianAnim.fTranslateAnim              (elem,    tym,      xp,   yp,     zp,    w,       h,    fontSize, alfa); */
    this._mondrianAnim.fTranslateAnim(this.titleContainerId,    .25,     295,   80,    100,   210,    100,      '12px',    1);
    // this._mondrianAnim.fTranslateAnim(this.subTitleId,    this.tym3,       0,    0,    100,   350,    100,      '.9em',    1);
    this._funksions.fTextAlign(this.title, 'left');
    this._funksions.fTextAlign(this.subTitle, 'left');

    /*--- Photo containers animation ---*/
    /* this._mondrianAnim.fTranslateAnim                (elem,         tym,      xp,     yp,     zp,      w,       h,  alfa); */
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[0],   this.tym1,    -261,     10,    205,    200,     120,     1); // jtns
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[1],   this.tym1,    -240,    119,    200,    283,     187,     1); // ownphones
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[2],   this.tym1,     -80,     27,    210,    171,     123,     1); // misc
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[3],   this.tym1,     102,     65,    250,    148,     183,     1); // illustrations
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[4],   this.tym1,     264,    140,    100,    242,     152,     1); // filipinas
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[5],   this.tym1,      25,    163,    100,    250,     170,     1); // akon

    /*--- Photos animation ---*/
    /* this._mondrianAnim.backgroundImageTransform(    element,          tym,              w,             h,      bgSize,      hPos,      vPos):---*/
    this._mondrianAnim.backgroundImageTransform(this.fotoId[0],    this.tym2,      fotoWidth,    fotoHeight,     'cover',      '0%',      '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[1],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '50%',     '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[2],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '30%',      '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[3],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '50%',     '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[4],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '50%',      '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[5],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '20%',     '20%');
  }

  public i812Vertical() {
    // console.clear();
    console.log('i812Vertical(innerwidth): ', window.innerWidth);

    const i812Vertical = 812;

    const fotoWidth = '100%';
    const fotoHeight = '120%';
    const xpos = 206;

    /*--- Resize layout container: Used to position all content within ---*/
    this._funksions.fElementWidth(this.rlgKontentKontainerId, i812Vertical);

    /*--- Main Container placements ---/
          this._mondrianAnim.fTranslateAnim2            (elem,       tym,  xp,     yp,    zp,        w,        h,  fontSize, alfa); =---*/
    this._mondrianAnim.fTranslateAnim(this.mainKontainerId,    this.tym3,   0,      0,   100,   'auto',  '100vh',    'null',    1);

    /*--- Modal button visibility ---*/
    this._funksions.fTMXVisibility(this.rlgButtonKontainer, 1, 'visible');
    this._funksions.fTMXfontSize(this.buttonLabel, 1, '1.2em');

    /*--- Title and sub-title animation to place ---*/
    /* this._mondrianAnim.fTranslateAnim              (elem,       tym,     xp,   yp,     zp,     w,      h,   fontSize,   alfa); */
    this._mondrianAnim.fTranslateAnim(this.titleContainerId, this.tym3,    176,  139,    100,   400,    100,     '20px',      1);
    this._funksions.fTextAlign(this.title, 'left');
    this._funksions.fTextAlign(this.subTitle, 'left');

    /*--- Photo containers animation ---*/
    /* this._mondrianAnim.fTranslateAnim                (elem,         tym,      xp,     yp,     zp,      w,       h,  alfa); */
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[0],   this.tym1,    -171,     60,    120,    300,     390,     1); // jtns
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[1],   this.tym1,     160,    255,    200,    300,     310,     1); // ownphones
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[2],   this.tym1,    -141,    482,    110,    460,     370,     1); // misc
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[3],   this.tym1,    -122,    848,    100,    432,     522,     1); // illustrations
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[4],   this.tym1,     144,    545,    105,    442,     422,     1); // filipinas
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[5],   this.tym1,     160,    997,    100,    322,     279,     1); // akon

    /*--- Photos animation ---*/
    /* this._mondrianAnim.backgroundImageTransform(      elem,           tym,              w,             h,      bgSize,      hPos,       vPos):---*/
    this._mondrianAnim.backgroundImageTransform(this.fotoId[0],    this.tym2,      fotoWidth,    fotoHeight,     'cover',      '0%',      '37%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[1],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[2],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '30%',       '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[3],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[4],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '50%',       '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[5],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '20%',      '20%');

  }

  public iPadPortrait() {
    // console.clear();
    // console.log('iPadPortrait(innerwidth): ', window.innerWidth);

    const iPadPortrait = 768;
    const fotoWidth = '100%';
    const fotoHeight = '120%';
    const xpos = 206;

    /*--- Resize layout container: Used to position all content within ---*/
    this._funksions.fElementWidth(this.rlgKontentKontainerId, iPadPortrait);

    /*--- Main Container placements ---/
          this._mondrianAnim.fTranslateAnim2            (elem,       tym,  xp,     yp,    zp,        w,        h,  fontSize, alfa); =---*/
    this._mondrianAnim.fTranslateAnim(this.mainKontainerId,    this.tym3,   0,      0,   100,   'auto',  '100vh',    'null',    1);

    /*--- Modal button visibility ---*/
    this._funksions.fTMXVisibility(this.rlgButtonKontainer, 1, 'visible');
    this._funksions.fTMXfontSize(this.buttonLabel, 1, '1.2em');

    /*--- Title and sub-title animation to place ---*/
    /* this._mondrianAnim.fTranslateAnim              (elem,       tym,     xp,   yp,     zp,     w,      h,   fontSize,   alfa); */
    this._mondrianAnim.fTranslateAnim(this.titleContainerId, this.tym3,    176,  139,    100,   400,    100,     '20px',      1);
    this._funksions.fTextAlign(this.title, 'left');
    this._funksions.fTextAlign(this.subTitle, 'left');

    /*--- Photo containers animation ---*/
    /* this._mondrianAnim.fTranslateAnim                (elem,         tym,      xp,     yp,     zp,      w,       h,  alfa); */
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[0],   this.tym1,    -171,     60,    120,    300,     390,     1); // jtns
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[1],   this.tym1,     160,    255,    200,    300,     310,     1); // ownphones
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[2],   this.tym1,     -48,    482,    110,    460,     370,     1); // misc
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[3],   this.tym1,     -116,    881,    100,    432,     522,     1); // illustrations
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[4],   this.tym1,     134,    714,    105,    442,     422,     1); // filipinas
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[5],   this.tym1,     170,   1187,    100,    322,     279,     1); // akon

    /*--- Photos animation ---*/
    /* this._mondrianAnim.backgroundImageTransform(      elem,           tym,              w,             h,      bgSize,      hPos,       vPos):---*/
    this._mondrianAnim.backgroundImageTransform(this.fotoId[0],    this.tym2,      fotoWidth,    fotoHeight,     'cover',      '0%',      '37%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[1],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[2],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '30%',       '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[3],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[4],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '50%',       '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[5],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '20%',      '20%');

  }

  public iPadWide() {
    // console.clear();
    // console.log('iPadWide(innerwidth): ', window.innerWidth);
    const iPad1024 = this.iPad.width;

    const fotoWidth = '100%';
    const fotoHeight = '120%';
    // const xpos = 250; // 438;

    /*--- Main Container placements ---/
          this._mondrianAnim.fTranslateAnim2      (element,        tym,   xp,  yp,   zp,        w,        h,   fontSize,    alfa); =---*/
    this._mondrianAnim.fTranslateAnim(this.mainKontainerId,  this.tym3,    0,   0,  100,   'auto',  '100vh',     'null',       1);

    /*--- Resize layout container: Used to position all content within ---*/
    this._funksions.fElementWidth(this.rlgKontentKontainerId, iPad1024);

    /*--- Modal button visibility ---*/
    // this._funksions.fTMXVisibility(this.rlgButtonKontainer, 1, 'visible');
    this._funksions.fTMXfontSize(this.buttonLabel, 1, '1.2em');

    /*--- Title and sub-title animation to place ---*/
    /* this._mondrianAnim.fTranslateAnim              (elem,       tym,     xp,  yp,     zp,     w,      h,  fontSize,  alfa); */
    this._mondrianAnim.fTranslateAnim(this.titleContainerId, this.tym3,    228,  28,    100,   400,    100,    '18px',     1);
    // this._mondrianAnim.fTranslateAnim(this.subTitleId,    this.tym3,       0,    0,    100,   400,    100,      '.9em',    1);
    this._funksions.fTextAlign(this.title, 'left');
    this._funksions.fTextAlign(this.subTitle, 'left');

    /*--- Photo containers animation ---*/
    /* this._mondrianAnim.fTranslateAnim                (elem,         tym,       xp,     yp,     zp,      w,       h,  alfa); */   // xp,
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[0],   this.tym1,     -113,     22,    100,    300,     190,     1); // jtns  137,
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[1],   this.tym1,     -178,    238,    200,    300,     220,     1); // ownphones   72,
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[2],   this.tym1,     -287,    387,    110,    370,     320,     1); // misc  -45,
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[3],   this.tym1,      145,    118,    100,    292,     292,     1); // illustrations  395,
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[4],   this.tym1,      192,    434,    100,    572,     292,     1); // filipinas  320,
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[5],   this.tym1,      360,    220,    100,    200,     220,     1); // akon  670,

    /*--- Photos animation ---*/
    /* this._mondrianAnim.backgroundImageTransform(    element,          tym,              w,             h,      bgSize,      hPos,       vPos): =---*/
    this._mondrianAnim.backgroundImageTransform(this.fotoId[0],    this.tym2,      fotoWidth,    fotoHeight,     'cover',      '0%',      '37%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[1],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[2],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '30%',       '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[3],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[4],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '50%',       '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[5],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '20%',      '20%');
  }


  public iPadProVertical() {
    // console.clear();
    console.log('iPadProVertical(innerwidth): ', window.innerWidth);

    const iPadPro1024 = this.iPadPro.height;
    const fotoWidth = '100%';
    const fotoHeight = '120%';
    const xpos = 206;

    /*--- Resize layout container: Used to position all content within ---*/
    this._funksions.fElementWidth(this.rlgKontentKontainerId, iPadPro1024);

    /*--- Main Container placements ---/
          this._mondrianAnim.fTranslateAnim2            (elem,       tym,  xp,     yp,    zp,        w,        h,  fontSize, alfa); =---*/
    this._mondrianAnim.fTranslateAnim(this.mainKontainerId,    this.tym3,   0,      0,   100,   'auto',  '100vh',    'null',    1);

    /*--- Modal button visibility ---*/
    this._funksions.fTMXVisibility(this.rlgButtonKontainer, 1, 'visible');
    this._funksions.fTMXfontSize(this.buttonLabel, 1, '1.2em');

    /*--- Title and sub-title animation to place ---*/
    /* this._mondrianAnim.fTranslateAnim              (elem,       tym,            xp,   yp,     zp,      w,      h,   fontSize,   alfa); */
    this._mondrianAnim.fTranslateAnim(this.titleContainerId, this.tym3,    176,  174,    100,   400,    100,     '22px',      1);
    this._funksions.fTextAlign(this.title, 'left');
    this._funksions.fTextAlign(this.subTitle, 'left');

    /*--- Photo containers animation ---*/
    /* this._mondrianAnim.fTranslateAnim                (elem,         tym,      xp,     yp,     zp,      w,       h,  alfa); */
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[0],   this.tym1,    -171,     60,    120,    300,     390,     1); // jtns
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[1],   this.tym1,     160,    295,    200,    300,     310,     1); // ownphones
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[2],   this.tym1,    -181,    387,    110,    460,     370,     1); // misc
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[3],   this.tym1,    -252,    738,    100,    432,     522,     1); // illustrations
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[4],   this.tym1,     214,    545,    105,    442,     422,     1); // filipinas
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[5],   this.tym1,     215,    930,    100,    510,     380,     1); // akon

    /*--- Photos animation ---*/
    /* this._mondrianAnim.backgroundImageTransform(       elem,          tym,              w,             h,      bgSize,      hPos,       vPos):---*/
    this._mondrianAnim.backgroundImageTransform(this.fotoId[0],    this.tym2,      fotoWidth,    fotoHeight,     'cover',      '0%',      '37%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[1],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[2],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '30%',       '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[3],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[4],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '50%',       '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[5],    this.tym2,      fotoWidth,    fotoHeight,     'cover',     '20%',      '20%');

  }

  public largeScrnSliderAnim() {
    // console.clear();
    console.log('largeScrnSliderAnim(innerwidth): ', window.innerWidth);
    const fotoWidth = '100%';
    const fotoHeight = '120%'; // %
    const xpos = 498;
    const ypos = 150;

    /*--- Resize layout container: Used to position all content within ---*/
    this._funksions.fElementWidth(this.rlgKontentKontainerId, this.iPadPro.width);

    /*--- Main Container placements ---*/
    /* this._mondrianAnim.fTranslateAnim             (elem,       tym,  xp,     yp,    zp,        w,        h,  fontSize, alfa); */
    this._mondrianAnim.fTranslateAnim(this.mainKontainerId, this.tym3,   0,      0,   100,   'auto',  '100vh',    'null',    1);

    /*--- Modal button visibility ---*/
    this._funksions.fTMXVisibility(this.rlgButtonKontainer, 1, 'visible');
    this._funksions.fTMXfontSize(this.buttonLabel, 1, '1.2em');

    /*--- Title and sub-title animation to place ---*/
    /* this._mondrianAnim.fTranslateAnim             (elem,       tym,      xp,   yp,    zp,     w,     h,  fontSize, alfa); */
    this._mondrianAnim.fTranslateAnim(this.titleContainerId, this.tym3,   -190,  140,   100,   400,   100,    '20px',    1);
    this._mondrianAnim.fTranslateAnim(this.subTitleId,       this.tym3,      0,    0,   100,   400,   100,    '.9em',    1);
    this._funksions.fTextAlign(this.title,    'right');
    this._funksions.fTextAlign(this.subTitle, 'right');

    /*--- Photo containers placements ---*/
    /* this._mondrianAnim.fTranslateAnim2               (elem,         tym,      xp,     yp,     zp,      w,       h,  alfa); */
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[0],   this.tym1,    -159,    250,    100,    287,     243,     1); // jtns
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[1],   this.tym1,    -160,    518,    200,    383,     236,     1); // ownphones
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[2],   this.tym1,     486,    487,    130,    287,     243,     1); // misc
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[3],   this.tym1,    -488,    450,    150,    291,     335,     1); // illus
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[4],   this.tym1,     202,    110,    100,    387,     300,     1); // finas
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[5],   this.tym1,     234,    436,    120,    450,     363,     1); // akon

    /*--- Photos placements ---*/
    /* this._mondrianAnim.backgroundImageTransform(       elem,          tym,               w,             h,           bgSize,      hPos,       vPos):---*/
    this._mondrianAnim.backgroundImageTransform(this.fotoId[0],    this.tym2,       fotoWidth,    fotoHeight,     '100%, auto',     '45%',    '-15px');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[1],    this.tym2,       fotoWidth,    fotoHeight,          'cover',     '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[2],    this.tym2,       fotoWidth,    fotoHeight,     '200%, auto',     '90%',      '29%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[3],    this.tym2,       fotoWidth,    fotoHeight,          'cover',     '0px',      '0px');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[4],    this.tym2,       fotoWidth,    fotoHeight,          'cover',     '0px',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[5],    this.tym2,       fotoWidth,    fotoHeight,          'cover',     '30%',      '20%');
  }

  /*---- MatchMedia queries ----*/
  public fResizeMedia() {
    // console.clear();
    // this.innerWidth = window.innerWidth;
    // console.log(':---------------------------:');
    // console.log('window.innerWidth: ', window.innerWidth);
    // console.log('window.innerHeight: ', window.innerHeight);
    // console.log('screen.width: ', screen.width);
    // console.log('screen.height: ', screen.height);

    if (window.matchMedia('(max-width: 799px)').matches) {
      console.log('(max-width: 799px)');
        this.iPhoneXVertical();

    } else if (window.matchMedia('(max-width: 1020px)').matches) {
    // } else if (window.matchMedia('(min-width: 800px) and (max-width: 1020px)').matches) {
      if (window.matchMedia('(max-height: 400px)').matches) {
        console.log('(min-width: 800px) and (max-width: 1020px) and (max-height: 400px)');
        this.iPhoneXWide();
      } else if (window.matchMedia('(min-height: 400px)').matches) {
        console.log('(min-width: 800px) and (max-width: 1020px) and (min-height: 400px)');
        this.i812Vertical();
      }

    } else if (window.matchMedia('(max-width: 1365px)').matches) {
    // } else if (window.matchMedia('(min-width: 1021px) and (max-width: 1365px)').matches) {
      if (window.matchMedia('(max-height: 768px)').matches) {
        console.log('(min-width: 1021px) and (max-width: 1365px) and (max-height: 768px)');
        this.iPadWide();
      } else if (window.matchMedia('(min-height: 768px)').matches) {
        console.log('(min-width: 1021px) and (max-width: 1365px) and (min-height: 768px)');
        this.iPadProVertical();
      }

    } else {
    // } else if (window.matchMedia('(min-width: 1366px)').matches) {
      // document.body.style.backgroundColor = 'purple';
      this.largeScrnSliderAnim();
    }
  }

  /*---- Screen Resize ----*/
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // this.fResizeMe();
    // this.fResizeMedia();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    // console.log('You scrolled!');
    // this.fTestScroll();
  }

  /*---- Opening Modal: trigger in HTML ----*/
  public fOpenModal(
                    xId,
                    pathImg,
                    img,
                    title,
                    subTitle,
                    description,
                    orientation,
                    variation,
                    links,
                    variedProjects): void {
    const dialogRef = this._popUp.open(PopUpComponent, {
      maxWidth: this.modalWidthVW,
      height: this.modalHeightVH,
      data: { // param name: interface type
          imgPath: pathImg,
          imahe: img,
          xId: xId,
          titolo: title,
          subTitle: subTitle,
          deskription: description,
          orientation: orientation,
          variation: variation,
          linx: links,
          variedProjects2: variedProjects
        },
        /*---| Customizing the Material Modal Box.
        ".custom-modalbox" should be at the global scoped
        (not defined in the component styles )|---*/
        panelClass: 'custom-modalbox',
        autoFocus: false
          // escapeToClose: this.isEscapeToClose,
          // clickOutsideToClose: this.isClickOutsideToClose,
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Closed : ${title} modal. ••••••`);
      // this._carousel.commonCounter = 0;
      // console.log(`Common Counter Value : ${this._carousel.commonCounter}.`);
      result =  title;
      this.dialogResult = result; // `Closed : ${title} modal. ••••••`; // result;
      // reset pop-up datas
    });

  }

}
