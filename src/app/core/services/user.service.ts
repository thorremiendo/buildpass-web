import { Injectable, APP_ID } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, throwError } from 'rxjs';
import { distinctUntilChanged, map, catchError } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { ApiService } from './api.service';
import * as Rx from 'rxjs/Rx';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    {} as any
  );

  cast = this.userSubject.asObservable();

  public userInfo = this.userSubject.pipe(distinctUntilChanged());

  constructor(public _api: ApiService) {
    this.userSubject.subscribe((res) => {
      console.log('This is the result: ', res);
    });
  }

  setUserInfo(value) {
    const currentValue = this.userSubject.value;
    this.userSubject.next({
      ...currentValue,
      ...value,
    });
  }

  updateUserInfo(body, id): Observable<UserModel> {
    const url = `/user/${id}/update`;
    console.log(body);
    return this._api.post(url, body);
  }

  getUserInfo(firebase_uid) {
    const url = `/user/${firebase_uid}`;
    return this._api.get(url).pipe(map((res) => res.data));
  }

  fetchUserInfo(id: string | number): Observable<any> {
    const url = `/user/${id}`;
    console.log(url);
    return this._api.get(url).pipe(
      map((data: any) => {
        console.log('fetchUserInfo Result:', data);
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }

  fetchUserApplications(id: string | number): Observable<any> {
    const url = `/user/${id}/application`;
    console.log(url);
    return this._api.get(url).pipe(
      map((data: any) => {
        console.log('fetchUserApplication Result:', data);
        return data;
      }),
      catchError((error) => {
        console.log(error);
        return throwError('Something went wrong.');
      })
    );
  }
}
