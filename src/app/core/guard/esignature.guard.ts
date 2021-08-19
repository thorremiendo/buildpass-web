import { EsignatureService } from 'src/app/core/services/esignature.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EsignatureGuard implements CanActivate {
  constructor(
    private esignatureService: EsignatureService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.esignatureService.currentFormStep.pipe(
      take(1),
      map((res) => {
        if (!(res > 1)) {
          this.esignatureService.reset();
          this.router.navigate(['/evaluator/home/table']);

          return false;
        }
        return true;
      })
    );
  }
}
