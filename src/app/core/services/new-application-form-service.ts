import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Injectable()
export class NewApplicationFormService {
  public newApplicationSubject= new BehaviorSubject<any>("");

  setApplicationInfo(newApplicationInfo) {
    this.newApplicationSubject.next(newApplicationInfo);
  }
}
