
import { Injectable } from '@angular/core';
import { HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: "root",
})

export class AdminService  {
  constructor(

    private api:ApiService,
  
  ) {}

  fetchApplications(params) {
    const url = `/application`;
    let httpParams;
    if (params) {
      httpParams = new HttpParams()
        .set('search_term', params.searchKey ? params.searchKey : '')
        .set('permit_type_id', params.permitType ? params.permitType : '')
        .set('application_status_id', params.applicationStatus ? params.applicationStatus : '')
        .set('reevaluation_status_id', params.reevaluationStatus ? params.reevaluationStatus : '')
        .set('is_reevaluation', params.isReevaluationStatus ? params.isReevaluationStatus : '')
        .set('date_range_start', params.dateStart ? params.dateStart : '')
        .set('date_range_end', params.dateEnd ? params.dateEnd : '')
        .set('is_ascending', params.sortType ? params.sortType : '')
        .set('page', params.pageIndex)
        .set('items_per_page', params.pageSize)
        .set('is_include_incomplete', params.incompleteFlag);
    }

    return this.api.get(url, httpParams).pipe(map(res => res.data));
  }

  fetchAllApplication(){
    const url = `/application`;

    return this.api.get(url);
  }

  fetchApplicationbyId(id){
      const url = `/application/${id}`;

      return this.api.get(url);
    
  }

  fetchApplicationTotalStatus(){
    const url = `/dashboard/total-status`;

    return this.api.get(url);
  
  }

  fetchTotalPermitByType(){
    const url = `/dashboard/total-permits`;

    return this.api.get(url);
  
  }

  fetchAllApplicationStatusList(){
    const url = `/admin/application/status`;

    return this.api.get(url);
  
  }

  changeApplicationStatus(application_id,newStatus){
    const url = `/admin/application/${application_id}/updateStatus`;

    var body = {
      application_status_id: newStatus
    }

    return this.api.post(url, body)

  }


}