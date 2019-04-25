import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ScreenWidth } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  $isTouchDevice: Observable<boolean>;
  $isMobile: Observable<boolean>;
  $isHighDefinition: Observable<boolean>;
  private subjectTouch = new BehaviorSubject<boolean>(undefined);
  private subjectMobile = new BehaviorSubject<boolean>(undefined);
  private subjectHighDefinition = new BehaviorSubject<boolean>(undefined);

  constructor() {
    this.$isTouchDevice = this.subjectTouch.asObservable();
    this.$isMobile = this.subjectMobile.asObservable();
    this.$isHighDefinition = this.subjectHighDefinition.asObservable();
    this.checkWidth();
  }

  checkWidth() {
    const width = window.innerWidth;
    if (width < ScreenWidth.MD) {
      this.subjectHighDefinition.next(false);
      this.subjectTouch.next(true);
      this.subjectMobile.next(true);
    } else if (width >= ScreenWidth.MD && width < ScreenWidth.LG) {
      this.subjectHighDefinition.next(false);
      this.subjectTouch.next(true);
      this.subjectMobile.next(false);
    } else if (width >= ScreenWidth.LG && width < ScreenWidth.XL) {
      this.subjectHighDefinition.next(false);
      this.subjectTouch.next(false);
      this.subjectMobile.next(false);
    } else if (width >= ScreenWidth.XL && width < ScreenWidth.HD) {
      this.subjectHighDefinition.next(false);
      this.subjectTouch.next(false);
      this.subjectMobile.next(false);
    } else {
      this.subjectHighDefinition.next(true);
      this.subjectTouch.next(false);
      this.subjectMobile.next(false);
    }
  }
}
