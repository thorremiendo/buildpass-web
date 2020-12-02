import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators, } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { FormValidatorService } from '../../core/services/form-validator.service'

const googleLogoURL = "https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public hide = true;
  _submitted = false;
  _signinForm: FormGroup;
  _signupForm: FormGroup;

  navLinks: any[];
  activeLinkIndex = -1; 
  
  constructor(
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _formValidator: FormValidatorService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {

    this.matIconRegistry.addSvgIcon("logo",
      this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL)
    );

    this.createForm();
  }

  createForm(){
    this._signinForm = this._fb.group({
      email: ['', Validators.required],
      password:['', Validators.required]
    });

    this._signupForm = this._fb.group(
      {
        fname: ['', Validators.required ],
        lname: ['', Validators.required ],
        email: ['', Validators.required],
        password: ['', Validators.compose([Validators.required, this._formValidator.patternValidator()])],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: this._formValidator.MatchPassword('password', 'confirmPassword'),
      }
    );
  }

  tryLogin(value){
    this._submitted = true;
    if (this._signinForm.valid){
      this._authService.SignIn(value);
    }
  }

  tryGoogleLogin() {
    this._authService.GoogleAuth();
  }
  
  tryRegister(value) {
    this._submitted = true;
    if (this._signupForm.valid){
      this._authService.SignUp(value);
    }
  }

  ngOnInit(): void {
    this.createForm();
  }

  get signupFormControl() {
    return this._signupForm.controls;
  }
}
