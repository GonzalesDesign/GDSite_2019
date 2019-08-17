/***********************************************************
* Project: R.Lloyd Gonzales Portfolio Website
* URL: RLGonzales.com
* Contact: rolandolloyd@gmail.com
* Copyright © 2019 GonzalesDesign
* Platform: Angular 6
* Service Name: PortfolioDataService
* Version: 090418
* Note: Entry point for bringing in the data from json
        using observables.
        Interface is also defined here.
***********************************************************/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

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
  responsibilities: string;
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
    return this._httpClient
    .get<PortfolioDataInterface[]>(this._url)
    .pipe(
    //   tap (
    //     success => console.log('success')
    //     // error => console.log('error')
    //     // catchError(this.fHandleError)
    //  )
      catchError(this.fHandleError)
    );
  }

//   tap (
//     success => console.log('success')
//     error => console.log('error')
//  )

  public fErrorHandler() {
    // error => {
      return throwError('Something went wrong!');
    // }
  }

  public fHandleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
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
