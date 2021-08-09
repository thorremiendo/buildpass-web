import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import * as Rx from 'rxjs/Rx';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OccupancyService {
  constructor(private api: ApiService) {}

  fetchOldBps() {
    const url = '/application/old-obpas';
    return this.api.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }

  fetchSpecificOldBp(id) {
    const url = `/application/${id}/bp/manual-released`;
    return this.api.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }

  associateOldBp(id, body) {
    const url = `/application/${id}/associate`;

    return this.api.post(url, body);
  }

  deleteOldBp(app_id, assoc_id) {
    const url = `/application/${app_id}/associated/${assoc_id}`;
    return this.api.delete(url);
  }

  confirmOldBp(id, body) {
    const url = `/application/${id}/associate/confirmed`;

    return this.api.post(url, body);
  }

  createOldBpOwnerDetals(id, body) {
    const url = `/application/${id}/owner-details`;

    return this.api.post(url, body);
  }

  fetchUserOldBp(id) {
    const url = `/application/${id}/associated`;
    return this.api.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }

  fetchUserDocsOnly(id) {
    const url = `/userdocs/${id}/docs-only`;
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
