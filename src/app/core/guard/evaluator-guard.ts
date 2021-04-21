import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EvaluatorAuthGuard implements CanActivate {
  public user;

  constructor(public _authService: AuthService, public _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this._authService.currentUser.subscribe((currentUser) => {
      this.user = currentUser
        ? currentUser
        : JSON.parse(localStorage.getItem('user'));
    });
    if (this.user.user_roles.length !== 0) {
      return true;
    } else {
      this._authService.purgeAuth();
      this._router.navigateByUrl('user/sign-in');
      return false;
    }
  }
}
