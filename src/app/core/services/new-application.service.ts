import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import * as Rx from 'rxjs/Rx';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NewApplicationService {
  constructor(private api: ApiService) {}
  public applicationId = new BehaviorSubject<any>('');

  submitApplication(body) {
    const url = `/application`;
    console.log(body);
    return this.api.post(url, body).pipe(
      map((data: any) => {
        console.log('submitApplication result:', data);
        this.applicationId.next(data.data.id);
        localStorage.setItem('app_id', data.data.id);
        return data;
      }),
      catchError((error) => {
        console.log(error);
        return throwError('Something went wrong.');
      })
    );
  }

  submitDocument(body) {
    const url = `/userdocs`;

    return this.api.post(url, body);
  }
  saveAsDraft(body) {
    const url = `/user/lastroute`;

    return this.api.post(url, body);
  }

  fetchDraftDetails(id, application_id) {
    const url = `/user/${id}/${application_id}/lastroute`;
    return this.api.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }
  //attributes of user doc
  updateDocumentFile(body, id) {
    const url = `/userdocs/${id}/update`;

    return this.api.post(url, body);
  }

  fetchUserInfo(id) {
    const url = `/user/${id}/applicationid`;

    return this.api.get(url);
  }
  //replace user document
  updateUserDocs(body, id) {
    const url = `/userdocs/${id}/revision`;
    return this.api.post(url, body);
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
}
