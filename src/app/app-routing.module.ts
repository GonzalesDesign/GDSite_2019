import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortfolioComponent } from './portfolio/portfolio.component';

const routes: Routes = [

  /*--|Main path|--*/
  { path: '',
    redirectTo: 'portfolio',
    pathMatch: 'full' },

  /*--|Portfolio path|--*/
  { path: 'portfolio',
    component: PortfolioComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
