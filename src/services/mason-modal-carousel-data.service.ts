
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface MMCDataInterface {
  id: number;
  title: string;
  imagePath: string;
  images: any;
    value: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})

export class MasonModalCarouselDataService {

  public screenWidth = window.innerWidth;
  public modalMaxWidth = Math.round((this.screenWidth * .90));

  public screenHeight = window.innerHeight;
  public modalHeight = this.screenHeight * .90; // '90vh';

  private _url = '../../assets/data/mason-modal-carousel.json';

  constructor(private _httpClient: HttpClient) { }

  public mmcData (): Observable<MMCDataInterface[]> {
   /*  console.log('screenWidth : ', this.screenWidth);
    console.log('screenWidth x: ', this.screenWidth * .80);
    console.log('screenWidth /: ', this.screenWidth / 100);
    console.log('modalMaxWidth: ', this.modalMaxWidth); */
    return this._httpClient.get<MMCDataInterface[]>(this._url);
  }

  public fModalWidth(e) {
    const screenWidth = window.innerWidth;
    const modalWidthx = screenWidth * .90;
    const x = document.querySelector(e), s = x.style;
    s.width = modalWidthx + 'px';
    s.left = 0;
    // console.log('modalWidthx: ', modalWidthx);
  }
  public fCarouselWidth(e) {
    const screenWidth = window.innerWidth;
    const carouselWidth = screenWidth * .85;
    const x = document.querySelector(e), s = x.style;
    s.width = carouselWidth + 'px';
    s.left = '2px';
    // console.log('carouselWidth: ', carouselWidth);
  }

}
