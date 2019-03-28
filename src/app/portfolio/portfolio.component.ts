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
  public photoLayoutContainerId = '#rlg-kontainer-id';
  public fotoInfoKontainer = '.photo-info-kontainer';
  public showPhotoInfo: boolean;
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

  /*---= Timer =----*/
  public timeout = 2000;
  public tym1 = .5;
  public tym2 = .5;
  public tym3 = .5;

  /*-= Media queries variables =----*/
  // public screenWidth: number = window.innerWidth;
  public modalWidthVW = '90vw';
  public modalHeightVH = '90vh';
  public innerWidth: any = window.innerWidth;
  public largeScreen = 1300;
  public mediumScreen = 850;
  public smallScreen = 600;

  /*---=| Landscape mode |=---*/
  public iPhone6 =  { 'width': 667,   'height': 375};
  public iPhoneX =  { 'width': 812,   'height': 375};
  public iPad =     { 'width': 1024,  'height': 768};
  public iPadPro =  { 'width': 1366,  'height': 1024};

  public scrnW: any;

  // test
  // public titleBarKontainer = ('.title-bar-kontainer');
  // public titleBarId = ('titleBarId');


  /*--===| rxjs: subscription |===--*/
  public subsPortfolio: Subscription;

  /*-= Error variables =----*/
  public errorMsg;

  public dialogResult: string;

  constructor(private _portfolioDataService: PortfolioDataService,
              private _popUp: MatDialog,
              private _funksions: FunksionsService,
              private _mondrianAnim: MondrianAnimService) { }

  ngOnInit() {
    console.log('portfolio.ngOnInit()');

    /*---=|••• OBSERVABLE •••|=---*/
    this.subsPortfolio = this._portfolioDataService.portfolioData()
    .subscribe(data => {
      this.aAllData = data; // populate aAllData array with all the data
      this._funksions.fDisplay(this.loadingKontainer, 'flex'); // show loader
      this._funksions.fLoadTimer(this.loading, this.timeout); // simulating text percentage loading

      /*--= Populating arrays =--*/
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        this.photoKontainer[this.photoKontainer.length] = '#' + element.kontainerId; // push
        this.fotoId[this.fotoId.length] = '#' + element.imageId; // push
      }
    },
      error => this.errorMsg = this.fError());

      // this.showMainKontainer = false;
      // // this._funksions.fDisplay(this.mainKontainerId, 'none');
      // // this.fSHowHideMainKontainer();

      // /*--= Triggering fResizeMedia on enter =--*/
      // setTimeout(() => {
      //   // this.fResizeMe();
      //   // this._funksions.fDisplay(this.mainKontainerId, 'none');
      //   this.showMainKontainer = true;
      //   // this.fResizeMedia();
      // }, this.timeout); // 100 this.timeout



      /*--===| fShowHideTopNav |===--*/
    // this._funksions.fShowHideTopNav(this.titleBarId, '-20', '-100');

  }


  // public fSHowHideMainKontainer() {
  //   if (this.showMainKontainer) {
  //     this._funksions.fDisplay(this.mainKontainerId, 'none');
  //     this.fResizeMedia();
  //   } else {

  //   }
  // }

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
    /*---= Same as Window.onload =---*/
    setTimeout(() => {
      this._funksions.fRemoveLoader(this.loadingKontainer, 'none', .5); // remove loader
      this._funksions.fDisplay(this.mainKontainerId, 'flex'); // display mainKontainerId
      this.fResizeMedia(); // get specific media query for the current screen size (width mostly)
    }, this.timeout);
  }

  /*-----= TEST: Getting scroll to work inside Material Modal =-----*/
  public fTestScroll() {
    const content = document.querySelector('#titleBarId');
    const scroll$ = fromEvent(content, 'scroll').pipe(map(() => content));

    scroll$.subscribe(element => {
      // do whatever
      console.log('|-----= ngAfterViewInit() Porfolio =-----|');
      // this._funksions.fShowHideTopNav(content, '-20', '100');
    });
  }

  /*-----= ************************************************ =-----*/

  public iPhoneXVertical() {
    // console.log('iPhoneXWide(innerwidth): ', window.innerWidth);

    const fotoWidth = '100%';
    const fotoHeight = 120;

    /*--- Resize layout container: Used to position all content within ---*/
    this._funksions.fElementWidth(this.photoLayoutContainerId, this.iPhoneX.height);

    /*--- Main Container placements ---*/
    /* this._mondrianAnim.fTranslateAnim2            (elem,       tym,  xp,     yp,    zp,        w,        h,  fontSize, alfa); */
    this._mondrianAnim.fTranslateAnim(this.mainKontainerId, this.tym3,   0,      10,   100,   'auto',  '100vh',    'null',    1);

    /*--- Modal button visibility ---*/
    this._mondrianAnim.fTMXVisibility(this.rlgButtonKontainer, 1, 'visible');
    this._mondrianAnim.fTMXfontSize(this.buttonLabel, 1, '.8em');

    //                               (elem,                  tym,  xp,     yp,    zp,        w,        h,  fontSize, alfa);
    // this._mondrianAnim.fTranslateAnim(this.rlgButtonKontainer, 1,   0,     10,    100,    'auto',   'auto',    'null',    1);

    /*--- Title and sub-title animation to place ---*/
    /* this._mondrianAnim.fTranslateAnim              (elem,       tym,     xp,  yp,     zp,     w,      h,  fontSize, alfa); */
    this._mondrianAnim.fTranslateAnim(this.titleContainerId, this.tym3,     34,  40,    100,   210,    100,    '12px',    1);
    this._mondrianAnim.fTranslateAnim(this.subTitleId,       this.tym3,   0,    0,   100,   350,   100,  '.9em',  1);
    this._funksions.fTextAlign(this.title, 'left');
    this._funksions.fTextAlign(this.subTitle, 'left');

    /*--- Photo containers animation ---*/
    /* this._mondrianAnim.fTranslateAnim                (elem,         tym,    xp,     yp,     zp,      w,       h,  alfa); */
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[0],   this.tym1,    60,     100,    200,    200,     253,     1); // jtns
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[1],   this.tym1,    20,     354,    180,    283,     187,     1); // ownphones
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[2],   this.tym1,     0,     540,    160,    244,     189,     1); // misc
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[3],   this.tym1,   100,     733,    140,    212,     302,     1); // illustrations
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[4],   this.tym1,     0,    1000,    120,    350,     252,     1); // filipinas
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[5],   this.tym1,    30,    1257,    100,    285,     285,     1); // akon

    /*--- Photos animation ---*/
    /* this._mondrianAnim.backgroundImageTransform(    element,          tym,              w,                   h,      bgSize,      hPos,      vPos):---*/
    this._mondrianAnim.backgroundImageTransform(this.fotoId[0],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',      '0%',      '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[1],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',     '50%',     '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[2],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',     '30%',      '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[3],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',     '50%',     '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[4],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',     '50%',      '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[5],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',     '20%',     '20%');

  }

  public iPhoneXWide() {
    // console.log('iPhoneXWide(innerwidth): ', window.innerWidth);

    const fotoWidth = '100%';
    const fotoHeight = 120;

    /*--- Resize layout container: Used to position all content within ---*/
    this._funksions.fElementWidth(this.photoLayoutContainerId, this.iPhoneX.width);

    /*--- Main Container placements ---*/
    /* this._mondrianAnim.fTranslateAnim2            (elem,       tym,  xp,     yp,    zp,        w,        h,  fontSize, alfa); */
    this._mondrianAnim.fTranslateAnim(this.mainKontainerId, this.tym3,   0,      10,   100,   'auto',  '100vh',    'null',    1);

    /*--- Modal button visibility ---*/
    this._mondrianAnim.fTMXVisibility(this.rlgButtonKontainer, 1, 'visible');
    this._mondrianAnim.fTMXfontSize(this.buttonLabel, 1, '.8em');

    //                               (elem,                  tym,  xp,     yp,    zp,        w,        h,  fontSize, alfa);
    // this._mondrianAnim.fTranslateAnim(this.rlgButtonKontainer, 1,   0,     10,    100,    'auto',   'auto',    'null',    1);

    /*--- Title and sub-title animation to place ---*/
    /* this._mondrianAnim.fTranslateAnim              (elem,   tym,     xp,  yp,     zp,     w,      h,  fontSize, alfa); */
    this._mondrianAnim.fTranslateAnim(this.titleContainerId,   .25,    578,  80,    100,   210,    100,    '12px',    1);
    this._mondrianAnim.fTranslateAnim(this.subTitleId,       this.tym3,   0,    0,   100,   350,   100,  '.9em',  1);
    this._funksions.fTextAlign(this.title, 'left');
    this._funksions.fTextAlign(this.subTitle, 'left');

    /*--- Photo containers animation ---*/
    /* this._mondrianAnim.fTranslateAnim                (elem,         tym,    xp,     yp,     zp,      w,       h,  alfa); */
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[0],   this.tym1,    35,     10,    205,    200,     120,     1); // jtns
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[1],   this.tym1,    16,    119,    200,    283,     187,     1); // ownphones
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[2],   this.tym1,   214,     27,    210,    171,     123,     1); // misc
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[3],   this.tym1,   405,     65,    250,    148,     183,     1); // illustrations
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[4],   this.tym1,   520,    140,    100,    242,     152,     1); // filipinas
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[5],   this.tym1,   281,    152,    100,    250,     170,     1); // akon

    /*--- Photos animation ---*/
    /* this._mondrianAnim.backgroundImageTransform(    element,          tym,              w,                   h,      bgSize,      hPos,      vPos):---*/
    this._mondrianAnim.backgroundImageTransform(this.fotoId[0],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',      '0%',      '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[1],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',     '50%',     '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[2],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',     '30%',      '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[3],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',     '50%',     '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[4],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',     '50%',      '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[5],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',     '20%',     '20%');

  }

  public iPadWide() {
    // console.log('iPadWide(innerwidth): ', window.innerWidth);
    const iPad1024 = this.iPad.width;

    const fotoWidth = '100%';
    const fotoHeight = 120;

    /*--- Resize layout container: Used to position all content within ---*/
    this._funksions.fElementWidth(this.photoLayoutContainerId, iPad1024);

    /*--- Main Container placements ---/
          this._mondrianAnim.fTranslateAnim2      (element,        tym,  xp,  yp,   zp,        w,        h,   fontSize,    alfa); =---*/
    this._mondrianAnim.fTranslateAnim(this.mainKontainerId,  this.tym3,  80,  10,  100,   'auto',  '100vh',     'null',       1);

    /*--- Modal button visibility ---*/
    this._mondrianAnim.fTMXVisibility(this.rlgButtonKontainer, 1, 'visible');
    this._mondrianAnim.fTMXfontSize(this.buttonLabel, 1, '1.2em');

    /*--- Title and sub-title animation to place ---*/
    /* this._mondrianAnim.fTranslateAnim              (elem,       tym,     xp,  yp,     zp,            w,              h,    fontSize, alfa); */
    this._mondrianAnim.fTranslateAnim(this.titleContainerId, this.tym3,    461,  28,    100,   350,    100,    '18px', 1);
    this._funksions.fTextAlign(this.title, 'left');
    this._funksions.fTextAlign(this.subTitle, 'left');

    /*--- Photo containers animation ---*/
    /* this._mondrianAnim.fTranslateAnim                (elem,         tym,     xp,     yp,     zp,      w,       h,  alfa); */
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[0],   this.tym1,    137,     10,    100,    300,     190,     1); // jtns
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[1],   this.tym1,     72,    222,    200,    300,     220,     1); // ownphones
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[2],   this.tym1,    -45,    387,    110,    370,     320,     1); // misc
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[3],   this.tym1,    395,    118,    100,    292,     292,     1); // illustrations
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[4],   this.tym1,    320,    434,    100,    572,     292,     1); // filipinas
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[5],   this.tym1,    670,    220,    100,    200,     220,     1); // akon

    /*--- Photos animation ---*/
    /* this._mondrianAnim.backgroundImageTransform(    element,          tym,              w,                   h,      bgSize,      hPos,       vPos): =---*/
    this._mondrianAnim.backgroundImageTransform(this.fotoId[0],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',      '0%',      '37%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[1],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',     '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[2],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',     '30%',       '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[3],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',     '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[4],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',     '50%',      '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[5],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',     '20%',      '20%');
  }

  public iPadProVertical() {
    // console.log('iPadProVertical(innerwidth): ', window.innerWidth);

    const iPadPro1024 = this.iPadPro.height;
    const fotoWidth = '100%';
    const fotoHeight = 120;

    /*--- Resize layout container: Used to position all content within ---*/
    this._funksions.fElementWidth(this.photoLayoutContainerId, iPadPro1024);

    /*--- Main Container placements ---/
          this._mondrianAnim.fTranslateAnim2            (elem,       tym,  xp,     yp,    zp,        w,        h,  fontSize, alfa); =---*/
    this._mondrianAnim.fTranslateAnim(this.mainKontainerId, this.tym3,   80,      10,   100,   'auto',  '100vh',    'null',    1);

    /*--- Modal button visibility ---*/
    this._mondrianAnim.fTMXVisibility(this.rlgButtonKontainer, 1, 'visible');
    this._mondrianAnim.fTMXfontSize(this.buttonLabel, 1, '1.2em');

    /*--- Title and sub-title animation to place ---*/
    /* this._mondrianAnim.fTranslateAnim              (elem,       tym,     xp,  yp,     zp,      w,      h,   fontSize,   alfa); */
    this._mondrianAnim.fTranslateAnim(this.titleContainerId, this.tym3,    456,  174,    100,   350,    100,     '22px',      1);
    this._funksions.fTextAlign(this.title, 'left');
    this._funksions.fTextAlign(this.subTitle, 'left');

    /*--- Photo containers animation ---*/
    /* this._mondrianAnim.fTranslateAnim                (elem,         tym,     xp,     yp,     zp,      w,       h,  alfa); */
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[0],   this.tym1,    119,     60,    120,    300,     390,     1); // jtns
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[1],   this.tym1,    451,    295,    200,    300,     310,     1); // ownphones
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[2],   this.tym1,     25,    387,    110,    460,     370,     1); // misc
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[3],   this.tym1,    -34,    738,    100,    432,     522,     1); // illustrations
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[4],   this.tym1,    430,    545,    105,    442,     422,     1); // filipinas
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[5],   this.tym1,    387,    930,    100,    510,     380,     1); // akon

    /*--- Photos animation ---*/
    /* this._mondrianAnim.backgroundImageTransform(     elem,    tym,              w,                   h,      bgSize,        hPos,       vPos):---*/
    this._mondrianAnim.backgroundImageTransform(this.fotoId[0],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',      '0%',      '37%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[1],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',      '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[2],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',      '30%',       '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[3],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',      '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[4],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',        '50%',      '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[5],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',      '20%',      '20%');

  }

  public largeScrnSliderAnim() {
    const fotoWidth = '100%';
    const fotoHeight = 120; // %

    /*--- Resize layout container: Used to position all content within ---*/
    this._funksions.fElementWidth(this.photoLayoutContainerId, this.largeScreen);

    /*--- Main Container placements ---*/
    /* this._mondrianAnim.fTranslateAnim             (elem,       tym,  xp,     yp,    zp,        w,        h,  fontSize, alfa); */
    this._mondrianAnim.fTranslateAnim(this.mainKontainerId, this.tym3,   0,     140,   100,   'auto',  '100vh',    'null',    1);

    /*--- Modal button visibility ---*/
    this._mondrianAnim.fTMXVisibility(this.rlgButtonKontainer, 1, 'visible');
    this._mondrianAnim.fTMXfontSize(this.buttonLabel, 1, '1.2em');

    /*--- Title and sub-title animation to place ---*/
    this._mondrianAnim.fTranslateAnim(this.titleContainerId, this.tym3, 290,  -10,   100,   350,   100,  '20px',  1);
    this._mondrianAnim.fTranslateAnim(this.subTitleId,       this.tym3,   0,    0,   100,   350,   100,  '.9em',  1);
    this._funksions.fTextAlign(this.title,    'right');
    this._funksions.fTextAlign(this.subTitle, 'right');

    /*--- Photo containers placements ---*/
    /* this._mondrianAnim.fTranslateAnim2               (elem,         tym,     xp,     yp,     zp,      w,       h,  alfa); */
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[0],   this.tym1,    339,    100,    100,    287,     243,     1); // jtns
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[1],   this.tym1,    294,    368,    200,    383,     236,     1); // ownphones
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[2],   this.tym1,    984,    337,    130,    287,     243,     1); // misc
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[3],   this.tym1,     10,    300,    150,    291,     335,     1); // illus
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[4],   this.tym1,    650,    -40,    100,    387,     300,     1); // finas
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[5],   this.tym1,    650,    286,    120,    450,     363,     1); // akon

    /*--- Photos placements ---*/
    /* this._mondrianAnim.backgroundImageTransform(     elem,          tym,               w,                   h,      bgSize,         hPos,       vPos):---*/
    this._mondrianAnim.backgroundImageTransform(this.fotoId[0],    this.tym2,       fotoWidth,    fotoHeight + '%',     '100%, auto',   '45%',    '-15px');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[1],    this.tym2,       fotoWidth,    fotoHeight + '%',     'cover',        '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[2],    this.tym2,       fotoWidth,    fotoHeight + '%',     '200%, auto',   '90%',      '29%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[3],    this.tym2,       fotoWidth,    fotoHeight + '%',     'cover',        '0px',    '0px');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[4],    this.tym2,       fotoWidth,    fotoHeight + '%',     'cover',        '0px',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[5],    this.tym2,       fotoWidth,    fotoHeight + '%',     'cover',        '30%',      '20%');
  }

  public smallestScreen() {

    const scrn375 = this.iPhoneX.height;
    const zed = 100;
    const fontSize = '18px';
    const cardWidth = 350;

    const cardPadding = 8;
    const cardCenter = (scrn375 / 2) - (cardWidth / 2) - cardPadding;
    const fotoWidth = '100%';

    const titleWidth = 350;
    const titleHeight = 60;

    const cardBottomPadding = 30;

    const cardHeight0 = 750;
    const cardHeight1 = 630;
    const cardHeight2 = 700;
    const cardHeight3 = 930;
    const cardHeight4 = 720;
    const cardHeight5 = 530;

    const card0YPos = 90;
    const card1YPos = card0YPos + cardHeight0 + cardBottomPadding;
    const card2YPos = card1YPos + cardHeight1 + cardBottomPadding;
    const card3YPos = card2YPos + cardHeight2 + cardBottomPadding;
    const card4YPos = card3YPos + cardHeight3 + cardBottomPadding;
    const card5YPos = card4YPos + cardHeight4 + cardBottomPadding;

    /*--- Resize layout container: Used to position all content within ---*/
    this._funksions.fElementWidth(this.photoLayoutContainerId, scrn375);

    /*--- Main Container placements ---*/
    /* this._mondrianAnim.fTranslateAnim2            (elem,       tym,  xp,     yp,    zp,        w,        h,  fontSize, alfa); */
    this._mondrianAnim.fTranslateAnim(this.mainKontainerId, this.tym3,   0,     10,   zed,   'auto',  '100vh',    'null',    1);

    /*--- Modal button visibility ---*/
    this._mondrianAnim.fTMXVisibility(this.rlgButtonKontainer, 1, 'hidden');
    this._mondrianAnim.fTMXfontSize(this.buttonLabel, 1, '.5em');

    /*--- Title and sub-title animation ---*/
    /* this._mondrianAnim.fTranslateAnim              (elem,         tym,           xp,      yp,     zp,            w,             h,    fontSize, alfa); */
    this._mondrianAnim.fTranslateAnim(this.titleContainerId,   this.tym3,   cardCenter,       0,    zed,    titleWidth,  titleHeight,    fontSize,    1);
    this._funksions.fTextAlign(this.title, 'left');
    this._funksions.fTextAlign(this.subTitle, 'left');

    /*--- Photo containers animation ---*/
    /* this._mondrianAnim.fTranslateAnim2               (elem,         tym,           xp,              yp,     zp,            w,              h,  alfa); */
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[0],   this.tym1,   cardCenter,       card0YPos,    zed,    cardWidth,     cardHeight0,     1); // jtns
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[1],   this.tym1,   cardCenter,       card1YPos,    200,    cardWidth,     cardHeight1,     1); // ownphones
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[2],   this.tym1,   cardCenter,       card2YPos,    zed,    cardWidth,     cardHeight2,     1); // misc
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[3],   this.tym1,   cardCenter,       card3YPos,    110,    cardWidth,     cardHeight3,     1); // illustrations
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[4],   this.tym1,   cardCenter,       card4YPos,    zed,    cardWidth,     cardHeight4,     1); // filipinas
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[5],   this.tym1,   cardCenter,       card5YPos,    120,    cardWidth,     cardHeight5,     1); // akon

    /*--- Photos animation ---*/
    /* this._mondrianAnim.backgroundImageTransform(     elem,         tym,              w,                   h,      bgSize,          hPos,      vPos):---*/
    this._mondrianAnim.backgroundImageTransform(this.fotoId[0],   this.tym2,      fotoWidth,             '300px',     'cover',         '20%',      '10%');  // jtns
    this._mondrianAnim.backgroundImageTransform(this.fotoId[1],   this.tym2,      fotoWidth,             '300px',     'cover',         '50%',      '20%');  // ownphones
    this._mondrianAnim.backgroundImageTransform(this.fotoId[2],   this.tym2,      fotoWidth,             '450px',     'cover',          '0%',       '0%');  // misc
    this._mondrianAnim.backgroundImageTransform(this.fotoId[3],   this.tym2,      fotoWidth,             '710px',     'cover',         '50%',       '5%');  // illustrations
    this._mondrianAnim.backgroundImageTransform(this.fotoId[4],   this.tym2,      fotoWidth,             '310px',     'cover',         '20%',      '10%');  // filipinas
    this._mondrianAnim.backgroundImageTransform(this.fotoId[5],   this.tym2,      fotoWidth,             '300px',     'cover',          '0%',       '0%');  // akon

  }

  public smlScrnSliderAnim() {
    const zed = 100;
    const fontSize = '18px';
    const cardWidth = 450;
    // const cardHeight = '100%';
    // const cardUnoYPos = 90;
    // const cardYPos = 600; // cardHeight + 30;
    const cardPadding = 8;
    const cardCenter = (this.smallScreen / 2) - (cardWidth / 2) - cardPadding;
    const fotoWidth = '100%';
    // const fotoHeight = 30; // %
    // const fotoInfoHeight = '40%';
    const titleWidth = 450;
    const titleHeight = 60;

    const cardBottomPadding = 30;

    const cardHeight0 = 650;
    const cardHeight1 = 530;
    const cardHeight2 = 600;
    const cardHeight3 = 830;
    const cardHeight4 = 620;
    const cardHeight5 = 530;

    const card0YPos = 90;
    const card1YPos = card0YPos + cardHeight0 + cardBottomPadding;
    const card2YPos = card1YPos + cardHeight1 + cardBottomPadding;
    const card3YPos = card2YPos + cardHeight2 + cardBottomPadding;
    const card4YPos = card3YPos + cardHeight3 + cardBottomPadding;
    const card5YPos = card4YPos + cardHeight4 + cardBottomPadding;

    // console.log('this.popUpImages[0]: ', this.popUpImages[0]);
    // this.showMainKontainer = true;
    /*--- Resize layout container: Used to position all content within ---*/
    this._funksions.fElementWidth(this.photoLayoutContainerId, this.smallScreen);

    /*--- Main Container placements ---*/
    /* this._mondrianAnim.fTranslateAnim2            (elem,       tym,  xp,     yp,    zp,        w,        h,  fontSize, alfa); */
    this._mondrianAnim.fTranslateAnim(this.mainKontainerId, this.tym3,   0,     10,   zed,   'auto',  '100vh',    'null',    1);

    this._mondrianAnim.fTMXVisibility(this.rlgButtonKontainer, 1, 'hidden');
    /*--- Title and sub-title animation ---*/
    /* this._mondrianAnim.fTranslateAnim              (elem,         tym,           xp,      yp,     zp,            w,             h,    fontSize, alfa); */
    this._mondrianAnim.fTranslateAnim(this.titleContainerId,   this.tym3,   cardCenter,       0,    zed,    titleWidth,  titleHeight,    fontSize,    1);
    this._funksions.fTextAlign(this.title, 'left');
    this._funksions.fTextAlign(this.subTitle, 'left');

    /*--- Photo containers animation ---*/
    /* this._mondrianAnim.fTranslateAnim2               (elem,         tym,           xp,              yp,     zp,            w,              h,  alfa); */
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[0],   this.tym1,   cardCenter,       card0YPos,    zed,    cardWidth,     cardHeight0,     1);
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[1],   this.tym1,   cardCenter,       card1YPos,    200,    cardWidth,     cardHeight1,     1);
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[2],   this.tym1,   cardCenter,       card2YPos,    zed,    cardWidth,     cardHeight2,     1);
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[3],   this.tym1,   cardCenter,       card3YPos,    110,    cardWidth,     cardHeight3,     1);
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[4],   this.tym1,   cardCenter,       card4YPos,    zed,    cardWidth,     cardHeight4,     1);
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[5],   this.tym1,   cardCenter,       card5YPos,    120,    cardWidth,     cardHeight5,     1);

    /*--- Photos animation ---*/
    /* this._mondrianAnim.backgroundImageTransform(     elem,         tym,              w,                   h,      bgSize,          hPos,      vPos):---*/
    this._mondrianAnim.backgroundImageTransform(this.fotoId[0],   this.tym2,      fotoWidth,             '300px',     'cover',         '20%',     '10%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[1],   this.tym2,      fotoWidth,             '300px',     'cover',         '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[2],   this.tym2,      fotoWidth,             '450px',     'cover',          '0%',       '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[3],   this.tym2,      fotoWidth,             '710px',     'cover',         '90%',       '5%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[4],   this.tym2,      fotoWidth,             '310px',     'cover',         '20%',      '10%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[5],   this.tym2,      fotoWidth,             '300px',     'cover',          '0%',       '0%');

  }

  public medScrnSliderAnim() {
    // this.showMainKontainer = true;
    const zed = 100;
    const fontSize = '18px';
    const titleWidth = 350;
    const titleHeight = 100;

    const fotoWidth = '100%';
    const fotoHeight = 120; // %

    /* leftSpace additional space for positioning cards */
    const leftSpace = -80;

    /*--- Resize layout container: Used to position all content within ---*/
    this._funksions.fElementWidth(this.photoLayoutContainerId, this.mediumScreen);

    /*--- Main Container placements ---*/
    /* this._mondrianAnim.fTranslateAnim2            (elem,       tym,  xp,     yp,    zp,        w,        h,  fontSize, alfa); */
    this._mondrianAnim.fTranslateAnim(this.mainKontainerId, this.tym3,   0,      10,   zed,   'auto',  '100vh',    'null',    1);

    this._mondrianAnim.fTMXVisibility(this.rlgButtonKontainer, 1, 'visible');
    /*--- Title and sub-title animation to place ---*/
    /* this._mondrianAnim.fTranslateAnim              (elem,       tym,                 xp,  yp,     zp,            w,              h,    fontSize, alfa); */
    this._mondrianAnim.fTranslateAnim(this.titleContainerId, this.tym3,    461 + leftSpace,  28,    zed,   titleWidth,    titleHeight,    fontSize, 1);
    this._funksions.fTextAlign(this.title, 'left');
    this._funksions.fTextAlign(this.subTitle, 'left');
    // console.log(this.photoKontainer[0]);
    // console.log(this.fotoId[0]);
    /*--- Photo containers animation ---*/
    /* this._mondrianAnim.fTranslateAnim                (elem,         tym,                 xp,     yp,     zp,      w,       h,  alfa); */
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[0],   this.tym1,    137 + leftSpace,     10,    zed,    300,     190,     1);
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[1],   this.tym1,     83 + leftSpace,    222,    200,    383,     243,     1);
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[2],   this.tym1,     50 + leftSpace,    460,    zed,    387,     443,     1);
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[3],   this.tym1,    460 + leftSpace,    118,    zed,    292,     443,     1);
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[4],   this.tym1,    460 + leftSpace,    585,    zed,    572,     292,     1);
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[5],   this.tym1,    740 + leftSpace,    310,    zed,    250,     290,     1);

    /*--- Photos animation ---*/
    /* this._mondrianAnim.backgroundImageTransform(     elem,    tym,              w,                   h,      bgSize,        hPos,       vPos):---*/
    this._mondrianAnim.backgroundImageTransform(this.fotoId[0],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',      '0%',      '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[1],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',      '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[2],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',      '30%',       '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[3],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',      '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[4],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',        '50%',      '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[5],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',      '20%',      '20%');

  }

  public iPhoneXscreen() {
    // console.log('iPhoneXscreen(innerwidth): ', window.innerWidth);

    const zed = 100;
    const fontSize = '18px';
    const titleWidth = 350;
    const titleHeight = 100;

    const fotoWidth = '100%';
    const fotoHeight = 120; // %

    /* leftSpace additional space for positioning cards */
    const leftSpace = -80;

    /*--- Resize layout container: Used to position all content within ---*/
    this._funksions.fElementWidth(this.photoLayoutContainerId, this.iPhoneX.width);

    /*--- Main Container placements ---*/
    /* this._mondrianAnim.fTranslateAnim2            (elem,       tym,  xp,     yp,    zp,        w,        h,  fontSize, alfa); */
    this._mondrianAnim.fTranslateAnim(this.mainKontainerId, this.tym3,   0,      10,   zed,   'auto',  '100vh',    'null',    1);

    /*--- Title and sub-title animation to place ---*/
    /* this._mondrianAnim.fTranslateAnim              (elem,       tym,                 xp,  yp,     zp,            w,              h,    fontSize, alfa); */
    this._mondrianAnim.fTranslateAnim(this.titleContainerId, this.tym3,    461 + leftSpace,  28,    zed,   titleWidth,    titleHeight,    fontSize, 1);
    this._funksions.fTextAlign(this.title, 'left');
    this._funksions.fTextAlign(this.subTitle, 'left');

    /*--- Photo containers animation ---*/
    /* this._mondrianAnim.fTranslateAnim                (elem,         tym,                 xp,     yp,     zp,      w,       h,  alfa); */
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[0],   this.tym1,    137 + leftSpace,     10,    zed,    300,     190,     1); // jtns
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[1],   this.tym1,     83 + leftSpace,    222,    200,    383,     243,     1); // ownphones
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[2],   this.tym1,     50 + leftSpace,    460,    zed,    387,     443,     1); // misc
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[3],   this.tym1,    460 + leftSpace,    118,    zed,    292,     443,     1); // illustrations
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[4],   this.tym1,    460 + leftSpace,    585,    zed,    572,     292,     1); // filipinas
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[5],   this.tym1,    740 + leftSpace,    310,    zed,    250,     290,     1); // akon

    /*--- Photos animation ---*/
    /* this._mondrianAnim.backgroundImageTransform(     elem,    tym,              w,                   h,      bgSize,        hPos,       vPos):---*/
    this._mondrianAnim.backgroundImageTransform(this.fotoId[0],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',      '0%',      '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[1],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',      '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[2],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',      '30%',       '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[3],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',      '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[4],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',        '50%',      '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[5],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',      '20%',      '20%');

  }



  /*---- MatchMedia queries ----*/
  public fResizeMedia() {
    this.innerWidth = window.innerWidth;

    if (window.matchMedia('(max-width: 799px)').matches) {
        // document.body.style.backgroundColor = 'green';
        this.iPhoneXVertical();
        // this.smallestScreen();
        this.showPhotoInfo = false; // true;

    } else if (window.matchMedia('(min-width: 800px) and (max-width: 1023px)').matches) {
      // document.body.style.backgroundColor = 'teal';
      this.iPhoneXWide();
      this.showPhotoInfo = false;

    } else if (window.matchMedia('(min-width: 1024px) and (max-width: 1365px)').matches) {
      this.showPhotoInfo = false;
      if (window.matchMedia('(max-height: 768px)').matches) {
        // document.body.style.backgroundColor = 'blue';
        this.iPadWide();
      } else if (window.matchMedia('(max-height: 1366px)').matches) {
        // document.body.style.backgroundColor = 'grey';
        this.iPadProVertical();
      }

    } else if (window.matchMedia('(min-width: 1366px)').matches) {
      // document.body.style.backgroundColor = 'purple';
      this.largeScrnSliderAnim();
      this.showPhotoInfo = false;
    }
  }

  /*---- Media queries ----*/

  // public fResizeMeX() {

  //   // this.scrnW = window.matchMedia('(max-width: 700px)');
  //   // this.fMediaMatchResize(this.scrnW); // Call listener function at run time
  //   // this.scrnW.addListener(this.fMediaMatchResize); // Attach listener function on state changes

  //   const iPhoneXscreen: any = this.iPhoneXscreen;

  //   /*----- Get viewportSize working! ----*/
  //   // this.innerWidth = viewportSize.getWidth(); // window.innerWidth;
  //   this.innerWidth = window.innerWidth;
  //   // console.log('this.innerWidth: ', this.innerWidth, ' --------=');

  //   // if ( this.innerWidth >= this.largeScreen ) { // >1300
  //   if ( this.innerWidth > 1300 ) { // >1300
  //     this.largeScrnSliderAnim();
  //     this.showPhotoInfo = false;
  //     // this._funksions.fDisplayAll(this.fotoInfoKontainer, 'none');
  //     // this._funksions.fDisplayAll(this.rlgButton, 'flex');
  //     // this.showOpenModalBtn = true;

  //   } else if ( this.innerWidth <= 1300 && this.innerWidth > 1024 ) { // in between: <1300 & >1025
  //     this.medScrnSliderAnim();
  //     // this.iPadWide();
  //     this.showPhotoInfo = false;
  //     // this._funksions.fDisplayAll(this.fotoInfoKontainer, 'none');
  //     // this._funksions.fDisplayAll(this.rlgButton, 'flex');
  //     // this.showOpenModalBtn = true;

  //   } else if ( this.innerWidth <= 1024 && this.innerWidth > 812 ) { // 1024: iPad
  //     this.iPadWide();
  //     this.showPhotoInfo = false;
  //     // this.showOpenModalBtn = true;

  //   } else if ( this.innerWidth <= 812  - 1 && this.innerWidth > 667 ) { // 812: iPhoneX 667: iPhone6
  //     this.iPhoneXscreen();
  //     this.showPhotoInfo = false;
  //     // this.showOpenModalBtn = true;

  //   } else {
  //     // this.smlScrnSliderAnim();
  //     this.smallestScreen();
  //     this.showPhotoInfo = true;
  //     // this._funksions.fDisplayAll(this.fotoInfoKontainer, 'flex');
  //     // this._funksions.fDisplayAll(this.rlgButton, 'none');
  //     // this.showOpenModalBtn = false;
  //   }
  // }

  /*---- Screen Resize ----*/
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // this.fResizeMe();
    this.fResizeMedia();
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
