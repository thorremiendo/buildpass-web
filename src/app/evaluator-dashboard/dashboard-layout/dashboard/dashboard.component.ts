import { Router } from '@angular/router';
import { AuthService } from 'src/app/core';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {
    this.authService.isAuthenticated
      .pipe(
        switchMap((isAuthenticated) => {
          if (!isAuthenticated) {
            this.router.navigateByUrl('user/sign-in');
          }

          return this.authService.currentUser;
        })
      )
      .subscribe((currentUser) => {
        if (currentUser && currentUser.roles && currentUser.roles.length) {
          this.authService.purgeAuth();
          this.router.navigateByUrl('user/sign-in');
        }

        return;
      });
  }

  ngOnInit(): void {}
}
