import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtService } from './jwt.service';
import { AuthService } from './auth.service';
import { UserAdapter } from '../adapters/user.adapter';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  constructor(
    private api: ApiService,
    private userAdapter: UserAdapter,
    private authService: AuthService,
    private userService: UserService
  ) {}

  loginAdmin(username: string, password: string): Observable<any> {
    const url = `/evaluator/login`;

    return this.api
      .post(url, {
        username,
        password,
      })
      .pipe(
        map((res) => {
          const user = res.data.user;
          this.authService.login(user, res.data.token);
          return res.data;
        })
      );
  }
}
