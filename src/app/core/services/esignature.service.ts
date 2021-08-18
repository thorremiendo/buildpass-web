import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import * as Rx from 'rxjs/Rx';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EsignatureService {
  public userSignature;
  private currentFormStepSubject: BehaviorSubject<Number> = new BehaviorSubject(
    1
  );
  public currentFormStep = this.currentFormStepSubject.pipe();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  goToEsig(id, docId, signature) {
    this.userSignature = signature;
    this.router.navigate(['/evaluator/application/sign', id, docId]);
  }
  reset() {
    this.currentFormStepSubject.next(1);
  }
  setStep(value) {
    this.currentFormStepSubject.next(value);
  }
  // generateSignature(body, id) {
  //   const url = `/user/${id}/generate-signature`;

  //   return this.api.post(url, body);
  // }
  generateSignature(id) {
    const url = `/user/${id}/generate-signature`;
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
