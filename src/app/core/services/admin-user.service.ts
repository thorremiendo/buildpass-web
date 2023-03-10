import { HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';
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
    private userAdapter: UserCredentialAdapter,
  ) {}

  getUsers(params: AdminUserParams = {}): Observable<any> {
    const url = `/user`;
    const requestParams = this.adminUserHttpBuilder.build(params);

    return this.apiService.get(url, requestParams).pipe(
      map(res => {
        const {
          data: { 
            data ,
            total,
          },
        } = res;

        const users = data.map(user => this.userAdapter.adapt(user));

        return {
          users,
          total,
        }
      })
    );
  }


  getData(){
    const url = `/user/employee`;
    return this.apiService.get(url).pipe(
      map(res => res.data));
  

  }

  approveEmployee(uid) {
    const url = `/admin/${uid}/approve`;

    return this.apiService.post(url,uid);
  }
}