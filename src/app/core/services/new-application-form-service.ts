import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Injectable()
export class NewApplicationFormService {
  public newApplicationSubject = new BehaviorSubject<any>('');
  public commonFieldsSubject = new BehaviorSubject<any>('');
  public additionalPermitsSubject = new BehaviorSubject<any>('');
  constructor() {
    this.newApplicationSubject.subscribe((res) => {
      console.log('This is the result: ', res);
    });
  }

  setApplicationInfo(newApplicationInfo) {
    this.newApplicationSubject.next(newApplicationInfo);
  }
  setCommonFields(commonFieldsInfo) {
    this.commonFieldsSubject.next(commonFieldsInfo);
    localStorage.setItem('applicationDetails', JSON.stringify(commonFieldsInfo));
  }
  setAdditionalPermits(additionalPermits) {
    this.additionalPermitsSubject.next(additionalPermits);
  }
}
