import { Injectable, APP_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { RegisterAccountEvaluatorModel } from '../models/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterAccountEvaluatorFormService {
  private registerAccountEvaluatorSubject: BehaviorSubject<RegisterAccountEvaluatorModel> = new BehaviorSubject<RegisterAccountEvaluatorModel>(
    {} as RegisterAccountEvaluatorModel
  );
  public currentPageSubject = new BehaviorSubject<number>(1);

  cast = this.registerAccountEvaluatorSubject.asObservable();

  public registerAccountInfo = this.registerAccountEvaluatorSubject.pipe(
    distinctUntilChanged()
  );

  constructor(public api: ApiService) {
    this.registerAccountEvaluatorSubject.subscribe((res) => {});
  }

  setCurrentPage(newCurrentPage) {
    this.currentPageSubject.next(newCurrentPage);
  }

  setRegisterAccountInfo(value: RegisterAccountEvaluatorModel) {
    const currentValue = this.registerAccountEvaluatorSubject.value;
    this.registerAccountEvaluatorSubject.next({
      ...currentValue,
      ...value,
    });
  }

  submitRegisterAccountInfo(body): Observable<RegisterAccountEvaluatorModel> {
    const url = '/user';
    return this.api.post(url, body);
  }
}
