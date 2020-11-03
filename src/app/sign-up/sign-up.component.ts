import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormValidatorService } from '../core/services/form-validator.service'



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public email = new FormControl('', [Validators.required, Validators.email]);

  public hide = true;

  _signupForm: FormGroup;
  _submitted = false;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    public _fb: FormBuilder,
    private _formValidator: FormValidatorService,
    private _afs: AngularFirestore,
  ) {
    this.createForm();
   }

   createForm() {
    this._signupForm = this._fb.group({
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

  tryRegister(value){
    this._submitted = true;
    if (this._signupForm.valid){
      this._authService.SignUp(value);
    
  }

  }

  tryGoogle(){
    this._authService.GoogleAuth();
  }

  ngOnInit(): void {
    this.createForm();
  }

  get signupFormControl() {
    return this._signupForm.controls;
  }

}
