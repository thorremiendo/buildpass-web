import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router, Params } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import { FormValidatorService } from '../../core/services/form-validator.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public hide = true;

  public changePasswordForm: FormGroup;
  public email:string;
  public submitted:boolean = false;

  private actionCode: string;

 

  constructor(
    private authService: AuthService,
    private router: Router,
    public fb: FormBuilder,
    private formValidator: FormValidatorService,
  ) { 

    this.createForm();
  }

  ngOnInit(): void {
    this.actionCode = JSON.parse(localStorage.getItem('actionCode'));
    if(this.actionCode){
      this.authService.verifyPasswordResetCode(this.actionCode)
        .then(result => {
          this.email = result;
        })
    }  
  }

  get changePasswordFormControl() {
    return this.changePasswordForm.controls;
  }

  createForm() {
    this.changePasswordForm = this.fb.group(
      {
        password: [
          '',
          Validators.compose([
            Validators.required,
            this.formValidator.patternValidator(),
          ]),
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: this.formValidator.MatchPassword(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  submit(value){
    if(this.changePasswordForm.valid){
      this.authService.confirmPasswordReset(this.actionCode, value.password);
    }
   
  }

}
