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
        //console.log('fetchApplications Result:', data);
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
        //console.log('fetchApplicationInfo Result:', data);
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }
  fetchApplicationTmeline(id) {
    const url = `/application/${id}/timeline`;
    return this.api.get(url).pipe(
      map((data: any) => {
        //console.log('AppTimeline Result:', data);
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
        //console.log('fetchUserDocs Result:', data);
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

  fetchUserBuildingPermit(id) {
    const url = `/user/${id}/building-permit`;
    return this.api.get(url).pipe(
      map((data: any) => {
        //console.log('fetchUserDocs Result:', data);
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }

  uploadSupportingFiles(body, id) {
    const url = `/application/${id}/supporting-file`;
    return this.api.post(url, body);
  }

  fetchApplicationSupportingFiles(id) {
    const url = `/application/${id}/supporting-files`;
    return this.api.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }

  fetchOngoingApplication(id) {
    const url = `/user/${id}/ongoing-application`;
    return this.api.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }
  submitZoningFormData(body, id) {
    const url = `/formdata/${id}/zoning`;
    return this.api.post(url, body);
  }
  fetchZoningFormData(id) {
    const url = `/formdata/${id}/zoning`;
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
