import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExcavationPermitService {
  public useExistingInfoSubject = new BehaviorSubject<any>('');

  constructor() {}

  setUseExistingInfo(data: string) {
    this.useExistingInfoSubject.next(data);
  }
}
