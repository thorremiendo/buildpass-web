import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EvaluatorAuthGuard implements CanActivate {
  
  constructor(
    public _authService: AuthService,
    public _router: Router
  ){ }



  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this._authService.isLoggedIn !== true && this._authService.isEvaluator !== true) {
      this._router.navigate([''])
    }
    return true;
  }

  

}