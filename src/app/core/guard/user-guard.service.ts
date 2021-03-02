import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class UserGuardService implements CanActivate {
  public user;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this.authService.currentUser.subscribe((currentUser) => {
      this.user = currentUser;
    });
    if (this.user) {
      return true;
    } else {
      this.router.navigateByUrl("user/sign-in");
      return false;
    }
  }
}
