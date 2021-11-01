import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import * as Rx from 'rxjs/Rx';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class SchedulingService {
  constructor(private api: ApiService) {}

  addInspection(body) {
    const url = `/inspection`;

    return this.api.post(url, body);
  }

  updateInspection(id, body) {
    const url = `/inspection/${id}`;

    return this.api.post(url, body);
  }

  getApplicationInspections(id) {
    const url = `/inspection/?application_id=${id}`;
    return this.api.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }
  getEvaluatorInspections(id) {
    const url = `/inspection/?evaluator_user_id=${id}`;
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
