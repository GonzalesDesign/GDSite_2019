/******************************************************
* Project: R.Lloyd Gonzales Portfolio Website
* URL: RLGonzales.com
* Contact: rolandolloyd@gmail.com
* Copyright © 2019 GonzalesDesign
* Platform: Angular 6
* Module Name: Materials Module:
               https://material.angular.io/
* Note: Import to App Module
******************************************************/

import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';

const materialModules = [
  BrowserAnimationsModule,
  MatDialogModule,
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatIconModule,
  MatToolbarModule
];

@NgModule({

  imports: [
      materialModules
    ],

  exports: [
      materialModules
    ]

})

export class MatModule { }
