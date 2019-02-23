import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { FunksionsService } from '../../services/funksions.service';
import { MondrianAnimService } from '../../services/mondrian-anim.service';
import { MatDialog } from '@angular/material';
import { PopUpComponent } from './pop-up/pop-up.component';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit, AfterViewInit {

  // @ViewChild('modKontTest') modKontTest;

  // public parentMessage = 'message from parent';

  public aAllData = [];
  public mainKontainerId = '#rlg-main-kontainer-id';
  public photoKontainer = [];
  public fotoId = [];
  // public aLinks = [];
  // public mainKontainerId = '#rlg-kontainer-id';
  /*-= Photo layout container: Holds all the image containers =----*/
  public photoLayoutContainerId = '#rlg-kontainer-id';
  public fotoInfoKontainer = '.photo-info-kontainer';
  public infoButton = '.rlg-button';
  /*-= Title variables =----*/
  public titleContainerId = '#title-kontainer-id';
  public subTitleId = '#sub-title-id';
  public title = '.title';
  public subTitle = '.sub-title';
  /*---= loader props =---*/
  public loading = '.loading';
  public loadingKontainer = '.loading-kontainer';
  /*---= Timer =----*/
  public timeout = 500;
  public tym1 = .5;
  public tym2 = .5;
  public tym3 = .5;
  /*-= Media queries variables =----*/
  // public screenWidth: number = window.innerWidth;
  public modalWidthVW = '90vw';
  public modalHeightVH = '90vh';
  public innerWidth: any = window.innerWidth;
  public largeScreen = 1300;
  public mediumScreen = 900;
  public smallScreen = 600;

  /*-= Varied Projects Variables =----*/
  // public aVariedProjects = [];

  /*-= Error variables =----*/
  public errorMsg;


  constructor(private _portfolioDataService: PortfolioDataService,
              private _popUp: MatDialog,
              private _funksions: FunksionsService,
              private _mondrianAnim: MondrianAnimService) { }

  ngOnInit() {
    /*---=|••• OBSERVABLE •••|=---*/
    this._portfolioDataService.portfolioData()
    .subscribe(data => {
      this.aAllData = data; // populate aAllData array with all the data
      this._funksions.fDisplay(this.loadingKontainer, 'flex'); // show loader
      this._funksions.fLoadTimer(this.loading, this.timeout); // simulating text percentage loading
      // console.log('this.aAllData: ', this.aAllData);
      // console.log('data: ', data);
      // this.photoKontainer.push('#' + data.id);

      /*--= Populating arrays =--*/
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        // this.photoKontainer.push('#' + element.kontainerId);
        // this.photoKontainer[this.photoKontainer.length] = '#fotoKontainer' + element.id; // push
        this.photoKontainer[this.photoKontainer.length] = '#' + element.kontainerId; // push: value has to correspond with the html ids
        this.fotoId[this.fotoId.length] = '#' + element.imageId; // push: value has to correspond with the html ids
        // console.log('element: ', element);
        // console.log('this.fotoId: ', this.fotoId);
        // console.log('this.photoKontainer[i]: ', this.photoKontainer[i], this.photoKontainer.length);
        // this.aLinks[this.aLinks.length] = element.links; // push
        // console.log('this.aLinks: ', this.aLinks);
        // console.log('element.title: ', data[2].title);
        // console.log('element.variedProjects: ', data[i].variedProjects);
      }
    },
      error => this.errorMsg = error); // ????????? Work on this error
      // console.log('Error!');
      this._funksions.fDisplay(this.mainKontainerId, 'none');
      /*--= Triggering resizeMe on enter =--*/
      setTimeout(() => {
        this.resizeMe();
      }, 100);

  }

  ngAfterViewInit() {
    setTimeout(() => {
      // this.fSliderInit();
      this._funksions.fRemoveLoader(this.loadingKontainer, 'none', .5); // remove loader
      this._funksions.fDisplay(this.mainKontainerId, 'flex'); // display mainKontainerId
      // this._funksions.fTLMx(this.mainKontainerId, this.imageNameKontainer); // animate images and titles
      this.resizeMe();
    }, this.timeout);
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

    /*--- Resize layout container: Used to position all content within ---*/
    this._funksions.fElementWidth(this.photoLayoutContainerId, this.smallScreen);

    /*--- Main Container placements ---*/
    /* this._mondrianAnim.fTranslateAnim2            (elem,       tym,  xp,     yp,    zp,        w,        h,  fontSize, alfa); */
    this._mondrianAnim.fTranslateAnim(this.mainKontainerId, this.tym3,   0,     10,   zed,   'auto',  '100vh',    'null',    1);

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
    // this._mondrianAnim.fTranslateAnim2(this.photoKontainer[6],   this.tym1,   cardCenter,   cardYPos * 6 + cardUnoYPos,    120,    cardWidth,     cardHeight,     1);
    // this._mondrianAnim.fTranslateAnim2(this.photoKontainer[7],   this.tym1,   cardCenter,   cardYPos * 7 + cardUnoYPos,    120,    cardWidth,     cardHeight,     1);
    // this._mondrianAnim.fTranslateAnim2(this.photoKontainer[8],   this.tym1,   cardCenter,   cardYPos * 8 + cardUnoYPos,    zed,    cardWidth,     cardHeight,     1);

    /*--- Photos animation ---*/
    /* this._mondrianAnim.backgroundImageTransform(     elem,         tym,              w,                   h,      bgSize,          hPos,      vPos):---*/
    this._mondrianAnim.backgroundImageTransform(this.fotoId[0],   this.tym2,      fotoWidth,             '300px',     'cover',         '20%',     '10%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[1],   this.tym2,      fotoWidth,             '300px',     'cover',         '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[2],   this.tym2,      fotoWidth,             '450px',     'cover',          '0%',       '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[3],   this.tym2,      fotoWidth,             '710px',     'cover',         '90%',       '5%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[4],   this.tym2,      fotoWidth,             '310px',     'cover',         '20%',      '10%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[5],   this.tym2,      fotoWidth,             '300px',     'cover',          '0%',       '0%');
    // this._mondrianAnim.backgroundImageTransform(this.fotoId[6],   this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',          '0%',       '0%');
    // this._mondrianAnim.backgroundImageTransform(this.fotoId[7],   this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',          '0%',       '0%');
    // this._mondrianAnim.backgroundImageTransform(this.fotoId[8],   this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',          '0%',       '0%');

  }

  public medScrnSliderAnim() {
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
    // this._mondrianAnim.fTranslateAnim2(this.photoKontainer[5],   this.tym1,    350,    856,    120,    200,     243,     1);
    // this._mondrianAnim.fTranslateAnim2(this.photoKontainer[6],   this.tym1,    575,    856,    120,    200,     243,     1);
    // this._mondrianAnim.fTranslateAnim2(this.photoKontainer[7],   this.tym1,    800,    856,    120,    200,     243,     1);
    // this._mondrianAnim.fTranslateAnim2(this.photoKontainer[8],   this.tym1,    460,    588,    zed,    500,     243,     1);

    /*--- Photos animation ---*/
    /* this._mondrianAnim.backgroundImageTransform(     elem,    tym,              w,                   h,      bgSize,        hPos,       vPos):---*/
    this._mondrianAnim.backgroundImageTransform(this.fotoId[0],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',      '0%',      '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[1],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',      '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[2],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',      '30%',       '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[3],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',      '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[4],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',        '50%',      '0%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[5],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',      '50%',      '20%');
    // this._mondrianAnim.backgroundImageTransform(this.fotoId[5],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',      '30%',      '20%');
    // this._mondrianAnim.backgroundImageTransform(this.fotoId[6],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',      '50%',       '0%');
    // this._mondrianAnim.backgroundImageTransform(this.fotoId[7],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',      '50%',      '0px');
    // this._mondrianAnim.backgroundImageTransform(this.fotoId[8],    this.tym2,      fotoWidth,    fotoHeight + '%',     'cover',      '0px',      '35%');

  }

  public largeScrnSliderAnim() {
    const zed = 100;
    const fontSize = '20px';
    const titleWidth = 350;
    const titleHeight = 100;
    const fotoWidth = '100%';
    const fotoHeight = 120; // %

    /*--- Resize layout container: Used to position all content within ---*/
    this._funksions.fElementWidth(this.photoLayoutContainerId, this.largeScreen);
    // console.log('this.largeScreen: ', this.largeScreen);

    /*--- Main Container placements ---*/
    /* this._mondrianAnim.fTranslateAnim2            (elem,       tym,  xp,     yp,    zp,        w,        h,  fontSize, alfa); */
    this._mondrianAnim.fTranslateAnim(this.mainKontainerId, this.tym3,   0,     85,   zed,   'auto',  '100vh',    'null',    1);



    /*--- Title and sub-title animation to place ---*/
    this._mondrianAnim.fTranslateAnim(this.titleContainerId, this.tym3, 290,  -10, zed, titleWidth, titleHeight, fontSize, 1);
    this._mondrianAnim.fTranslateAnim(this.subTitleId, this.tym3, 0,  0, zed, titleWidth, titleHeight, '.9em', 1);
    this._funksions.fTextAlign(this.title, 'right');
    this._funksions.fTextAlign(this.subTitle, 'right');
    // console.log(this.photoKontainer[0]);

    /*--- Photo containers placements ---*/
    /* this._mondrianAnim.fTranslateAnim2               (elem,         tym,     xp,     yp,     zp,      w,       h,  alfa); */
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[0],   this.tym1,    339,      100,    zed,    287,     243,     1); // jtns
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[1],   this.tym1,    294,    368,    200,    383,     236,     1); // ownphones
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[2],   this.tym1,    984,    337,    130,    287,     243,     1); // misc
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[3],   this.tym1,    10,    300,    210,    291,     335,     1); // illus
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[4],   this.tym1,    650,    -40,    zed,    387,     300,     1); // finas
    this._mondrianAnim.fTranslateAnim2(this.photoKontainer[5],   this.tym1,    650,    286,    120,    450,     363,     1); // akon
    // this._mondrianAnim.fTranslateAnim2(this.photoKontainer[6],   this.tym1,    861,    387,    120,    187,     243,     1);
    // this._mondrianAnim.fTranslateAnim2(this.photoKontainer[7],   this.tym1,   1072,    387,    120,    187,     243,     1);
    // this._mondrianAnim.fTranslateAnim2(this.photoKontainer[8],   this.tym1,    650,    655,    zed,    500,     300,     1);

    /*--- Photos placements ---*/
    /* this._mondrianAnim.backgroundImageTransform(     elem,          tym,               w,                   h,      bgSize,         hPos,       vPos):---*/
    this._mondrianAnim.backgroundImageTransform(this.fotoId[0],    this.tym2,       fotoWidth,    fotoHeight + '%',     '100%, auto',   '45%',    '-15px');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[1],    this.tym2,       fotoWidth,    fotoHeight + '%',     'cover',        '50%',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[2],    this.tym2,       fotoWidth,    fotoHeight + '%',     '200%, auto',   '90%',      '29%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[3],    this.tym2,       fotoWidth,    fotoHeight + '%',     'cover',        '0px',    '0px');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[4],    this.tym2,       fotoWidth,    fotoHeight + '%',     'cover',        '0px',      '20%');
    this._mondrianAnim.backgroundImageTransform(this.fotoId[5],    this.tym2,       fotoWidth,    fotoHeight + '%',     'cover',        '30%',      '20%');
    // this._mondrianAnim.backgroundImageTransform(this.fotoId[6],    this.tym2,       fotoWidth,    fotoHeight + '%',     'cover',        '50%',       '0%');
    // this._mondrianAnim.backgroundImageTransform(this.fotoId[7],    this.tym2,       fotoWidth,    fotoHeight + '%',     'cover',        '90%',    '-30px');
    // this._mondrianAnim.backgroundImageTransform(this.fotoId[8],    this.tym2,       fotoWidth,    fotoHeight + '%',     'cover',        '0px',      '40%');

}



  /*---- Screen Resize ----*/
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resizeMe();
  }

  /*---- Media queries ----*/
  public resizeMe() {

    /*----- Get viewportSize working! ----*/
    // this.innerWidth = viewportSize.getWidth(); // window.innerWidth;
    this.innerWidth = window.innerWidth;
    // console.log('this.innerWidth: ', this.innerWidth, ' --------=');

    if ( this.innerWidth >= this.largeScreen ) {
      this.largeScrnSliderAnim();
      this._funksions.fDisplayAll(this.fotoInfoKontainer, 'none');
      this._funksions.fDisplayAll(this.infoButton, 'flex');

    } else if ( this.innerWidth < this.largeScreen - 1 && this.innerWidth >= this.mediumScreen ) {
      this.medScrnSliderAnim();
      this._funksions.fDisplayAll(this.fotoInfoKontainer, 'none');
      this._funksions.fDisplayAll(this.infoButton, 'flex');

    } else {
      this.smlScrnSliderAnim();
      this._funksions.fDisplayAll(this.fotoInfoKontainer, 'flex');
      this._funksions.fDisplayAll(this.infoButton, 'none');
    }

  }

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
        Has to be declared in the css global scoped
        But your .custom-modalbox should be global scoped to be applied
        (not defined in the component styles )|---*/
        panelClass: 'custom-modalbox'

          // escapeToClose: this.isEscapeToClose,
          // clickOutsideToClose: this.isClickOutsideToClose,
    });
    // this.imageName = img;
    // console.log('xId: ', xId);
    // console.log('pathImg: ', pathImg);
    // console.log('orientation: ', orientation);
    // console.log('links: ', links[0]);
    // console.log('img: ', img);
    // console.log('dialogRef: ', dialogRef);

    /*---| Opening the pop-up modal with Single Project or Multiple Projects |---*/
    if (variation === 'single-project') {
      console.log ('variation 1: ', variation); // single-project

    } else {

      console.log('variedProjects: ', variedProjects.length);
      for (let i = 0; i < variedProjects.length; i++) {
        // this.aVariedProj[this.aVariedProj.length] = this.xData.variedProjects[i]; // push
        // this.varProjectTitle = this.aVariedProj[i].varProjectTitle;
        console.log ('variedProjects.varBtnDisplay: ', variedProjects[i].varBtnDisplay);
      }
    }

    // console.log('modalWidthVW: ', this.modalWidthVW);
    // console.log('maxWidth: ', PopUpComponent.maxWidth);
    // console.log('******---= Open: ', title, ' =---*****');
    // console.log('description: ', description);
    // console.log('variation: ', variation);
    // if (variation === 'single-project') {
    //   console.log ('variation: ', variation); // single-project
    //   this._funksions.sharedElement = 'String from Portfolio Component';
    //   // console.log('modKontTest: ', this.modKontTest.nativeElement);
    //   // this._funksions.fElementVisibility(this.multiProjectsId, 'hidden');
    //   // this._funksions.fElementVisibility(this.multiProjTitle, 'hidden');
    //   // this._funksions.fElementVisibility(this.multiProjTitleId, 'hidden');
    //   // this.varProjectTitle = 'x'; // this.xData.linx[0];
    //   // this.aVariedProj = [];

    // } else {

    //   console.log ('variation: ', variation); // multi-projects
    //   // for (let i = 0; i < this.xData.variedProjects.length; i++) {
    //   //   this.aVariedProj[this.aVariedProj.length] = this.xData.variedProjects[i]; // push
    //   //   this.varProjectTitle = this.aVariedProj[i].varProjectTitle;
    //   //   console.log ('this.varProjectTitle: ', this.varProjectTitle);
    //   // }
    //   // // this._funksions.fElementVisibility(this.multiProjTitle, 'visible');
    //   // // this.varProjectTitle = this.xData.variedProjects.varProjectTitle;
    //   // // this._funksions.fElementVisibility(this.multiProjTitle, 'visible');
    //   // this._funksions.fElementVisibility(this.mdcFabExtended, 'hidden');
    // }





    dialogRef.afterClosed().subscribe(result => {
      console.log(`Closed : ${title} modal. ••••••`);
      // this._carousel.commonCounter = 0;
      // console.log(`Common Counter Value : ${this._carousel.commonCounter}.`);
      // result =  title;
      // this.dialogResult = result;
      // reset pop-up datas
    });

  } // end fOpenModal()

}
