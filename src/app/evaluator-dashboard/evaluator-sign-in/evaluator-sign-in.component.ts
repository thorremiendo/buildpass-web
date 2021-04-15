import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminAuthService } from '../../core';

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
    private _adminAuth: AdminAuthService
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
    this.createForm();
  }
}
