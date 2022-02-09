import { Injectable } from '@angular/core';
import { HttpParams } from "@angular/common/http";
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
    this.evaluatorDetails = JSON.parse(localStorage.getItem('user'));
  }

  fetchTaskCount(id){
    const url = `/dashboard/${id}/evaluator`;

    return this.api.get(url);
  }

  fetchApplications(params) {
    const url = `/application/evaluator`;
    let httpParams;
    if (params) {
      httpParams = new HttpParams()
        .set('search_term', params.searchKey ? params.searchKey : '')
        .set('permit_type_id', params.permitType ? params.permitType : '')
        .set('compliance_status_id', params.complianceStatus ? params.complianceStatus : '')
        .set('date_range_start', params.dateStart ? params.dateStart : '')
        .set('date_range_end', params.dateEnd ? params.dateEnd : '')
        .set('is_ascending', params.sortType ? params.sortType : '')
        .set('page', params.pageIndex)
        .set('items_per_page', params.pageSize)
        .set('is_include_incomplete', params.incompleteFlag);
    }

    return this.api.get(url, httpParams).pipe(map(res => res.data));
  }

  fetchApplicationByStatus(user_id:number | string, status_id:number |string){
    const url = `/application/${user_id}/evaluator/${status_id}/filter`;

    return this.api.get(url);

  }

  resetPassword(id: string | number){
    const url = `/user/${id}/reset-password`;

    return this.api.post(url, null)
  }
}
