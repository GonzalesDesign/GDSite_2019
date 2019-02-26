

/*---= Angular Core Modules =---*/
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

/*---= MAT & MDC Material Modules =---*/
import { MatModule } from './mat.module';
// import { MDCModule } from './mdc.module';

/*---= Project Modules =---*/
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { LoaderSvgComponent } from './loader-svg/loader-svg.component';
import { PopUpComponent } from './portfolio/pop-up/pop-up.component';

@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    PopUpComponent,
    LoaderSvgComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatModule,
    // MDCModule
  ],
  entryComponents: [
    // PopDialogComponent
    PopUpComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
