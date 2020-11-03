import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, } from '@angular/forms';
import { AuthService } from './../core/services/auth.service';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public email = new FormControl('', [Validators.required, Validators.email]);
  
  
  
  
  constructor(
    private _authService:AuthService,
    private _router:Router,
  
  ) { }


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  ngOnInit(): void {
  }

  forgotPassword(){
    this._authService.ForgotPassword(this.email.value)
      .then(() =>{
        this._router.navigateByUrl('sign-in-up/sign-in');
      })
  }

}
