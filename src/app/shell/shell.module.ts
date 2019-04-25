import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import {
  HeaderComponent,
  FooterComponent,
  NavComponent,
  LoaderComponent
} from './components';
import { SharedModule } from '../shared';
import { RouterModule } from '@angular/router';
import { ShellComponent } from './pages';

/**
 * Shell Module is common known as Application shell, this module isn't a lazy load module.
 * This module contains the main a minimum pieces of code of our application such a Toolbar,
 * Footer, etc... This allow us to load only the main content and avoid things that we don't need
 * at first load.
 */
@NgModule({
  declarations: [
    ShellComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    LoaderComponent
  ],
  imports: [CommonModule, RouterModule.forChild([]), TranslateModule.forChild(), SharedModule],
  providers: []
})
export class ShellModule {}
