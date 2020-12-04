import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RegisterAccountFormService} from '../../core/services/register-account-form.service';
import { Router } from '@angular/router';
import { AuthService} from '../../core/services/auth.service'

import { MatDialog } from '@angular/material/dialog';
import { DataPrivacyComponent } from '../data-privacy/data-privacy.component'

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  public maxLength: number = 11;

  _addressForm: FormGroup;
  _submitted: boolean =  false;

  public userDetails;

  get addressFormControl() {
    return this._addressForm.controls;
  }

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
    private _registerAccountFormService: RegisterAccountFormService,
    private _dialog: MatDialog,
  ) {
    this.createForm();
  }

  createForm() {
    this._addressForm = this._fb.group({
      home_address: ['', Validators.required ],
      barangay: ['', Validators.required ],
      contact_number:['', [Validators.required, Validators.maxLength(11),]],
    });
  }

  createUserDetails(){
    this.userDetails ={
      "home_address": this._addressForm.value.home_address,
      "barangay":this._addressForm.value.barangay,
      "contact_number":  this._addressForm.value.contact_number,
    }
  }

  onSubmit(){
      this.createUserDetails();
      this._registerAccountFormService.setRegisterAccountInfo(this.userDetails);
      this._authService.SendVerificationMail();
      console.log(this._addressForm.value);
  }

  openDialog() {
    this._submitted = true;
    if(this._addressForm.valid){
      const dialogRef = this._dialog.open(DataPrivacyComponent);
      dialogRef.afterClosed().subscribe(result => {
        this.onSubmit();
      });
    }
  }

  ngOnInit(): void {
    this._registerAccountFormService.cast.subscribe(registerAccountSubject => this.userDetails = registerAccountSubject);
    console.log(this.userDetails);
    this.createForm();
    
  }
}





