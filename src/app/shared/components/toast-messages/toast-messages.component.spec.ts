import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastMessagesComponent } from './toast-messages.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ToastMessagesComponent', () => {
  let component: ToastMessagesComponent;
  let fixture: ComponentFixture<ToastMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToastMessagesComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
