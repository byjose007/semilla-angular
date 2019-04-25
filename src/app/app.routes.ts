import { Routes } from '@angular/router';
import { ROUTES_CONSTANTS } from './shared/constants/routes';
import { NoContentComponent, AuthGuard, AnonymousGuard } from './shared';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: ROUTES_CONSTANTS.LOGIN.LOGIN.path,
    loadChildren: './modules/login/login.module#LoginModule',
    canActivate: [AnonymousGuard]
  },
  {
    path: ROUTES_CONSTANTS.DASBOARD.DASHBOARD.path,
    loadChildren: './modules/dashboard/dashboard.module#DashboardModule',
    // canActivate: [AuthGuard],
    data: { preload: true }
  },
  {
    path: ROUTES_CONSTANTS.SHELL.NO_CONTENT.path,
    component: NoContentComponent
  }
];
