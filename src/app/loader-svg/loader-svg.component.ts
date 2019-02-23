


/**********************************************************
* Project: R.Lloyd Gonzales Portfolio Website
* URL: RLGonzales.com
* Contact: rolandolloyd@gmail.com
* Copyright © 2019 GonzalesDesign
* Platform: Angular 6
* Component Name: LoaderSvgComponent
* Note: Component to load for displaying loading animation.
**********************************************************/


import { LoaderAnimService } from './loader-anim.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader-svg',
  templateUrl: './loader-svg.component.html',
  styleUrls: ['./loader-svg.component.scss']
})
export class LoaderSvgComponent implements OnInit {

  constructor(private _loaderAnim: LoaderAnimService) { }

  ngOnInit() {
    this._loaderAnim.fArchSVG();
  }

}
