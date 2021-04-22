import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Injectable()
export class NewApplicationFormService {
  public newApplicationSubject = new BehaviorSubject<any>('');
  public commonFieldsSubject = new BehaviorSubject<any>('');
  public additionalPermitsSubject = new BehaviorSubject<any>('');
  constructor() {
    this.newApplicationSubject.subscribe((res) => {});
  }

  setApplicationInfo(newApplicationInfo) {
    this.newApplicationSubject.next(newApplicationInfo);
    localStorage.setItem(
      'newApplicationInfo',
      JSON.stringify(newApplicationInfo)
    );
  }
  setCommonFields(commonFieldsInfo) {
    this.commonFieldsSubject.next(commonFieldsInfo);
    localStorage.setItem('commonFieldsInfo', JSON.stringify(commonFieldsInfo));
  }
  setAdditionalPermits(additionalPermits) {
    this.additionalPermitsSubject.next(additionalPermits);
  }
}
