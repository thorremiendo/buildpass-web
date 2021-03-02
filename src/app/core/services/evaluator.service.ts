import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import * as Rx from 'rxjs/Rx';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EvaluatorService {
  public evaluatorDetails;
  constructor(private api: ApiService) {}

  fetchEvaluatorDetails() {
    this.evaluatorDetails = JSON.parse(localStorage.getItem('currentUser'));

  }
}
