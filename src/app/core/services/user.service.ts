import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import * as Rx from 'rxjs/Rx';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private api: ApiService) {}

  fetchUserInfo(id: string | number): Observable<any> {
    const url = `/user/${id}`;
    console.log(url);
    return this.api.get(url).pipe(
      map((data: any) => {
        console.log("fetchUserInfo Result:", data)
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }
}
