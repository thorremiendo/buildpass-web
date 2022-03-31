import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import * as Rx from 'rxjs/Rx';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class UserDocumentsService {
  constructor(private api: ApiService) {}

  deleteUserDocument(id: number) {
    const url = `/userdocs/${id}/remove`;
    return this.api.post(url, {});
  }
}
