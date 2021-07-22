import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import * as Rx from 'rxjs/Rx';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NewApplicationService {
  constructor(
    private api: ApiService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  public applicationId = new BehaviorSubject<any>('');

  submitApplication(body) {
    const url = `/application`;
    return this.api.post(url, body).pipe(
      map((data: any) => {
        this.applicationId.next(data.data.id);
        localStorage.setItem('app_id', data.data.id);
        return data;
      }),
      catchError((error) => {
        this.openSnackBar('An error occured. Please try again.');
        this.router.navigateByUrl('dashboard/new/step-one');
        return throwError('Something went wrong.');
      })
    );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    });
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
    const url = `/user/${id}/application-id`;

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
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }

  fetchDocumentTypes() {
    const url = '/document';
    return this.api.get(url);
  }

  fetchDocumentPath(id) {
    const url = `/userdocs/${id}/path`;
    return this.api.get(url);
  }

  resetDocumentWatermark(body, id) {
    const url = `/userdocs/${id}/reset-document`;
    return this.api.post(url, body);
  }

  setRemarkCompliance(id, compliant) {
    let url = null;
    if (compliant) url = `/userdocs/remark/${id}/complied`;
    else url = `/userdocs/remark/${id}/non-compliant`;
    return this.api.post(url, {});
  }

  updateRemark(id, remark) {
    const url = `/userdocs/remark/${id}/update`;
    return this.api.post(url, {
      remarks: remark
    });
  }

  deleteRemark(id) {
    const url = `/userdocs/remark/${id}/remove`;
    return this.api.post(url, {});
  }
}
