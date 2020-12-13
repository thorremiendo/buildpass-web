import { HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { AdminUserParams } from '../../models/admin-user-params.model';
import { HttpBuilderInterface } from '../../interfaces/http-builder.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminUserParamBuilder implements HttpBuilderInterface {
  build(params: AdminUserParams) {
    const {
      searchTerm = '',
      page = 1,
    } = params;

    let requestParams = new HttpParams()
      .set('search_term', searchTerm)
      .set('page', `${page}`)

    return requestParams;
  }
}