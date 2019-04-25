import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

// Load the implementations that should be tested
import { HeaderComponent } from '../header.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('Module Shell -> Component HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  // provide our implementations or mocks to the dependency injector
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot()
      ],
      declarations: [HeaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
    });

  }));

  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });

});
