import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { AdminAuthService,} from '../../core';

@Component({
  selector: 'app-admin-sign-in',
  templateUrl: './admin-sign-in.component.html',
  styleUrls: ['./admin-sign-in.component.scss']
})
export class AdminSignInComponent implements OnInit {

  public hide: boolean = true;
  public user;
  _submitted: boolean =false;
  _evaluatorSignInForm: FormGroup;


  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _adminAuth: AdminAuthService,
  
  ){
    this.createForm();
  }

  createForm() {
    this._evaluatorSignInForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  tryLogin(value) {
    this._submitted = true;
    this._adminAuth.loginAdmin(value.username, value.password).subscribe(res => {
      this._router.navigateByUrl('/admin/dashboard');

    }, err => {
      console.log(err);
    });
  }

  ngOnInit(): void {
    this.createForm();

  }

}
