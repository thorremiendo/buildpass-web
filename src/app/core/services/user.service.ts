import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private api: ApiService) {}

  fetchUserInfo(id: string | number): Observable<any> {
    const url = `/user/${id}`;
    console.log(url)
    return this.api.get(url);
  }
}
