import { Injectable, APP_ID } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
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
    this.userSubject.subscribe((res) => {});
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
    return this._api.post(url, body);
  }

  getUserInfo(firebase_uid) {
    const url = `/user/${firebase_uid}`;
    return this._api.get(url).pipe(map((res) => res.data));
  }

  fetchUserInfo(id: string | number): Observable<any> {
    const url = `/user/${id}`;
    return this._api.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }

  fetchUserApplications(id: string | number): Observable<any> {
    const url = `/user/${id}/application`;

    return this._api.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }

  autoResendVerification(email){
    const url = `/user/resend-verification`;
    const body = {
      email_address:email
    };

    return this._api.post(url, body);
  }

  changePassword(body){
    const url ='/user/applicant/change-password';
    
    return this._api.post(url,body);
  }
}
