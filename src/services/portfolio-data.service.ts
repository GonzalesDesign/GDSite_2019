

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


export interface PortfolioDataInterface {
  id: number;
  kontainerId: string;
  imageId: string;
  title: string;
  subTitle: string;
  orientation: string;
  imagePath: string;
  images: any;
    value: string;
  description: string;
    info: string;
  links: any;
    linkName: string;
    linkUrl: string;
  variation: string;
  variedProjects: any;
    image: string;
    varProjectTitle: string;
    varProjectSubTitle: string;
    varProjectFunction: string;
    varProjectDescription: string;
}

@Injectable({
  providedIn: 'root'
})

export class PortfolioDataService {

  public screenWidth = window.innerWidth;
  public modalMaxWidth = Math.round((this.screenWidth * .90));

  public screenHeight = window.innerHeight;
  // public modalHeight = this.screenHeight * .90; // '90vh';
  public modalHeightVH = this.screenHeight * .90; // '90vh';

  // public orientation = this.orientation;


  private _url = '../../assets/data/gd-portfolio.1.json';

  constructor(private _httpClient: HttpClient) { }

  public portfolioData (): Observable<PortfolioDataInterface[]> {
   /*  console.log('screenWidth : ', this.screenWidth);
    console.log('screenWidth x: ', this.screenWidth * .80);
    console.log('screenWidth /: ', this.screenWidth / 100);
    console.log('modalMaxWidth: ', this.modalMaxWidth); */
    return this._httpClient
        .get<PortfolioDataInterface[]>(this._url)
        .pipe(
          catchError(this.fErroHandler)
        );

  }

  // catchError(this.fErroHandler);
  public fErroHandler() {
    // error => {
      return throwError('Something went wrong!');
    // }
  }

  // public fModalWidth(e) {
  //   const screenWidth = window.innerWidth;
  //   const modalWidthx = screenWidth * .90;
  //   const x = document.querySelector(e), s = x.style;
  //   s.width = modalWidthx + 'px';
  //   s.left = 0;
  //   // console.log('modalWidthx: ', modalWidthx);
  // }

  // public fCarouselWidth(e) {
  //   const screenWidth = window.innerWidth;
  //   const carouselWidth = screenWidth * .85;
  //   const x = document.querySelector(e),
  //   s = x.style;
  //   s.width = carouselWidth + 'px';
  //   s.left = '2px';
  //   // console.log('carouselWidth: ', carouselWidth);
  // }

}
