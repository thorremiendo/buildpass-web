import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtService } from './jwt.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  constructor(
    private api: ApiService,
    private authService: AuthService,
    private jwtService: JwtService
  ) {}

  loginAdmin(username: string, password: string): Observable<any> {
    const url = `/admin/login`;

    return this.api
      .post(url, {
        username,
        password,
      })
      .pipe(
        map((res) => {
          const user = res.data.user;
          const token = res.data.token;
          this.authService.currentUserSubject.next(user);
          this.jwtService.saveToken(token);
        })
      );
  }

  loginEvaluator(username: string, password: string): Observable<any> {
    const url = `/evaluator/login`;

    return this.api
      .post(url, {
        username,
        password,
      })
      .pipe(
        map((res) => {
          const user = res.data.user;
          const token = res.data.token;
          this.authService.currentUserSubject.next(user);
          this.jwtService.saveToken(token);
        })
      );
  }
}
