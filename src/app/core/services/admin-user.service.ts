import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserCredentialAdapter } from '../adapters';
import { AdminUserParamBuilder } from '../http-builder';
import { AdminUserParams } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AdminUserService {
  constructor(
    private apiService: ApiService,
    private adminUserHttpBuilder: AdminUserParamBuilder,
    private userAdapter: UserCredentialAdapter
  ) {}

  getUsers(params: AdminUserParams = {}): Observable<any> {
    const url = `/user`;
    const requestParams = this.adminUserHttpBuilder.build(params);

    return this.apiService.get(url, requestParams).pipe(
      map((res) => {
        const {
          data: { data, total },
        } = res;

        const users = data.map((user) => this.userAdapter.adapt(user));

        return {
          users,
          total,
        };
      })
    );
  }

  fetchApplicant() {
    const url = '/user/applicant';
    return this.apiService.get(url).pipe(map((res) => res.data));
  }

  fetchEmployees() {
    const url = `/user/employee`;
    return this.apiService.get(url).pipe(map((res) => res.data));
  }

  fetchEmployeeInfo(id) {
    const url = `/employee/${id}`;

    return this.apiService.get(url);
  }

  approveEmployee(uid) {
    const url = `/admin/${uid}/approve`;

    return this.apiService.post(url, uid);
  }

  deleteUser(id){
    const url = `/user/${id}/delete`;
    return this.apiService.delete(url);

  }

  approveFillingFee(ocpasCode) {
    const url = `/treasury/${ocpasCode}/updatePayment`;
    const body = {
      payment_processing_status_id: '2',
      official_receipt_number: '1111111',
    };

    return this.apiService.post(url, body);
  }

  approvePermitFee(ocpasCode) {
    const url = `/treasury/${ocpasCode}/updatePayment`;
    const body = {
      payment_releasing_status_id: '2',
      official_receipt_number: '22222',
    };

    return this.apiService.post(url, body);
  }


  resendVerification(id){
    const url = `/admin/${id}/resend-verification`;

    return this.apiService.post(url, null);

  }

}


