import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

import { MultiLanguageService, EnvironmentService } from '../../../../shared/services';
// Load the implementations that should be tested
import { ShellComponent } from '../shell.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderComponent, FooterComponent } from '../../../components';
describe('Module Shell -> Component ShellMainComponent', () => {
  const environmentServiceMock = {
    'data': {
      'apiUrl': 'http://example.com'
    }
  };
  let component: ShellComponent;
  let fixture: ComponentFixture<ShellComponent>;

  // provide our implementations or mocks to the dependency injector
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        MultiLanguageService,
        { provide: EnvironmentService, useValue: environmentServiceMock }],
      declarations: [ShellComponent, HeaderComponent, FooterComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ShellComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

  }));

  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });

});
