import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EsignatureService {
  constructor(private router: Router, private route: ActivatedRoute) {}

  goToEsig(id, docId) {
    this.router.navigate(['/evaluator/application', id, docId]);
  }
}
