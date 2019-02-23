import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';

const materialModules = [
  BrowserAnimationsModule,
  MatDialogModule,
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule
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
