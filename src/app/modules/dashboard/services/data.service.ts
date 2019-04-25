import { Injectable } from '@angular/core';
import { DashboardServicesModule } from './dashboard-services.module';
import { of } from 'rxjs';

@Injectable({
  providedIn: DashboardServicesModule
})
export class DataService {
  exampleMethod() {
    return of('Data from the DataService');
  }
}
