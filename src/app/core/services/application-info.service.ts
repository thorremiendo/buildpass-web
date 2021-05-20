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

  fetchApplications(id) {
    const url = `/application/${id}/evaluator/0/filter`;
    return this.api.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }
  verifyUserApplication(application_id, user_id) {
    const url = `/application/${application_id}/${user_id}/user/verify`;
    return this.api.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError(error.message);
      })
    );
  }
  updateApplicationInfo(body, id) {
    const url = `/application/${id}/update`;
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
  fetchApplicationTmeline(id) {
    const url = `/application/${id}/timeline`;
    return this.api.get(url).pipe(
      map((data: any) => {
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

  submitTechnicalFindings(body, id) {
    const url = `/application/${id}/technical-findings`;
    return this.api.post(url, body);
  }

  fetchUserBuildingPermit(id) {
    const url = `/user/${id}/building-permit`;
    return this.api.get(url).pipe(
      map((data: any) => {
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

    return this.api.get(url);
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

  fetchCbaoTimeline(id) {
    const url = `/application/${id}/timeline-cbao`;
    return this.api.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }

  updateCbaoStatus(body, id) {
    const url = `/application/${id}/update-status-cbao`;
    return this.api.post(url, body);
  }

  deleteApplication(id) {
    const url = `/application/${id}/delete`;
    return this.api.delete(url);
  }
}
