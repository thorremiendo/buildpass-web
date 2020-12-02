import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService} from '../../core/services/auth.service'
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { DataPrivacyComponent } from '../data-privacy/data-privacy.component';
import { NavigationComponent } from '../../landing/navigation/navigation.component';
import { BannerComponent } from '../../landing/banner/banner.component';
import { RegisterAccountFormService } from 'src/app/core/services/register-account-form.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  public userDetails;
  public maxLength: number = 11;

  _personalInfoForm: FormGroup;
  _submitted = false;

  get personalInfoFormcControl() {
    return this._personalInfoForm.controls;
  }

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _dialog: MatDialog,
    private _authService: AuthService,
    private _registerAccountFormService: RegisterAccountFormService,
  ) {
    this.createForm();
  }

  createForm() {
    this._personalInfoForm = this._fb.group({
      first_name:['', Validators.required],
      middle_name:[''],
      last_name: ['', Validators.required],
      suffix_name:[''],
      birthdate:['', Validators.required],
      gender:['', Validators.required],
      nationality:['Filipino', Validators.required],
      marital_status:['', Validators.required],
      home_address: ['', Validators.required ],
      barangay: ['', Validators.required ],
      contact_number:['', [Validators.required, Validators.maxLength(11),]],
    },
    );
  }

  createUserDetails(){
    this.userDetails = {
      "first_name": this._personalInfoForm.value.first_name,
      "middle_name":this._personalInfoForm.value.middle_name,
      "last_name":  this._personalInfoForm.value.last_name,
      "suffix_name":this._personalInfoForm.value.suffix_name,
      "birthdate": this._personalInfoForm.value.birthdate,
      "gender": this._personalInfoForm.value.gender,
      "nationality": this._personalInfoForm.value.nationality,
      "marital_status": this._personalInfoForm.value.marital_status,
      "home_address": this._personalInfoForm.value.home_address,
      "barangay":this._personalInfoForm.value.barangay,
      "contact_number":  this._personalInfoForm.value.contact_number,
    }
  }

  dateToString(){
    if(this._personalInfoForm.value.birthdate != null){
      let dd = this._personalInfoForm.value.birthdate.getDate();
      let mm = this._personalInfoForm.value.birthdate.getMonth();
      let yyyy = this._personalInfoForm.value.birthdate.getFullYear();
      let birthdateString = (`${yyyy}-${mm}-${dd}`);
      this._personalInfoForm.value.birthdate = birthdateString;
    }
  }

  onSubmit(){
    this._submitted = true;
    this.dateToString();
    if (this._personalInfoForm.valid){
      this.createUserDetails();
      this._registerAccountFormService.setRegisterAccountInfo(this.userDetails);
      this._authService.SendVerificationMail();
      console.log(this.userDetails);
    }
  }

  openDialog() {
    this._submitted = true;
    if(this._personalInfoForm.valid){
      const dialogRef = this._dialog.open(DataPrivacyComponent);
      dialogRef.afterClosed().subscribe(result => {
        this.onSubmit();

      });
    }
  }

  ngOnInit(): void {
    this._registerAccountFormService.cast.subscribe(registerAccountSubject => this.userDetails = registerAccountSubject)
    this.createForm();
    this._personalInfoForm.patchValue({
      first_name: this.userDetails.first_name,
      last_name: this.userDetails.last_name,
      email_address: this.userDetails.email_address
    })
  }
}
