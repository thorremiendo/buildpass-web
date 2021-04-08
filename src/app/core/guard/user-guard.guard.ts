import { AuthService } from 'src/app/core';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserGuardGuard implements CanActivate {
  public user;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.authService.currentUser.subscribe((currentUser) => {
      this.user = currentUser;
    });
    if (this.user || localStorage.getItem('user')) {
      console.log('authenticated');
      return true;
    } else {
      this.router.navigateByUrl('user/sign-in');
      return false;
    }
  }
}
