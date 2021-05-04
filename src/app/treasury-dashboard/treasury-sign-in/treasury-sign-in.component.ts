import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminAuthService } from '../../core';

@Component({
  selector: 'app-treasury-sign-in',
  templateUrl: './treasury-sign-in.component.html',
  styleUrls: ['./treasury-sign-in.component.scss'],
})
export class TreasurySignInComponent implements OnInit {
  public hide: boolean = true;
  public user;
  _submitted: boolean = false;
  _evaluatorSignInForm: FormGroup;

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
        this._router.navigateByUrl('/treasury/dashboard/home');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    this.createForm();
  }
}
