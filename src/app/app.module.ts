import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { ShellComponent, ShellModule } from './shell';
import { NoContentComponent, EnvironmentService, RestInterceptor, EXTERNAL_PROVIDER } from './shared';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { AppCustomPreloader } from './app-custom-preloader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import localeES from '@angular/common/locales/es';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';

/* AOT configuration */
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

/* to load config */
export function initConfig(config: EnvironmentService) {
  return () => config.loadConfig();
}

registerLocaleData(localeES, 'es');

@NgModule({
  bootstrap: [ShellComponent],
  declarations: [NoContentComponent],
  imports: [
    ShellModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, {
      useHash: true,
      preloadingStrategy: AppCustomPreloader
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    AppCustomPreloader,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RestInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [EnvironmentService],
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'es'
    },
    // {
    //   provide: ErrorHandler,
    //   useClass: ErrorHandlerInterceptor
    // }
    EXTERNAL_PROVIDER
  ],
})
export class AppModule { }
