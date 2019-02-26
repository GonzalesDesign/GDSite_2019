/******************************************************
* Project: R.Lloyd Gonzales Portfolio Website
* URL: RLGonzales.com
* Contact: rolandolloyd@gmail.com
* Copyright © 2019 GonzalesDesign
* Platform: Angular 6
* Module Name: MaterialDesignComponents Module:
               https://material.angular.io/
* Note: Import to App Module
******************************************************/

import { NgModule } from '@angular/core';

import {
  MdcButtonModule,
  MdcCardModule,
  MdcCheckboxModule,
  MdcDialogModule,
  MdcDrawerModule,
  MdcElevationModule,
  MdcFabModule,
  MdcFormFieldModule,
  MdcIconModule,
  MdcIconButtonModule,
  // MdcIconToggleModule,
  MdcLinearProgressModule,
  MdcListModule,
  MdcMenuModule,
  MdcRadioModule,
  MdcRippleModule,
  MdcSelectModule,
  MdcSliderModule,
  MdcSnackbarModule,
  MdcSwitchModule,
  MdcTabModule,
  MdcTextFieldModule,
  // MdcThemeModule,
  // MdcToolbarModule,
  MdcTypographyModule
} from '@angular-mdc/web';

const mdcModules = [
  MdcButtonModule,
  MdcCardModule,
  MdcCheckboxModule,
  MdcDialogModule,
  MdcDrawerModule,
  MdcElevationModule,
  MdcFabModule,
  MdcFormFieldModule,
  MdcIconModule,
  MdcIconButtonModule,
  // MdcIconToggleModule,
  MdcLinearProgressModule,
  MdcListModule,
  MdcMenuModule,
  MdcRadioModule,
  MdcRippleModule,
  MdcSelectModule,
  MdcSliderModule,
  MdcSnackbarModule,
  MdcSwitchModule,
  MdcTabModule,
  MdcTextFieldModule,
  // MdcThemeModule,
  // MdcToolbarModule,
  MdcTypographyModule
];



@NgModule({
  imports: [
    mdcModules
  ],

  exports: [
    mdcModules
  ]
})


export class MDCModule { }
