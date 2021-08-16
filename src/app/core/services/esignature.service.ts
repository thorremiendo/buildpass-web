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
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  goToEsig(id, docId) {
    this.router.navigate(['/evaluator/application', id, docId]);
  }

  generateSignature(body, id) {
    const url = `/user/${id}/generate-signature`;

    return this.api.post(url, body);
  }
}
