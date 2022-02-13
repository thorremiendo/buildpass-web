import { Injectable, APP_ID } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { distinctUntilChanged, map, catchError } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { ApiService } from './api.service';
import { HttpParams } from "@angular/common/http";
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

  fetchUserApplications(params): Observable<any> {
    const url = `/user/${params.userId}/application`;
    let httpParams;
    if (params) {
      httpParams = new HttpParams()
        .set('search_term', params.searchKey ? params.searchKey : '')
        .set('permit_type_id', params.permitType ? params.permitType : '')
        .set('is_compliance', params.complianceStatus ? params.complianceStatus : '')
        .set('date_range_start', params.dateStart ? params.dateStart : '')
        .set('date_range_end', params.dateEnd ? params.dateEnd : '')
        .set('is_ascending', params.sortType ? params.sortType : '')
        .set('page', params.pageIndex)
        .set('items_per_page', params.pageSize)
    }

    return this._api.get(url, httpParams).pipe(map(res => res.data));
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
