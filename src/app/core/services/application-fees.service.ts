import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import * as Rx from 'rxjs/Rx';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApplicationFeesService {
  constructor(private api: ApiService) {}

  addFee(body) {
    const url = `/fee`;

    return this.api.post(url, body);
  }
  fetchFees(id) {
    const url = `/fee/${id}`;
    return this.api.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }

  fetchAllFees() {
    const url = `/fee`;
    return this.api.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }
  fetchOfficeFees(office_id) {
    const url = `/fee/office/${office_id}`;
    return this.api.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }
  fetchFeesByOffice(application_id, office_id) {
    const url = `/fee/${application_id}/office/${office_id}`;
    return this.api.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }
  deleteFee(id) {
    const url = `/fee/${id}`;
    return this.api.delete(url);
  }

  downloadFees(id) {
    const url = `/fee/${id}/download`;
    const body = {};
    return this.api.post(url, body);
  }

  fetchBpFees(id) {
    const url = `/fee/${id}/generate`;
    return this.api.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }
}
