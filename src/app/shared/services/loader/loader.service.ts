import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loaderState$: Observable<boolean>;

  private loaderSubject = new BehaviorSubject<boolean>(false);

  constructor() {
    this.loaderState$ = this.loaderSubject.asObservable();
  }

  showLoader() {
    this.loaderSubject.next(true);
  }

  hide() {
    this.loaderSubject.next(false);
  }
}
