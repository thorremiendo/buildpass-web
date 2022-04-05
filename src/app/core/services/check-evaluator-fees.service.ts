import { ApplicationFeesService } from './application-fees.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckEvaluatorFeesService {
  constructor(private applicationFeeService: ApplicationFeesService) {}

  checkEvaluatorFees(officeId: number, applicationId: number, evaluatorCode) {
    let evaluators = [];
    let fee = new Subject<boolean>();

    this.applicationFeeService
      .fetchFeesByOffice(applicationId, officeId)
      .subscribe((res) => {
        res.data.forEach((element) => {
          if (element.evaluator_roles) {
            evaluators.push(element.evaluator_roles.role[0].code);
          }
          switch (evaluatorCode) {
            case 'CBAO-LG':
              if (evaluators.find((e) => e == 'CBAO-LG')) {
                fee.next(true);
              } else {
                fee.next(false);
              }

              break;
            case 'CBAO-STR':
              if (evaluators.find((e) => e == 'CBAO-STR')) {
                fee.next(true);
              } else {
                fee.next(false);
              }
              break;
            case 'CBAO-ELEC':
              if (evaluators.find((e) => e == 'CBAO-ELEC')) {
                fee.next(true);
              } else {
                fee.next(false);
              }
              break;
            case 'CBAO-ARCH':
              if (evaluators.find((e) => e == 'CBAO-ARCH')) {
                fee.next(true);
              } else {
                fee.next(false);
              }
              break;
            case 'CBAO-MEC':
              if (evaluators.find((e) => e == 'CBAO-MEC')) {
                fee.next(true);
              } else {
                fee.next(false);
              }
              break;
            case 'CBAO-SAN':
              if (evaluators.find((e) => e == 'CBAO-SAN')) {
                fee.next(true);
              } else {
                fee.next(false);
              }
              break;
          }
        });
      });

    return fee.asObservable();
  }
}
