import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import * as Rx from 'rxjs/Rx';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApplicationInfoService {
  constructor(private api: ApiService) {}

  fetchApplications() {
    const url = `/application/`;
    return this.api.get(url).pipe(
      map((data: any) => {
        console.log('fetchApplications Result:', data);
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }

  fetchApplicationInfo(id) {
    const url = `/application/${id}`;
    return this.api.get(url).pipe(
      map((data: any) => {
        console.log('fetchApplicationInfo Result:', data);
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }
  fetchUserDocs(id) {
    const url = `/userdocs/${id}`;
    return this.api.get(url).pipe(
      map((data: any) => {
        console.log('fetchUserDocs Result:', data);
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }
  updateApplicationStatus(body, id) {
    const url = `/application/${id}/updateStatus`;
    return this.api.post(url, body);
  }
}
