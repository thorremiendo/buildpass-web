import { AuthService } from './../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminAuthService } from '../../core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-evaluator-sign-in',
  templateUrl: './evaluator-sign-in.component.html',
  styleUrls: ['./evaluator-sign-in.component.scss'],
})
export class EvaluatorSignInComponent implements OnInit {
  public hide: boolean = true;
  public user;
  _submitted: boolean = false;
  _evaluatorSignInForm: FormGroup;
  public error;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _adminAuth: AdminAuthService,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this._evaluatorSignInForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  tryLogin(value) {
    this._submitted = true;
    this._adminAuth.loginEvaluator(value.username, value.password).subscribe(
      (res) => {
        this._router.navigateByUrl('/evaluator/home/table');
      },
      (err) => {
        console.log(err.error.message);
        this.error = err.error.message;
      }
    );
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user) {
      if (this.user.employee_detail) {
        this.router.navigateByUrl('/evaluator/home/table');
      }
    }

    this.createForm();
    this.authService.isAuthenticated
      .pipe(
        switchMap((isAuthenticated) => {
          if (!isAuthenticated) {
            this.router.navigateByUrl('evaluator/sign-in');
          } else {
            this.router.navigateByUrl('/evaluator/home/table');
          }
          return this.authService.currentUser;
        })
      )
      .subscribe((currentUser) => {
        if (currentUser && currentUser.roles && currentUser.roles.length) {
          this.authService.purgeAuth();
          this.router.navigateByUrl('evaluator/sign-in');
        }

        return;
      });
  }
}
