import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages';
import { RouterModule } from '@angular/router';
import { ROUTES } from './dashboard.routes';
import { SharedModule } from '../../shared';
import { DashboardServicesModule } from './services';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule,
    DashboardServicesModule
  ]
})
export class DashboardModule { }
