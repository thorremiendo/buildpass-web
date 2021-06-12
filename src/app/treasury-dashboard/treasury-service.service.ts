import { Injectable } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TreasuryService {
  constructor(private api: ApiService) {}
  fetchAllApplication() {
    const url = `/application`;

    return this.api.get(url);
  }
  fetchFilingFeeApplications() {
    const url = `/treasury/applications/filing`;
    return this.api.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }
  fetchPermitFeeApplications() {
    const url = `/treasury/applications/permit`;
    return this.api.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }
  fetchApplicationInfo(code) {
    const url = `/treasury/${code}/application/`;
    return this.api.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }
  updateApplicationStatus(body, code) {
    const url = `/treasury/${code}/updatePayment`;
    return this.api.post(url, body);
  }
}
