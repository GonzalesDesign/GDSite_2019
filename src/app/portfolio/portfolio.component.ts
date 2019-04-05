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

  /*---= Timer =----*/
  public timeout = 2000;
  public tym1 = .5;
  public tym2 = .5;
  public tym3 = .5;

  /*-= Media queries variables =----*/
  // public screenWidth: number = window.innerWidth;
  public modalWidthVW = '90vw';
  public modalHeightVH = '90vh';
  // public innerWidth: any = window.innerWidth;
  // public largeScreen = 1300;
  // public mediumScreen = 850;
  // public smallScreen = 600;

  /*---=| Apple devices |=---*/
  public iPhone6 =  {'width': 667,   'height': 375};
  public iPhoneX =  {'width': 812,   'height': 375};
  public iPad =     {'width': 1024,  'height': 768};
  public iPadPro =  {'width': 1366,  'height': 1024};

  // public scrnW: any;

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
    /*---= ngAfterViewInit: same as window.onload =---*/
    setTimeout(() => {
      this._funksions.fRemoveLoader(this.loadingKontainer, 'none', .5); // remove loader
      this._funksions.fDisplay(this.mainKontainerId, 'flex'); // display mainKontainerId
      this.fResizeMedia();
    }, this.timeout);
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

  public iPhoneXVertical() {
    // console.clear();
    console.log('iPhoneXVertical(innerwidth): ', window.innerWidth);
    console.log('iPhoneXVertical(screen.width): ', screen.width);
    const iPhoneXheight = this.iPhoneX.height;

    const fotoWidth = '100%';
    const fotoHeight = '120%';

    /*--- Resize layout container: Used to position all content within ---*/
    this._funksions.fElementWidth(this.rlgKontentKontainerId, iPhoneXheight);

    /*--- Main Container placements ---*/
    /* this._mondrianAnim.fTranslateAnim2            (elem,       tym,  xp,     yp,    zp,        w,        h,  fontSize, alfa); */
    this._mondrianAnim.fTranslateAnim(this.mainKontainerId, this.tym3,   0,      0,   100,   'auto',  '100vh',    'null',    1);

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
    const iPhoneXwidth = this.iPhoneX.width;

    const fotoWidth = '100%';
    const fotoHeight = '120%';
    // const xpos = 256;

    /*--- Main Container placements ---*/
    /* this._mondrianAnim.fTranslateAnim2            (elem,       tym,  xp,     yp,    zp,        w,        h,  fontSize, alfa); */
    this._mondrianAnim.fTranslateAnim(this.mainKontainerId, this.tym3,   0,      0,   100,   'auto',  '100vh',    'null',    1);

    /*--- Content container: Content wrapper ---*/
    this._funksions.fElementWidth(this.rlgKontentKontainerId, iPhoneXwidth);

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
    this._mondrianAnim.fTranslateAnim(this.titleContainerId, this.tym3,    176,  139,    100,   350,    100,     '20px',      1);
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

  public iPadWide() {
    // console.clear();
    console.log('iPadWide(innerwidth): ', window.innerWidth);
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
    this._mondrianAnim.fTranslateAnim(this.titleContainerId, this.tym3,    228,  28,    100,   350,    100,    '18px',     1);
    // this._mondrianAnim.fTranslateAnim(this.subTitleId,    this.tym3,       0,    0,    100,   350,    100,      '.9em',    1);
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
    this._mondrianAnim.fTranslateAnim(this.titleContainerId, this.tym3,    176,  174,    100,   350,    100,     '22px',      1);
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
    this._mondrianAnim.fTranslateAnim(this.titleContainerId, this.tym3,   -190,  140,   100,   350,   100,    '20px',    1);
    this._mondrianAnim.fTranslateAnim(this.subTitleId,       this.tym3,      0,    0,   100,   350,   100,    '.9em',    1);
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
    console.clear();
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
